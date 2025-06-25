"use client";
import React from "react";
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
    // <div className="bg-slate-600 py-4">
    //   <div className="container mx-auto flex justify-between items-center">
    //     <div className="flex items-center gap-14">
    //       <Link href="/" className="flex items-center gap-4 text-2xl">
    //         <Image
    //           className="rounded "
    //           src="https://res.cloudinary.com/dqrfxpzld/image/upload/v1750777708/doc_analyser/logo1_s6tq4f.png"
    //           alt="logo from homer "
    //           width={50}
    //           height={50}
    //           placeholder="blur"
    //           blurDataURL={headerIconBlurImage}
    //         />
    //         <div className="hover:text-amber-200">DocLens</div>
    //       </Link>
    //       <nav className="flex items-center gap-7">
    //         <OrganizationSwitcher />
    //         <Link href="/" className="hover:text-amber-200">
    //           Home
    //         </Link>
    //         <Link href="/options-menu" className="hover:text-amber-200">
    //           Menu
    //         </Link>
    //       </nav>
    //     </div>

    //     <div className="flex gap-6 items-center">
    //       <ModeToggle />
    //       <HeaderActions />
    //     </div>
    //   </div>
    // </div>
    // <div className="bg-slate-600">
    //   {/* Top section with logo and name */}
    //   <div className="container mx-auto py-4 px-4 flex items-center justify-center sm:justify-start">
    //     <Link href="/" className="flex items-center gap-4 text-2xl">
    //       <Image
    //         className="rounded"
    //         src="https://res.cloudinary.com/dqrfxpzld/image/upload/v1750777708/doc_analyser/logo1_s6tq4f.png"
    //         alt="logo"
    //         width={50}
    //         height={50}
    //         placeholder="blur"
    //         blurDataURL={headerIconBlurImage}
    //       />
    //       <div className="hover:text-amber-200 text-white">DocLens</div>
    //     </Link>
    //   </div>
    //   {}
    //   {isMobile ? <h3>Mobile</h3> : <h3>Desktop</h3>}
    //   {/* Bottom nav for mobile only */}
    //   <div className="sm:hidden fixed bottom-0 left-0 w-full bg-slate-700 border-t border-slate-500 py-2 px-6 flex justify-around items-center text-white z-50">
    //     <OrganizationSwitcher
    //       appearance={{ elements: { rootBox: "w-6 h-6" } }}
    //     />
    //     <Link href="/" className="text-sm hover:text-amber-200">
    //       Home
    //     </Link>
    //     <Link href="/options-menu" className="text-sm hover:text-amber-200">
    //       Menu
    //     </Link>
    //     <HeaderActions />
    //   </div>
    // </div>

    <div className="bg-slate-600">
      {/* Top Header Bar */}
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
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

        {/* Center: Organization Switcher */}
        <div className="flex-1 flex justify-center">
          <OrganizationSwitcher />
        </div>

        {/* Right: Desktop Nav vs Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Desktop: nav links + toggle + avatar */}
          <div className="hidden md:flex items-center gap-6">
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
            <ModeToggle />
            <HeaderActions />
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
        <HeaderActions />
      </div>
    </div>
  );
}

export default Header;
