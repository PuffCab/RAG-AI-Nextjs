"use client";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

function HeaderActions() {
  return (
    <>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <AuthLoading>...Loading</AuthLoading>
    </>
  );
}
export { HeaderActions };
