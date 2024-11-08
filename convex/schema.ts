import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    tokenIdentifier: v.string(),
    embedding: v.optional(v.array(v.float64())),
    // storageId: v.string(),
    storageId: v.id("_storage"),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier"],
    }), // first argument is how we create the index, the second you can specify the list of the columns in order that you want to be used when doing a query. This will give us the list of documents of this user. s
  chats: defineTable({
    chatId: v.id("documents"),
    tokenIdentifier: v.string(),
    text: v.string(),
    isUser: v.boolean(),
  }).index("by_chatId_tokenIdentifier", ["chatId", "tokenIdentifier"]),
  notes: defineTable({
    text: v.string(),
    tokenIdentifier: v.string(),
    embedding: v.optional(v.array(v.float64())),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier"],
    }),
});
