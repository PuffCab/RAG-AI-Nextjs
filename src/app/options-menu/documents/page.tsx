"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import DocumentCard from "@/components/DocumentCard";
import UploadDocButton from "@/components/UploadDocButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

function Home() {
  const organizationInfo = useOrganization();

  const documents = useQuery(api.documents.getDocuments, {
    orgId: organizationInfo.organization?.id,
  });
  // console.log("documents::", documents);
  // const createDocument = useMutation(api.documents.createDocument);
  // ...

  const explanationTextDocuments =
    "Upload your .txt documents to make them searchable. PDFs and DOC/DOCX support is coming soon!";

  return (
    <>
      <Unauthenticated>
        <div className="bg-accent/20 text-accent-foreground p-4 rounded-md my-8 mx-auto max-w-xl text-center">
          <h2 className="text-xl font-semibold mb-2">Welcome to DocLens</h2>
          <p>Please log in to upload and view your documents.</p>
        </div>
      </Unauthenticated>
      <Authenticated>
        <main className="w-full space-y-8">
          <div className="flex justify-between items-center">
            {/* //TODO decide wich style fits better for text+upload button */}
            {/* <div className="flex flex-row gap-2 items-start md:flex-row md:justify-between md:items-center"> */}
            <h1 className="text-2xl md:text-4xl font-bold">Documents</h1>
            {documents && documents.length > 0 && <UploadDocButton />}
          </div>

          {!documents && (
            <div className="grid grid-cols-2 gap-4">
              {new Array(6).fill("").map((_, i) => {
                return (
                  <Card
                    key={i}
                    className="h-[200px] p-4 flex flex-col justify-between"
                  >
                    <Skeleton className="h-[30px] rounded animate-pulse" />
                    <Skeleton className="h-[30px] rounded" />
                    <Skeleton className="w-[80px] h-[30px] rounded" />
                  </Card>
                );
              })}
            </div>
          )}

          {documents && (
            <div className="bg-accent/50 text-accent-foreground p-3 rounded-md">
              <p>{explanationTextDocuments}</p>
            </div>
          )}

          {documents && documents.length === 0 && (
            <div className=" flex flex-col items-center gap-4 py-16">
              <Image
                src={"/files.svg"}
                alt="picture representing several text files "
                width={300}
                height={300}
                priority
              />
              <h2 className="text-2xl font-bold">No Documents yet</h2>
              <UploadDocButton />
            </div>
          )}

          {documents && documents.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {documents?.map((doc) => {
                // return <div key={doc._id}>{doc.title}</div>;
                return <DocumentCard document={doc} key={doc._id} />;
              })}
            </div>
          )}
        </main>
      </Authenticated>
    </>
  );
}

export default Home;
