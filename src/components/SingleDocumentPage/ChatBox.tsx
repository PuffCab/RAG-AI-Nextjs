"use client";

import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type ComponentProps = {
  docId: Id<"documents">;
};

function ChatBox({ docId }: ComponentProps) {
  const sendMessage = useAction(api.documents.sendQuestion);
  const makeQuery = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const queryText = formData.get("chat") as string;
    console.log("queryText", queryText);
    //Send msg to convex
    const messageSent = await sendMessage({ query: queryText, docId: docId });
    console.log("messageSentResponse:", messageSent);
  };

  return (
    <div className=" bg-gray-600 flex flex-col justify-between p-2 gap-2 rounded">
      <div className="h-[230px] overflow-y-auto space-y-1">
        <div className="bg-slate-800 p-1 rounded">
          BOT : What do you want to know about this document?
        </div>
        {/* <div className="bg-slate-800 p-1 rounded">this will be AIs answer</div> */}
        <div
          className={(cn({ "bg-slate-700": true }), "rounded p-2 text-right")}
        >
          USER question
        </div>
      </div>
      <div className="flex gap-1">
        <form onSubmit={makeQuery} className="flex-1">
          <div className="flex gap-2">
            <Input
              className="flex-1"
              type="text"
              name="chat"
              id="chat"
              required
            />
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
