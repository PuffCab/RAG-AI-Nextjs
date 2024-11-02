"use client";
import { cn } from "@/lib/utils";
import { Files, NotebookPen, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MenuBar() {
  const pathName = usePathname();
  return (
    <nav>
      <ul className="space-y-5">
        <li>
          <Link
            className={cn(
              "flex gap-1 items-center text-xl hover:text-amber-100 font-light",
              {
                "text-amber-400 font-light": pathName.endsWith("/documents"),
              }
            )}
            href="/options-menu/documents"
          >
            <Files />
            Documents
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex gap-1 items-center text-xl hover:text-amber-100 font-light",
              {
                "text-amber-400 font-light": pathName.endsWith("/notes"),
              }
            )}
            href="/options-menu/notes"
          >
            <NotebookPen />
            Notes
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex gap-1 items-center text-xl hover:text-amber-100 font-light",
              {
                "text-amber-400 font-light": pathName.endsWith("/settings"),
              }
            )}
            href="/options-menu/settings"
          >
            <Settings />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuBar;
