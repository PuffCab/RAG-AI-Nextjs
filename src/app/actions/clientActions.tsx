"use client";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
//using clerk
function HeaderActions() {
  return (
    <>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <AuthLoading>
        <Loader2 className="animate-spin" />
      </AuthLoading>
    </>
  );
}
export { HeaderActions };
