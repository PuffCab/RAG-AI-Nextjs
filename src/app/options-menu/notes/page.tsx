"use client";
import UploadDocButton from "@/components/UploadDocButton";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import UploadNoteButton from "./UploadNoteButton";
import { api } from "../../../../convex/_generated/api";

function NotesPage() {
  const notes = useQuery(api.notes.getNotes);
  return (
    <>
      <Unauthenticated>
        <h1>Loggin first to see your Notes</h1>
      </Unauthenticated>
      {/* <Authenticated> */}

      <main className="w-full space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Notes</h1>

          <UploadNoteButton />
        </div>
        <div>
          {notes?.map((note) => {
            return <div key={note._id}>{note.text}</div>;
          })}
        </div>
      </main>
    </>
  );
}

export default NotesPage;
