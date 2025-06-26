import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import Header from "@/components/ui/Header";
import { Toaster } from "@/components/ui/toaster";
import { FileSearch2 } from "lucide-react";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import { checkIfMobile } from "./actions/serverActions";

// const inter = Inter({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Docs Analyzer",
  description: "Analyse with AI documents uploaded by the user",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = await checkIfMobile();
  return (
    // NOTE we added suppressHydrationWarning because an error provoked by the colortheme with the header "app-index.js:33 Warning: Extra attributes from the server: class,style"
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <link rel="icon" href="/file-search-2.svg" sizes="any" />
        <Providers>
          <Header isMobile={isMobile} />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
