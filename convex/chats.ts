import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

const saveChat = internalMutation({
  args: {
    chatId: v.id("documents"),
    text: v.string(),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("chats", {
      chatId: args.chatId,
      text: args.text,
      tokenIdentifier: args.tokenIdentifier,
      isUser: args.isHuman,
    });
  },
});

const getAllChatDocuments = query({
  args: {
    chatId: v.id("documents"),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query("chats")
      .withIndex("by_chatId_tokenIdentifier", (q) => {
        return q
          .eq("chatId", args.chatId)
          .eq("tokenIdentifier", ctx.auth.tokenIdentifier);
      })
      .collect();
  },
});

export { saveChat, getAllChatDocuments };
