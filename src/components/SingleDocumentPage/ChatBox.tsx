"use client";

import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import ChatQuestionForm from "./ChatQuestionForm";

type ComponentProps = {
  docId: Id<"documents">;
};

function ChatBox({ docId }: ComponentProps) {
  const chats = useQuery(api.chats.getAllChatDocuments, {
    chatId: docId,
  });

  // const sendMessage = useAction(api.documents.sendQuestion);
  // const makeQuery = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const form = e.target as HTMLFormElement;
  //   const formData = new FormData(form);
  //   const queryText = formData.get("chat") as string;
  //   console.log("queryText", queryText);
  //   //Send msg to convex
  //   const messageSent = await sendMessage({ query: queryText, docId: docId });
  //   console.log("messageSentResponse:", messageSent);
  // };

  return (
    <div className=" bg-gray-600 flex flex-col justify-between p-3 gap-2 rounded-xl">
      <div className="h-[230px] overflow-y-auto space-y-1">
        <div className="bg-slate-800 p-1 rounded">
          BOT : What do you want to know about this document?
        </div>
        {/* <div className="bg-slate-800 p-1 rounded">this will be AIs answer</div> */}
        {chats?.map((chatDocument) => {
          console.log("chatDocument", chatDocument);
          return (
            <div
              key={chatDocument._id}
              className={cn(
                {
                  "bg-gray-100 text-black": chatDocument.isUser,
                  "bg-slate-800": !chatDocument.isUser,
                  "text-right": chatDocument.isUser,
                },
                "rounded p-2 whitespace-pre-line"
              )}
            >
              {chatDocument.isUser ? "USER" : "BOT"}: {chatDocument.text}
            </div>
          );
        })}
      </div>
      <div className="flex gap-1">
        <ChatQuestionForm docId={docId} />
      </div>
    </div>
  );
}

export default ChatBox;
