"use client";

import { Post } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const PostCard = ({
  title,
  content,
  slug,
  catName,
  createdAt,
  authorEmail,
  links,
  imageUrl,
}: Post) => {
  const dateObject = new Date(Date.parse(createdAt));
  const date = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const ref = useRef(null); // Reference to the card container
  const inView = useInView(ref, { margin: "-100px" }); // Use rootMargin to adjust sensitivity
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, scale: 1 });
    } else {
      controls.start({ opacity: 0, scale: 0.9 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={controls}
      transition={{ duration: 1, ease: "easeInOut" }}
      className=""
    >
      <Link href={`/single-post/${slug}`} className="group">
        <div className="flex flex-col md:flex-row gap-5 p-4 rounded-lg border shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 bg-white font-sans">
          {/* Image Section */}
          <div className="relative w-full md:w-2/5 h-56 md:h-64 rounded-lg overflow-hidden">
            <Image
              src={imageUrl || "/assets/thumbnail.jpg"}
              alt={title}
              layout="fill"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-between w-full md:w-3/5">
            {/* Title */}
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-500">
              {title}
            </h2>

            {/* Content Preview */}
            <p className="text-xs md:text-base text-gray-600 dark:text-gray-300 mb-2 md:mb-4">
              {content.slice(0, 100)}...
            </p>

            {/* Additional Info */}
            <div className="text-xs md:text-base flex flex-col gap-2 text-gray-700 dark:text-gray-400">
              <p className="font-light">
                <span className="font-semibold">Author:</span> {authorEmail}
              </p>
              <p className="font-light">
                <span className="font-semibold">Category:</span> {catName}
              </p>
              <p className="font-light">
                <span className="font-semibold">Posted on:</span> {date}
              </p>
            </div>

            {/* Links */}
            {links.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 md:mt-4">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link}
                    className="text-blue-500 hover:underline text-xs md:text-sm"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PostCard;
