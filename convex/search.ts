import { v } from "convex/values";
import { action } from "./_generated/server";
import { embed } from "./notes";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

// const searchAction = action({
//   args: {
//     search: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//     if (!userId) {
//       return null;
//     }
//     // 1. Generate an embedding from you favorite third party API:
//     const embedding = await embed(args.search);
//     // 2. Then search for similar foods!
//     const results = await ctx.vectorSearch("notes", "by_embedding", {
//       vector: embedding,
//       limit: 16,
//       filter: (q) => q.eq("tokenIdentifier", userId),
//     });
//     const notes = (await Promise.all(
//       results
//         .map(async (result) => {
//           const note = await ctx.runQuery(api.notes.getSingleNote, {
//             noteId: result._id,
//           });
//           return note;
//         })
//         .filter(Boolean)
//     )) as Doc<"notes">[];
//     return notes;
//   },
// });
const searchAction = action({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }
    // 1. Generate an embedding from you favorite third party API:
    const embedding = await embed(args.search);
    // 2. Then search for similar foods!
    const results = await ctx.vectorSearch("notes", "by_embedding", {
      vector: embedding,
      limit: 16,
      filter: (q) => q.eq("tokenIdentifier", userId),
    });

    const records: (
      | { type: "notes"; record: Doc<"notes"> }
      | { type: "documents"; record: Doc<"documents"> }
    )[] = [];
    await Promise.all(
      results
        .map(async (result) => {
          const note = await ctx.runQuery(api.notes.getSingleNote, {
            noteId: result._id,
          });
          if (!note) {
            return;
          }
          records.push({ record: note, type: "notes" });
          return;
        })
        .filter(Boolean)
    );
    return records;
  },
});

export { searchAction };
