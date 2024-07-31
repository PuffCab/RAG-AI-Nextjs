import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]), // first argument is how we create the index, the second you can specify the list of the columns in order that you want to be used when doing a query. This will give us the list of documents of this user. s
});
