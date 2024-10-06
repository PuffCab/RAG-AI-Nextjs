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

const createDocument = mutation({
  args: {
    title: v.string(),
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
    });
  },
});

export { createDocument, getDocuments, generateUploadUrl };
