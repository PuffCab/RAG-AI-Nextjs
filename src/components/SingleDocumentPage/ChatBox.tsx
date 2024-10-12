"use client";

import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

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
    <div className="w-[250px] bg-gray-600 flex flex-col justify-between p-2 gap-2 rounded">
      <div className="h-[230px] overflow-y-auto">
        <div className="p-3 bg-gray-800">one query</div>
        <div className="p-3 bg-gray-800">one query</div>
        <div className="p-3 bg-gray-800">one query</div>
        <div className="p-3 bg-gray-800">one query</div>
        <div className="p-3 bg-gray-800">one query</div>
        <div className="p-3 bg-gray-800">one query</div>
        <div className="p-3 bg-gray-800">one query</div>
        <div className="p-3 bg-gray-800">one query</div>
      </div>
      <div>
        <form onSubmit={makeQuery} className="flex gap-1">
          <Input type="text" name="chat" id="chat" required />
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
