"use client";
import React, { useState } from "react";
import SearchForm from "./SearchForm";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";

function DocumentSearchPage() {
  const [docsAndNotes, setDocsAndNotes] =
    useState<typeof api.search.searchAction._returnType>(null);
  return (
    <main className="w-full space-y-8">
      <Unauthenticated>
        <h1>Loggin first to do a search</h1>
      </Unauthenticated>
      <Authenticated>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Document Search</h1>
        </div>
        <SearchForm setDocsAndNotes={setDocsAndNotes} />
        <ul className="flex flex-col gap-2">
          {docsAndNotes?.map((docOrNote) => {
            if (docOrNote.type === "notes") {
              return (
                <Link
                  href={`/options-menu/notes/${docOrNote.record._id}`}
                  key={docOrNote.record._id}
                >
                  <li className="hover:bg-slate-700 bg-slate-600 rounded p-4 whitespace-pre-line">
                    type: Note - Accuracy: {docOrNote.accuracy}
                    {docOrNote.record.text.substring(0, 100) + "..."}
                  </li>
                </Link>
              );
            } else {
              return (
                <Link
                  href={`/options-menu/documents/${docOrNote.record._id}`}
                  key={docOrNote.record._id}
                >
                  <li className="hover:bg-slate-700 bg-slate-600 rounded p-4 whitespace-pre-line">
                    type: Document - Accuracy: {docOrNote.accuracy}
                    {docOrNote.record.title}
                    {docOrNote.record.description}
                  </li>
                </Link>
              );
            }
          })}
        </ul>
      </Authenticated>
    </main>
  );
}

export default DocumentSearchPage;
