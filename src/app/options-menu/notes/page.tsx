"use client";
import UploadDocButton from "@/components/UploadDocButton";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import UploadNoteButton from "./UploadNoteButton";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";

function NotesPage() {
  return (
    <div className="text-xl font-bold  bg-slate-700 p-4 rounded w-full">
      Please Select a Note
    </div>
  );
}

export default NotesPage;
