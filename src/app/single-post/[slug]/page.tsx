"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import BackButton from "@/components/BackButton";

const SinglePostPage = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const [post, setPosts] = useState({
    title: "",
    content: "",
    catName: "",
    links: [],
    createdAt: "",
    authorEmail: "",
    publicId: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/posts/${slug}`);
        const data = await response.data;
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [slug]);

  const { title, content, catName, links, createdAt, authorEmail, imageUrl } =
    post;

  const dateObject = new Date(Date.parse(createdAt));
  const date = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="space-y-10  py-10 md:max-w-6xl md:mx-auto px-4 font-sans">
      <BackButton />
      {loading ? (
        <div className="flex justify-center items-center">
          <span className=" loading-spinner loading-md"></span>
        </div>
      ) : (
        <div className="flex flex-col md:mx-10  md:flex-row gap-2 md:gap-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className=" md:w-2/5">
            <Image
              src={imageUrl || "/assets/thumbnail.jpg"}
              alt="Post Image"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-2 md:gap-4 p-2 md:w-3/5">
            {/* Post Title */}
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h1>

            {/* Post Content */}
            <p className="text-gray-700 text-xs md:text-base dark:text-gray-300 leading-relaxed">
              {content}
            </p>

            {/* Links Section */}
            {links.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 md:mt-4">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link}
                    className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            )}

            {/* Post Metadata */}
            <div className=" mt-2 md:mt-4 space-y-2">
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Category:
                </span>{" "}
                {catName}
              </p>
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Author:
                </span>{" "}
                {authorEmail.slice(0, 26)}
              </p>
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Posted on:
                </span>{" "}
                {date}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePostPage;
