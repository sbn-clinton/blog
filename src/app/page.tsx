"use client";

import { getAllPosts } from "@/action/post";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import { getPost, Post } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [catPosts, setCatPosts] = useState<getPost[]>([]);

  useEffect(() => {
    const fetchCatPosts = async () => {
      setLoading(true);
      try {
        const response = await getAllPosts();
        setCatPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCatPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/posts");
        const data = await response.data;
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className=" flex flex-col gap-5 md:gap-10 max-w-5xl md:mx-auto px-5">
      <h1 className="font-bold text-xl text-center">All Post</h1>

      <Hero heroPost={catPosts} />
      <div className="flex flex-col gap-4 md:gap-7">
        {loading && <p>Loading...</p>}
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            id={post.id}
            title={post.title}
            content={post.content}
            slug={post.slug}
            catName={post.catName}
            createdAt={post.createdAt}
            links={post.links}
            authorEmail={post.authorEmail}
            publicId={post.publicId}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
