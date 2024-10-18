"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import ChatBox from "@/components/SingleDocumentPage/ChatBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  //NOTE also include error handling for when the docID is incorrect and the query throws an error
  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        {!document && (
          <h2 className="text-4xl font-bold">
            We cannot find this document or you dont have acces to it
          </h2>
        )}
        {document && <h1 className="text-4xl font-bold">{document.title}</h1>}
      </div>
      <div className="flex gap-4 ">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="document">Document View</TabsTrigger>
            <TabsTrigger value="chat">Chat View</TabsTrigger>
          </TabsList>
          <TabsContent value="document">
            <div className="bg-gray-600 p-4 rounded flex-1 h-[400px]">
              {document?.documentURL && (
                <iframe src={document.documentURL} className="w-full h-full" />
              )}
            </div>
          </TabsContent>
          <TabsContent value="chat">
            {" "}
            <ChatBox docId={docId} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default SingleDoc;
