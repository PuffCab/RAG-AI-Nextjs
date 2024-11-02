"use client";
import UploadDocButton from "@/components/UploadDocButton";
import { Authenticated, Unauthenticated } from "convex/react";

function NotesPage() {
  return (
    <>
      <Unauthenticated>
        <h1>Loggin first to see your Notes</h1>
      </Unauthenticated>
      {/* <Authenticated> */}

      <main className="w-full space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Notes</h1>

          <UploadDocButton />
        </div>
      </main>
    </>
  );
}

export default NotesPage;
