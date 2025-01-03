"use client";

import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer footer-center gap-4 md:gap-8 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded p-8 md:p-10 shadow-lg">
      {/* Navigation Links */}
      <nav className="grid grid-flow-col gap-3 md:gap-6 text-xs md:text-sm font-medium">
        <Link href="/about" className="hover:underline hover:text-blue-600">
          About us
        </Link>
        <Link href="/contact" className="hover:underline hover:text-blue-600">
          Contact
        </Link>

        <Link href="/jobs" className="hover:underline hover:text-blue-600">
          Jobs
        </Link>
        <Link href="/press-kit" className="hover:underline hover:text-blue-600">
          Press kit
        </Link>
      </nav>

      {/* Social Media Links */}
      <nav className="mt-2 md:mt-4">
        <div className="flex justify-center gap-3 md:gap-6 text-xl">
          <Link
            href="https://twitter.com"
            target="_blank"
            aria-label="Twitter"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            <FaTwitter />
          </Link>
          <Link
            href="https://github.com/"
            target="_blank"
            aria-label="Github"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            aria-label="LinkedIn"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-600 transition"
          >
            <FaLinkedin />
          </Link>
        </div>
      </nav>

      {/* Copyright Section */}
      <aside className="mt-2 md:mt-4 text-xs md:text-sm ">
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
          <span className="font-bold text-sky-400">SBN_web_dev</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
