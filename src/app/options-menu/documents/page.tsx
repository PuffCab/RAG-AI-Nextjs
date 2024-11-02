"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";

import DocumentCard from "@/components/DocumentCard";
import UploadDocButton from "@/components/UploadDocButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  console.log("documents::", documents);
  // const createDocument = useMutation(api.documents.createDocument);
  // ...

  return (
    <>
      <Unauthenticated>
        <h1>Loggin first to see your documents</h1>
      </Unauthenticated>
      <Authenticated>
        {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
        <main className="w-full space-y-8">
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

          {!documents && (
            <div className="grid grid-cols-2 gap-4">
              {new Array(6).fill("").map((_, i) => {
                return (
                  <Card
                    key={i}
                    className="h-[200px] p-4 flex flex-col justify-between"
                  >
                    <Skeleton className="h-[30px] rounded" />
                    <Skeleton className="h-[30px] rounded" />
                    <Skeleton className="w-[80px] h-[30px] rounded" />
                  </Card>
                );
              })}
            </div>
          )}
          {documents && documents.length === 0 && (
            <div className=" flex flex-col items-center gap-4 py-16">
              <Image
                src={"/files.svg"}
                alt="picture representing several text files "
                width={300}
                height={300}
              />
              <h2 className="text-2xl font-bold">No Documents yet</h2>
              <UploadDocButton />
            </div>
          )}

          {documents && documents.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
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
