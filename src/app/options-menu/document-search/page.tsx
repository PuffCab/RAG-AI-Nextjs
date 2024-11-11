"use client";
import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";
import DocOrNoteCard from "./DocOrNoteCard";

function DocumentSearchPage() {
  const [docsAndNotes, setDocsAndNotes] =
    useState<typeof api.search.searchAction._returnType>(null);

  useEffect(() => {
    const localStorageData = localStorage.getItem("queryResults");
    if (!localStorageData) return;
    setDocsAndNotes(JSON.parse(localStorageData));
  }, []);

  return (
    <main className="w-full space-y-8 pb-20">
      <Unauthenticated>
        <h1>Loggin first to do a search</h1>
      </Unauthenticated>
      <Authenticated>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Document Search</h1>
        </div>
        <SearchForm
          setDocsAndNotes={(queryResults) => {
            setDocsAndNotes(queryResults);
            localStorage.setItem("queryResults", JSON.stringify(queryResults));
          }}
        />
        <ul className="flex flex-col gap-2">
          {docsAndNotes?.map((docOrNote) => {
            if (docOrNote.type === "notes") {
              return (
                <DocOrNoteCard
                  key={docOrNote.record._id}
                  type="note"
                  urlPath={`/options-menu/notes/${docOrNote.record._id}`}
                  accuracy={docOrNote.accuracy}
                  text={docOrNote.record.text}
                />
              );
            } else {
              return (
                <DocOrNoteCard
                  key={docOrNote.record._id}
                  type="document"
                  urlPath={`/options-menu/notes/${docOrNote.record._id}`}
                  accuracy={docOrNote.accuracy}
                  text={`${docOrNote.record.title}: ${docOrNote.record.description}`}
                />
              );
            }
          })}
        </ul>
      </Authenticated>
    </main>
  );
}

export default DocumentSearchPage;
