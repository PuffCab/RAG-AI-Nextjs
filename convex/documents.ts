import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  action,
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { api, internal } from "./_generated/api";
import OpenAI from "openai";
import { Id } from "./_generated/dataModel";
import { embed } from "./notes";

const client = new OpenAI({
  // apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
  apiKey: process.env.OPENAI_API_KEY, // this is the name given by us to the env in convex dashboard.
});

const getDocumentObjectIfAuthorized = async (
  ctx: MutationCtx | QueryCtx,
  docId: Id<"documents">
) => {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
  console.log("userId :>> ", userId);
  //NOTE create helper functions for this checks
  if (!userId) {
    return null;
  }

  const document = await ctx.db.get(docId);
  if (!document) {
    return null;
  }
  if (document.tokenIdentifier !== userId) {
    return null;
  }
  return { document, userId };
};

const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

const getDocuments = query({
  async handler(ctx) {
    // return await ctx.db.query("documents").collect(); // we comment this line when we move on to query douments by user identifier
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    console.log("userId :>> ", userId);
    if (!userId) {
      // return [];
      return undefined; //to prevent showing the no documents place holder while loading
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) => {
        return q.eq("tokenIdentifier", userId);
      })
      .collect();
  },
});

const getSingleDocument = query({
  args: {
    docId: v.id("documents"),
  },
  async handler(ctx, args) {
    //make sure user is logged in
    const accessDocumentObject = await getDocumentObjectIfAuthorized(
      ctx,
      args.docId
    );

    if (!accessDocumentObject) {
      return null;
    }
    return {
      ...accessDocumentObject.document,
      documentURL: await ctx.storage.getUrl(
        accessDocumentObject.document.storageId
      ),
    };
  },
});

const createDocument = mutation({
  args: {
    title: v.string(),
    storageId: v.id("_storage"),
  },
  async handler(ctx, args) {
    // const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    const user = await ctx.auth.getUserIdentity();
    const userId = user?.tokenIdentifier;
    console.log("userId :>> ", userId);
    if (!userId) {
      throw new ConvexError("Not logged in");
    }
    //we name this below documentId, to use it in the scheduler.
    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId,
      storageId: args.storageId,
      description: "",
    });

    //we run the internal operations to generate description. using scheduler (we could use just runQuery  or similars), which access like a queing system that runs several mutations, etc..
    await ctx.scheduler.runAfter(
      0,
      internal.documents.generateDocumentDescription,
      { fileId: args.storageId, docId: documentId }
    );
  },
});

const invokeDocumentAccessQuery = internalQuery({
  args: {
    docId: v.id("documents"),
  },
  async handler(ctx, args) {
    return await getDocumentObjectIfAuthorized(ctx, args.docId);
  },
});

const generateDocumentDescription = internalAction({
  args: {
    fileId: v.id("_storage"),
    docId: v.id("documents"),
  },
  async handler(ctx, args) {
    const file = await ctx.storage.get(args.fileId);
    if (!file) {
      throw new ConvexError("File not found");
    }
    //get the text from the file
    const documentText = await file.text();
    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await client.chat.completions.create({
        messages: [
          { role: "system", content: `This is a text file: ${documentText}` },
          {
            role: "user",
            content: `Generate a description for this documents.The descriptión should should make clear what is the content of the document in just one sentence and less than 100 characteres.`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
    console.log(
      "message Content:::",
      chatCompletion.choices[0].message.content
    );

    //get response from AI
    const aiAnswer =
      chatCompletion.choices[0].message.content ??
      "problems generating document's description";

    const embedding = embed(aiAnswer);
    //update the current document Id (we create updateDocumentDescription)
    await ctx.runMutation(internal.documents.updateDocumentDescription, {
      docId: args.docId,
      description: aiAnswer,
      embedding: embedding,
    });
  },
});

const updateDocumentDescription = internalMutation({
  args: {
    docId: v.id("documents"),
    description: v.string(),
    embedding: v.array(v.float64()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.docId, {
      description: args.description,
      embedding: args.embedding,
    });
  },
});

const sendQuestion = action({
  args: {
    query: v.string(),
    docId: v.id("documents"),
  },
  async handler(ctx, args) {
    const accessDocumentObject = await ctx.runQuery(
      internal.documents.invokeDocumentAccessQuery,
      {
        docId: args.docId,
      }
    );

    if (!accessDocumentObject) {
      throw new ConvexError("user doesn't have access to this document");
    }
    const file = await ctx.storage.get(accessDocumentObject.document.storageId);
    if (!file) {
      throw new ConvexError("File not found");
    }
    const documentText = await file.text();
    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await client.chat.completions.create({
        messages: [
          { role: "system", content: `This is a text file: ${documentText}` },
          {
            role: "user",
            content: `You need to answer the questions using only the information contained in the text file: ${args.query}, no other external sources of information. If you cannot find the answer to the question with that information, answers simple that the document doesnt contain enough information to answer the question`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
    console.log(
      "message Content:::",
      chatCompletion.choices[0].message.content
    );

    //TODO: store user prompt in the chat collection
    await ctx.runMutation(internal.chats.saveChat, {
      chatId: args.docId,
      text: args.query,
      isHuman: true, //because this mutation will store only user questions,
      tokenIdentifier: accessDocumentObject.userId,
    });

    const aiAnswer =
      chatCompletion.choices[0].message.content ??
      "problems generating response";
    //TODO: store AI response in the chat collection
    await ctx.runMutation(internal.chats.saveChat, {
      chatId: args.docId,
      text: aiAnswer,
      isHuman: false, //because this mutation will store only Ai answers,
      tokenIdentifier: accessDocumentObject.userId,
    });
    return aiAnswer;
  },
});

const deleteDocument = mutation({
  args: {
    docId: v.id("documents"),
  },
  async handler(ctx, args) {
    const accessDocumentObject = await getDocumentObjectIfAuthorized(
      ctx,
      args.docId
    );

    if (!accessDocumentObject) {
      throw new ConvexError("You don't have access to this document");
    }
    //first delete the actual file from storage (Files section in convex)
    await ctx.storage.delete(accessDocumentObject.document.storageId);
    //second delete the reference (from Data section)
    await ctx.db.delete(args.docId);
  },
});
export {
  createDocument,
  getDocuments,
  generateUploadUrl,
  getSingleDocument,
  sendQuestion,
  getDocumentObjectIfAuthorized,
  invokeDocumentAccessQuery,
  generateDocumentDescription,
  updateDocumentDescription,
  deleteDocument,
};
