"use client";
import React, { useState } from "react";
import SearchForm from "./SearchForm";
import { Doc } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";

function DocumentSearchPage() {
  const [docsAndNotes, setDocsAndNotes] =
    useState<typeof api.search.searchAction._returnType>(null);
  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Document Search</h1>
      </div>
      <SearchForm setDocsAndNotes={setDocsAndNotes} />
      <u className="space-y-4">
        {docsAndNotes?.map((docOrNote) => {
          if (docOrNote.type === "notes") {
            return (
              <Link href={`/options-menu/notes/${docOrNote.record._id}`}>
                <li className="bg-slate-600 rounded p-4 whitespace-pre-line">
                  type: Note
                  {docOrNote.record.text.substring(0, 20) + "..."}
                </li>
              </Link>
            );
          } else {
            return (
              <Link href={`/options-menu/documents/${docOrNote.record._id}`}>
                <li className="bg-slate-600 rounded p-4 whitespace-pre-line">
                  type: Document
                  {docOrNote.record.title}
                  {docOrNote.record.description}
                </li>
              </Link>
            );
          }
        })}
      </u>
    </main>
  );
}

export default DocumentSearchPage;
