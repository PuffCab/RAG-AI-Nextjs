"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import DocumentCard from "@/components/DocumentCard";
import UploadDocButton from "@/components/UploadDocButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function LandingPage() {
  return <main className="p-24 space-y-8">Landing Page</main>;
}
