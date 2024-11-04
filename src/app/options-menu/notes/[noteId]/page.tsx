"use client";
import { useParams } from "next/navigation";
import React from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
type ParamsType = {
  noteId: Id<"notes">;
};

function SingleNotePage() {
  const { noteId } = useParams<ParamsType>();
  const note = useQuery(api.notes.getSingleNote, {
    noteId: noteId,
  });
  return <div>{note?.text}</div>;
}

export default SingleNotePage;
