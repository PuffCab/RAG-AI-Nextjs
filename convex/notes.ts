import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

const getNotes = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .order("desc")
      .collect();
    return notes;
  },
});
const getSingleNote = query({
  args: { noteId: v.id("notes") },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }
    const note = await ctx.db.get(args.noteId);
    if (!note) {
      return null;
    }
    if (note.tokenIdentifier !== userId) {
      return null;
    }
    return note;
  },
});

const createNote = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("You need to login to create a note");
    }

    const note = await ctx.db.insert("notes", {
      text: args.text,
      tokenIdentifier: userId,
    });
    return note;
  },
});
const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("You need to login to create a note");
    }

    const note = await ctx.db.get(args.noteId);

    if (!note) {
      throw new ConvexError("Cannot find the note");
    }
    if (note.tokenIdentifier !== userId) {
      throw new ConvexError("You cannot delete this note");
    }
    await ctx.db.delete(args.noteId);
  },
});

export { createNote, getNotes, getSingleNote, deleteNote };
