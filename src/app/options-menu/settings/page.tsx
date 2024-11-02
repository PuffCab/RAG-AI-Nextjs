"use client";
import UploadDocButton from "@/components/UploadDocButton";
import { Unauthenticated } from "convex/react";

function SettingsPage() {
  return (
    <>
      <Unauthenticated>
        <h1>Loggin first to see your settings</h1>
      </Unauthenticated>
      {/* <Authenticated> */}

      <main className="w-full space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Settings</h1>

          <UploadDocButton />
        </div>
      </main>
    </>
  );
}

export default SettingsPage;
