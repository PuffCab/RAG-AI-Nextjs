"use client";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import { createDocument } from "../../../convex/documents";
import Image from "next/image";

function Header() {
  return (
    <div className="bg-slate-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4 text-2xl">
          <Image
            className="rounded "
            src="/homer.jpg"
            alt="logo from homer "
            width={40}
            height={40}
          />
          <div>My RAG APP</div>
        </div>

        <div>
          <Unauthenticated>
            <SignInButton />
          </Unauthenticated>
          <Authenticated>
            <div className="flex gap-6">
              <ModeToggle />
              <UserButton />
            </div>
          </Authenticated>
        </div>
      </div>
    </div>
  );
}

export default Header;
