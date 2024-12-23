"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DashboardIcon,
  FaceIcon,
  HamburgerMenuIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function Hamburger() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const closeDropdown = () => setOpen(false);

  const user = session?.user?.image;
  const name = session?.user?.name || "Guest User";
  const email = session?.user?.email || "No email provided";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Hamburger Menu Trigger */}
      <SheetTrigger asChild>
        <HamburgerMenuIcon className="w-6 h-6 cursor-pointer hover:text-blue-500 transition" />
      </SheetTrigger>

      {/* Sidebar Content */}
      <SheetContent className="flex flex-col gap-5 px-4 py-8 w-72 bg-white dark:bg-gray-900 dark:text-gray-300 text-gray-900 rounded-lg shadow-lg">
        {/* Navigation Links */}
        <div className="flex flex-1 flex-col gap-4">
          {["Religion", "Technology", "Sport", "Politics", "Entertainment"].map(
            (category) => (
              <Link
                key={category}
                href={`/${category.toLowerCase()}`}
                onClick={closeDropdown}
                className="block p-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {category}
              </Link>
            )
          )}
        </div>

        {/* Authenticated User Section */}
        {status === "authenticated" ? (
          <div className="flex flex-col gap-4">
            {/* My Posts */}
            <Link
              href="/dashboard"
              onClick={closeDropdown}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <DashboardIcon className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">My Posts</span>
            </Link>

            {/* Create Post */}
            <Link
              href="/create-post"
              onClick={closeDropdown}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <PlusIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Create Post</span>
            </Link>

            {/* User Info */}
            <div className="flex items-center gap-3 p-2 rounded-md">
              {user ? (
                <Image
                  src={user}
                  alt="User profile"
                  width={30}
                  height={30}
                  className="rounded-full hover:ring-2 hover:ring-blue-500 transition"
                />
              ) : (
                <FaceIcon className="w-8 h-8 p-1 rounded-full bg-gray-300 dark:bg-gray-700" />
              )}
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {email}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => {
                closeDropdown();
                signOut();
              }}
              className="flex items-center gap-3 p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-red-500 transition"
            >
              <LogOutIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        ) : (
          /* Guest User Login */
          <Link
            href="/sign-in"
            onClick={closeDropdown}
            className="flex items-center gap-3 p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <LogInIcon className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Log In</span>
          </Link>
        )}
      </SheetContent>
    </Sheet>
  );
}
