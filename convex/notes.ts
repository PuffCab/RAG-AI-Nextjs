import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  internalAction,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import OpenAI from "openai";
import { internal } from "./_generated/api";
import { verifyUserOrgAccess } from "./documents";
import { Doc, Id } from "./_generated/dataModel";

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getNotes = query({
  args: {
    orgId: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    if (args.orgId) {
      const isUserInOrganization = await verifyUserOrgAccess(ctx, args.orgId);

      if (!isUserInOrganization) {
        return null;
      }
      const notes = await ctx.db
        .query("notes")
        .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
        .collect();
      return notes;
    } else {
      const notes = await ctx.db
        .query("notes")
        .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
        .order("desc")
        .collect();
      return notes;
    }
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

    if (note.orgId) {
      const isUserInOrganization = await verifyUserOrgAccess(ctx, note.orgId);
      if (!isUserInOrganization) {
        return null;
      }
    } else {
      if (note.tokenIdentifier !== userId) {
        return null;
      }
    }

    return note;
  },
});

const embed = async (text: string) => {
  const embedding = await openAi.embeddings.create({
    model: "text-embedding-ada-002",
    // dimensions: 1536, //including this property triggers a convex error. The dimension defaults to that one anyway
    input: text,
  });
  return embedding.data[0].embedding;
};

const setNoteEmbedding = internalMutation({
  args: {
    noteId: v.id("notes"),
    embedding: v.array(v.number()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.noteId, {
      embedding: args.embedding,
    });
  },
});

const createNoteEmbedding = internalAction({
  args: {
    noteId: v.id("notes"),
    text: v.string(),
  },
  async handler(ctx, args) {
    const embedding = await embed(args.text);
    await ctx.runMutation(internal.notes.setNoteEmbedding, {
      noteId: args.noteId,
      embedding,
    });
  },
});

const createNote = mutation({
  args: {
    text: v.string(),
    orgId: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("You need to login to create a note");
    }

    let noteId: Id<"notes">;
    if (args.orgId) {
      const isUserInOrganization = await verifyUserOrgAccess(ctx, args.orgId);
      if (!isUserInOrganization) {
        throw new ConvexError(
          "You are not allowed to create a note in this organization"
        );
      }

      noteId = await ctx.db.insert("notes", {
        text: args.text,
        orgId: args.orgId,
      });
    } else {
      noteId = await ctx.db.insert("notes", {
        text: args.text,
        tokenIdentifier: userId,
      });
    }

    await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
      text: args.text,
      noteId,
    });
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

    await checkAccessToNote(ctx, note);

    await ctx.db.delete(args.noteId);
  },
});

//TODO try to make this function more reusable to use it with docs and notes and everytime we need to check access...
const checkAccessToNote = async (
  ctx: QueryCtx | MutationCtx,
  note: Doc<"notes">
) => {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

  if (!userId) {
    throw new ConvexError("You need to login to create a note");
  }
  if (!note) {
    throw new ConvexError("Cannot find the note");
  }

  if (note.orgId) {
    const isUserInOrganization = await verifyUserOrgAccess(ctx, note.orgId);

    if (!isUserInOrganization) {
      throw new ConvexError("You aren't allowed to delete this note");
    }
  } else {
    if (note.tokenIdentifier !== userId) {
      throw new ConvexError("You aren't allowed to delete this note");
    }
  }
};

export {
  createNote,
  createNoteEmbedding,
  getNotes,
  getSingleNote,
  deleteNote,
  setNoteEmbedding,
  embed,
};
