"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { landingPageBlurImage } from "@/constants/imagePlaceholders";

export default function LandingPage() {
  const router = useRouter();
  return (
    <main className="bg-background text-foreground flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl flex flex-col items-center text-center space-y-6">
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
        {/* <div className="pt-10"> */}
        <div className="w-full max-w-xl aspect-[2/1] relative">
          <Image
            src="https://res.cloudinary.com/dqrfxpzld/image/upload/v1750766906/doc_analyser/doc_app_image_xxpuhe.png"
            alt="Demo preview"
            width={600}
            height={300}
            placeholder="blur"
            blurDataURL={landingPageBlurImage}
            className="rounded-xl shadow-lg border border-border"
            priority
          />
        </div>
      </div>
    </main>
  );
}
