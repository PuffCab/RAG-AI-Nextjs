"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Id } from "../../../../../convex/_generated/dataModel";

type NoteCardProps = {
  id: Id<"notes">;
  text: string;
  title: string;
  isSelected: boolean;
};

export default function NoteCard({
  id,
  text,
  isSelected,
  title,
}: NoteCardProps) {
  return (
    <li
      className={cn(
        "rounded-xl border p-4 transition-colors hover:bg-muted/40",
        {
          "bg-slate-700 border-slate-600": isSelected,
          "bg-muted border-border": !isSelected,
        }
      )}
    >
      <Link href={`/options-menu/notes/${id}`} className="block space-y-1">
        <h3
          className="text-lg font-semibold text-primary truncate"
          title={title}
        >
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {text.substring(0, 60) + "..."}
        </p>
      </Link>
    </li>
  );
}
