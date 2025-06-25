"use client";
import React, { Suspense } from "react";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { HeaderActions } from "@/app/actions/clientActions";
import Link from "next/link";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { headerIconBlurImage } from "@/constants/imagePlaceholders";
import useIsDesktop from "@/hooks/useIsDesktop";
import { Home, Menu } from "lucide-react";

type HeaderProps = {
  isMobile: boolean;
};
function Header({ isMobile }: HeaderProps) {
  // const desktopView = useIsDesktop();
  return (
    <div className="bg-slate-600">
      {/* Top Header Bar */}
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* <div className="container mx-auto flex items-center justify-between md:justify-start px-4 py-4"> */}
        {/* Left: Logo + App Name */}
        <Link
          href="/"
          className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-2"
        >
          <Image
            className="rounded"
            src="https://res.cloudinary.com/dqrfxpzld/image/upload/v1750777708/doc_analyser/logo1_s6tq4f.png"
            alt="DocLens logo"
            width={50}
            height={50}
            placeholder="blur"
            blurDataURL={headerIconBlurImage}
          />
          <span className="text-white text-base sm:text-2xl hover:text-amber-200">
            DocLens
          </span>
        </Link>

        {/* Center: Organization Switcher + links*/}
        <div className="flex-1 flex justify-evenly items-center ">
          {/* OrganizationSwitcher always visible + we keep 6rem of space to prevent CLS */}
          <div className="flex-1 flex justify-center">
            <div className="min-w-[6rem]">
              <OrganizationSwitcher />
            </div>
          </div>
          {/* Links Hidden on mobile, shown on md+ */}
          <nav className="hidden md:flex flex-1 justify-evenly items-center mx-8">
            <Link
              href="/"
              className="flex items-center gap-1 text-white hover:text-amber-200"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link
              href="/options-menu"
              className="flex items-center gap-1 text-white hover:text-amber-200"
            >
              <Menu size={20} />
              <span>Menu</span>
            </Link>
          </nav>
        </div>

        {/* Right: Desktop Nav vs Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Desktop: nav links + toggle + avatar */}
          <div className="hidden md:flex items-center gap-6">
            <ModeToggle />
            <Suspense
              fallback={
                <div className="w-10 h-10 rounded-full bg-gray-500 animate-pulse" />
              }
            >
              {/* <div className="w-10 h-10 flex items-center justify-center"> */}
              <div className="min-w-[2.5rem]">
                <HeaderActions />
              </div>
            </Suspense>
          </div>
          {/* Mobile: only theme toggle */}
          <div className="flex md:hidden">
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Bottom Nav: Mobile Only */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-700 border-t border-slate-500 py-2 flex justify-around items-center text-white md:hidden z-50">
        <Link
          href="/"
          className="flex flex-col items-center text-xs hover:text-amber-200"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link
          href="/options-menu"
          className="flex flex-col items-center text-xs hover:text-amber-200"
        >
          <Menu size={20} />
          <span>Menu</span>
        </Link>
        <div className="w-10 h-10 flex items-center justify-center">
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}

export default Header;
