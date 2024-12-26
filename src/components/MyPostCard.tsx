"use client";

import { Post } from "@/lib/types";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const MyPostCard = ({
  title,
  content,
  slug,
  catName,
  createdAt,
  links,
  authorEmail,
  imageUrl,
}: Post) => {
  const dateObject = new Date(Date.parse(createdAt));
  const date = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const ref = useRef(null); // Reference to the card container
  const inView = useInView(ref, { margin: "-100px" }); // Use rootMargin for intersection adjustment
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
      transition={{ duration: 0.5 }}
      className=""
    >
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row gap-5 p-5 transition-transform transform hover:scale-105">
        {/* Image Section */}
        <div className="w-full md:w-2/5">
          <Image
            src={imageUrl || "/assets/thumbnail.jpg"}
            alt="Post Image"
            width={500}
            height={500}
            className="w-full h-52 md:h-72 object-cover rounded-lg"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between w-full md:w-3/5 gap-2 md:gap-4">
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-xs md:text-base text-gray-600 dark:text-gray-300 mt-2">
              {content}
            </p>
          </div>

          {/* Links & Category */}
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2 text-xs md:text-base font-medium">
              {links.map((link, index) => (
                <Link
                  href={link}
                  key={index}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {link}
                </Link>
              ))}
            </div>
            <div className="text-xs md:text-base font-medium">
              <span className="text-gray-500 dark:text-gray-400">
                Category:{" "}
              </span>
              {catName}
            </div>
          </div>

          {/* Author & Date */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="text-xs md:text-base font-medium">
              <span className="text-gray-500 dark:text-gray-400">Author: </span>
              {authorEmail.slice(0, 26)}
            </div>
            <div className="text-sm md:text-base font-medium">
              <span className="text-gray-500 dark:text-gray-400">
                Posted on:{" "}
              </span>
              {date}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <Link
              href={`/edit-post/${slug}`}
              className="px-2 py-1 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-medium rounded-lg shadow-md transition"
            >
              Edit
            </Link>
            <DeleteButton slug={slug} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MyPostCard;
