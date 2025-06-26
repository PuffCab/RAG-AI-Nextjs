"use client";
import { cn } from "@/lib/utils";
import { FileSearch, Files, NotebookPen, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MenuBar() {
  const pathName = usePathname();
  return (
    <nav className="w-full  md:w-auto mb-0">
      {/* <ul className="flex justify-around items-center md:flex-col md:items-start space-x-8 md:space-x-0 md:space-y-5"> */}
      <ul className="grid grid-cols-4 justify-items-center gap-x-2  md:flex md:flex-col md:items-start md:space-y-5">
        <li>
          <Link
            // className={cn(
            //   "flex gap-1 items-center text-xl hover:text-amber-100 font-light",
            //   {
            //     "text-amber-400 font-light":
            //       pathName.endsWith("/document-search"),
            //   }
            // )}
            className={cn(
              "flex flex-col items-center justify-center w-full min-w-0 text-sm md:text-xl sm:text-base md:flex-row md:gap-2 text-center truncate  hover:text-amber-100 font-light",
              {
                "text-amber-400 font-light":
                  pathName.endsWith("/document-search"),
              }
            )}
            href="/options-menu/document-search"
          >
            <FileSearch />
            <span>Search</span>
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex flex-col items-center justify-center w-full min-w-0 text-sm md:text-xl sm:text-base md:flex-row md:gap-2 text-center truncate  hover:text-amber-100 font-light",
              {
                "text-amber-400 font-light": pathName.endsWith("/documents"),
              }
            )}
            href="/options-menu/documents"
          >
            <Files />
            <span>Documents</span>
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex flex-col items-center justify-center w-full min-w-0 text-sm md:text-xl sm:text-base md:flex-row md:gap-2 text-center truncate  hover:text-amber-100 font-light",
              {
                "text-amber-400 font-light": pathName.endsWith("/notes"),
              }
            )}
            href="/options-menu/notes"
          >
            <NotebookPen />
            <span>Notes</span>
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex flex-col items-center justify-center w-full min-w-0 text-sm md:text-xl sm:text-base md:flex-row md:gap-2 text-center truncate hover:text-amber-100 font-light",
              {
                "text-amber-400 font-light": pathName.endsWith("/settings"),
              }
            )}
            href="/options-menu/settings"
          >
            <Settings />
            <span className="truncate">Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuBar;
