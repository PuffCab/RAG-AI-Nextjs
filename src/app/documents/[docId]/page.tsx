"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type ComponentProps = {
  params: {
    // docId: string;
    docId: Id<"documents">;
  };
};

function SingleDoc({ params: { docId } }: ComponentProps) {
  console.log("docId", docId);
  const document = useQuery(api.documents.getSingleDocument, { docId: docId });
  // NOTE fix the change the initial render of the !document case because of the response time. Use spinner or loader
  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        {document && <h1 className="text-4xl font-bold">{document.title}</h1>}
        {!document && (
          <h2 className="text-4xl font-bold">
            We cannot find this document or you dont have acces to it
          </h2>
        )}
      </div>
    </main>
  );
}

export default SingleDoc;
