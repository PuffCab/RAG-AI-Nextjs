"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import DocumentCard from "@/components/DocumentCard";
import UploadDocButton from "@/components/UploadDocButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          AI-powered document search and analysis
        </h1>
        <p className="text-lg text-muted-foreground">
          Upload your notes or documents and ask natural language questions. Our
          AI will fetch and summarize relevant content instantly. Private,
          real-time, and always available.
        </p>
        <div className="flex justify-center">
          <Button onClick={() => router.push("/options-menu/documents")}>
            Get Started
          </Button>
        </div>
        <div className="pt-10">
          <Image
            src="/files.jpeg"
            alt="Demo preview"
            width={600}
            height={300}
            className="rounded-xl shadow-lg border border-border"
          />
        </div>
      </div>
    </main>
  );
}
