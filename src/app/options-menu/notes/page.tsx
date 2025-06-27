// "use client";
// import UploadDocButton from "@/components/UploadDocButton";
// import { Authenticated, Unauthenticated, useQuery } from "convex/react";
// import UploadNoteButton from "./UploadNoteButton";
// import { api } from "../../../../convex/_generated/api";
// import Link from "next/link";

// function NotesPage() {
//   return (
//     <div className="text-xl font-bold  bg-slate-700 p-4 rounded w-full">
//       Please Select a Note
//     </div>
//   );
// }

// export default NotesPage;
"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import UploadNoteButton from "./UploadNoteButton";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import NoteCard from "./components/NoteCard";

function NotesPage() {
  const organization = useOrganization();

  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const notes = useQuery(api.notes.getNotes, {
    orgId: organization.organization?.id,
  });
  const hasNotes = notes && notes.length > 0 ? true : false;

  const explanationTextNotes =
    "Write your notes and upload them to make them searchable.";
  return (
    <>
      <Unauthenticated>
        <div className="bg-accent/20 text-accent-foreground p-4 rounded-md my-8 mx-auto max-w-xl text-center">
          <h2 className="text-xl font-semibold mb-2">Welcome to DocLens</h2>
          <p>Please log in to write, upload and view your text notes.</p>
        </div>
      </Unauthenticated>
      <Authenticated>
        <main className="w-full space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-4xl font-bold">Notes</h1>
            {notes && notes.length > 0 && <UploadNoteButton />}
          </div>
          {/* //TODO create skeleton for notes */}
          {!notes && (
            <div className="flex gap-10">
              <div className="w-[200px] space-y-4">
                <Skeleton className="h-[30px] w-full" />
                <Skeleton className="h-[30px] w-full" />
                <Skeleton className="h-[30px] w-full" />
                <Skeleton className="h-[30px] w-full" />
              </div>
              <div className="flex-1">
                <Skeleton className="h-[300px] w-full" />
              </div>
            </div>
          )}
          {notes && (
            <div className="bg-accent/50 text-accent-foreground p-3 rounded-md">
              <p>{explanationTextNotes}</p>
            </div>
          )}
          {notes && notes.length === 0 && (
            <div className=" flex flex-col items-center gap-4 py-16">
              <Image
                src={"/files.svg"}
                alt="picture representing several text files "
                width={300}
                height={300}
              />
              <h2 className="text-2xl font-bold">No Notes yet</h2>
              <UploadNoteButton />
            </div>
          )}
          {hasNotes && (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 space-y-2 ">
                {notes?.map((note) => {
                  return (
                    <NoteCard
                      key={note._id}
                      id={note._id}
                      text={note.text}
                      title={note.title}
                      isSelected={note._id === noteId}
                    />
                  );
                })}
              </ul>
            </>
          )}
        </main>
      </Authenticated>
    </>
  );
}

export default NotesPage;
