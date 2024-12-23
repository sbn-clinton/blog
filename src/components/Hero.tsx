"use client";

import { useState, useEffect } from "react";
import { getPost } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const Hero = ({ heroPost }: { heroPost: getPost[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-swipe logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroPost.length);
    }, 3000); // Swipe every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [heroPost.length]);

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] bg-gray-900 rounded-lg overflow-hidden">
      {/* Carousel container */}
      <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out">
        {heroPost.map((post, index) => (
          <div
            key={post.slug}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={post.imageUrl || "/assets/thumbnail.jpg"}
              alt={post.title}
              fill
              className="object-cover w-full h-full opacity-50 rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
            <div className="absolute bottom-5 left-5 z-10 text-left text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {post.title}
              </h1>
              <p className="text-sm md:text-lg mb-6">
                {post.content.slice(0, 100)}...
              </p>
              <div className="text-sm md:text-base font-light mb-6">
                <p>
                  <span className="font-semibold">Author:</span>{" "}
                  {post.authorEmail}
                </p>
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {post.catName}
                </p>
                <p>
                  <span className="font-semibold">Posted on:</span>{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Link href={`/single-post/${post.slug}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
        {heroPost.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full ${
              currentIndex === index
                ? "bg-white w-2 h-2 md:w-3 md:h-3"
                : "bg-gray-500 w-1 h-1 md:w-2 md:h-2"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
