"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Hamburger } from "./Hamburger";
import { DropDown } from "./DropDown";
import { ModeToggle } from "./ModeToggle";
import { Globe } from "lucide-react";

const Navbar = () => {
  const { status } = useSession();
  return (
    <div className="fixed top-0 right-0 left-0 backdrop-blur-lg bg-opacity-20 bg-slate-300 z-50">
      <nav className="flex items-center justify-between max-w-6xl mx-auto p-4 md:p-6 ">
        <div className="flex items-center justify-center">
          <Link
            className="font-bold text-lg font-sans flex items-center justify-center"
            href={"/"}
          >
            <Globe className="w-5 h-5 text-blue-400 md:w-6 md:h-6 inline-block mr-1" />
            SBN Blog
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-center md:gap-6">
          <Link href={"religion"}>Religion</Link>
          <Link href={"technology"}>Technology</Link>
          <Link href={"sport"}>Sport</Link>
          <Link href={"politics"}>Politics</Link>
          <Link href={"entertainment"}>Entertainment</Link>
        </div>
        <div className="hidden md:flex items-center justify-center gap-2 md:gap-6">
          {status === "authenticated" ? (
            <>
              <ModeToggle />
              <DropDown />
            </>
          ) : (
            <>
              <ModeToggle />
              <Link href={"sign-in"}>SignIn</Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center justify-center gap-2">
          <ModeToggle />
          <Hamburger />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
