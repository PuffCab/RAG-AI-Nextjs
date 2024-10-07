"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import DocumentCard from "@/components/DocumentCard";
import UploadDocButton from "@/components/UploadDocButton";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  console.log("documents::", documents);
  // const createDocument = useMutation(api.documents.createDocument);
  // ...

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Documents</h1>
        {/* <Button
          onClick={() => {
            createDocument({ title: "My first document" });
          }}
        >
          Add doc to DB
        </Button> */}
        <UploadDocButton />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {documents?.map((doc) => {
          // return <div key={doc._id}>{doc.title}</div>;
          return <DocumentCard document={doc} key={doc._id} />;
        })}
      </div>
    </main>
  );
}
