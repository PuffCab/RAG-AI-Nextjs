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

type NotesLayoutProps = {
  children: React.ReactNode;
};

function NotesLayout({ children }: NotesLayoutProps) {
  const organization = useOrganization();

  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const notes = useQuery(api.notes.getNotes, {
    orgId: organization.organization?.id,
  });
  const hasNotes = notes && notes.length > 0 ? true : false;
  return (
    <>
      <Unauthenticated>
        <h1>Loggin first to see your Notes</h1>
      </Unauthenticated>
      <Authenticated>
        <main className="w-full space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Notes</h1>

            <UploadNoteButton />
          </div>
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
          {/* //TODO create skeleton for notes */}
          {notes?.length === 0 && (
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
              <div className="w-full">{children}</div>
            </div>
          )}
        </main>
      </Authenticated>
    </>
  );
}

export default NotesLayout;
