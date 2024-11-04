"use client";
import { useParams } from "next/navigation";
import React from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import DeleteNoteButton from "./DeleteNoteButton";
type ParamsType = {
  noteId: Id<"notes">;
};

function SingleNotePage() {
  const { noteId } = useParams<ParamsType>();
  const note = useQuery(api.notes.getSingleNote, {
    noteId: noteId,
  });
  return (
    <div className="relative bg-slate-700 p-4 rounded w-full">
      <DeleteNoteButton noteId={noteId} />
      {/* //TODO create a update note feature */}
      <div className="pr-3">{note?.text}</div>
    </div>
  );
}

export default SingleNotePage;
