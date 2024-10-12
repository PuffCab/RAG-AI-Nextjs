import { ConvexError, v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import OpenAI from "openai";

const client = new OpenAI({
  // apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
  apiKey: process.env.OPENAI_API_KEY, // this is the name given by us to the env in convex dashboard.
});

const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

const getDocuments = query({
  async handler(ctx) {
    // return await ctx.db.query("documents").collect(); // we comment this line when we move on to query douments by user identifier
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    console.log("userId :>> ", userId);
    if (!userId) {
      return [];
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
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    console.log("userId :>> ", userId);
    //NOTE create helper functions for this checks
    if (!userId) {
      return null;
    }

    const document = await ctx.db.get(args.docId);
    if (!document) {
      return null;
    }
    if (document?.tokenIdentifier !== userId) {
      return null;
    }
    return {
      ...document,
      documentURL: await ctx.storage.getUrl(document.storageId),
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

    await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId,
      storageId: args.storageId,
    });
  },
});

const sendQuestion = action({
  args: {
    query: v.string(),
    docId: v.id("documents"),
  },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();
    const userId = user?.tokenIdentifier;
    console.log("userId :>> ", userId);

    if (!userId) {
      throw new ConvexError("Not logged in");
    }

    const document = await ctx.runQuery(api.documents.getSingleDocument, {
      docId: args.docId,
    });

    if (!document) {
      throw new ConvexError("No document with that ID in the Database");
    }
    const file = await ctx.storage.get(document.storageId);
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
            content: `You need to answer the following question with the information contained in the text file: ${args.query}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
    console.log(
      "message Content:::",
      chatCompletion.choices[0].message.content
    );
    return chatCompletion.choices[0].message.content;
  },
});
export {
  createDocument,
  getDocuments,
  generateUploadUrl,
  getSingleDocument,
  sendQuestion,
};
