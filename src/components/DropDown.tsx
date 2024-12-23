"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LayoutDashboard, LogOutIcon, PlusIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FaceIcon } from "@radix-ui/react-icons";

export function DropDown() {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);

  if (!session) {
    return null;
  }

  const closeDropdown = () => setOpen(false);

  const user = session.user?.image;
  const name = session.user?.name || "Guest User";
  const email = session.user?.email || "No email provided";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* Profile Trigger */}
      <DropdownMenuTrigger asChild>
        {user ? (
          <Image
            src={user}
            alt="Profile picture"
            width={35}
            height={35}
            className="rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
          />
        ) : (
          <FaceIcon className="w-10 h-10 p-1 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-500 transition" />
        )}
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent className="flex flex-col gap-3 p-3 w-64 rounded-md shadow-md bg-white dark:bg-gray-800 dark:text-gray-300 text-gray-900">
        {/* User Info */}
        <div className="text-center mb-2">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
        </div>

        {/* My Posts */}
        <Link
          href="/dashboard"
          onClick={closeDropdown}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <LayoutDashboard className="w-5 h-5 text-blue-500" />
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

        {/* Logout */}
        <button
          onClick={() => {
            closeDropdown();
            signOut();
          }}
          className="flex items-center gap-3 p-2 mt-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-red-500 font-medium transition"
        >
          <LogOutIcon className="w-5 h-5" />
          Log Out
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
