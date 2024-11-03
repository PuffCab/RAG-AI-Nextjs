"use client";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { HeaderActions } from "@/app/actions";
import Link from "next/link";

function Header() {
  return (
    <div className="bg-slate-600 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-14">
          <Link href="/" className="flex items-center gap-4 text-2xl">
            <Image
              className="rounded "
              src="/homer-4.jpg"
              alt="logo from homer "
              width={50}
              height={50}
            />
            <div className="hover:text-amber-200">Documents Analyser</div>
          </Link>
          <nav>
            <Link href="/options-menu" className="hover:text-amber-200">
              Documents
            </Link>
          </nav>
        </div>

        <div className="flex gap-6 items-center">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}

export default Header;
