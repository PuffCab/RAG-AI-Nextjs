import { File, NotebookPen } from "lucide-react";
import Link from "next/link";
import React from "react";

type ComponentProps = {
  urlPath: string;
  accuracy: number;
  text: string;
  type: string;
};

function DocOrNoteCard({ urlPath, accuracy, text, type }: ComponentProps) {
  return (
    <Link href={urlPath}>
      <li className="hover:bg-slate-700 bg-slate-600 rounded p-4 whitespace-pre-line space-y-3 ">
        <div className="flex justify-between">
          <div className="flex items-center gap-1 text-xl">
            {type === "note" ? <NotebookPen size={17} /> : <File size={17} />}
            {type === "note" ? "Note" : "Document"}
          </div>
          <div className="text-sm text-amber-100">
            Match Score {accuracy.toFixed(2)}
          </div>
        </div>

        <div>{text.substring(0, 100) + "..."}</div>
      </li>
    </Link>
  );
}

export default DocOrNoteCard;
