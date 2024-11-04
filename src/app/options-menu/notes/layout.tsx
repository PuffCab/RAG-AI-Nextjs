"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import UploadNoteButton from "./UploadNoteButton";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type NotesLayoutProps = {
  children: React.ReactNode;
};

function NotesLayout({ children }: NotesLayoutProps) {
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
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
        <div className="flex gap-10">
          <ul className="space-y-2 w-[300px]">
            {notes?.map((note) => {
              return (
                // <li
                //   key={note._id}
                //   className={cn("text-lg hover:text-amber-100", {
                //     "text-amber-300": note._id === noteId,
                //   })}
                // >
                <li
                  key={note._id}
                  className={cn("text-base hover:text-amber-100", {
                    "bg-slate-700 p-4 rounded": note._id === noteId,
                  })}
                >
                  <Link href={`/options-menu/notes/${note._id}`}>
                    {note.text.substring(0, 30) + "..."}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="bg-slate-700 p-4 rounded w-full">{children}</div>
        </div>
      </main>
    </>
  );
}

export default NotesLayout;
