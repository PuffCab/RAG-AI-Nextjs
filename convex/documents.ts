import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export { createDocument, getDocuments, generateUploadUrl, getSingleDocument };
