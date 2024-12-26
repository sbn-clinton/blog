"use client";

import MyPostCard from "@/components/MyPostCard";
import { Post } from "@/lib/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  const authorEmail = session?.user?.email;

  if (!authorEmail) {
    router.push("sign-in");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/myposts/${authorEmail}`);
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
  }, [authorEmail]);

  return (
    <div className=" flex flex-col gap-5 md:gap-10 md:max-w-5xl md:mx-auto font-sans px-5">
      <h1 className="font-bold text-lg md:text-xl text-center">My Post</h1>
      <div className="flex flex-col gap-4 md:gap-6">
        {loading && <span className="loading-spinner loading-md"></span>}
        {posts.map((post) => (
          <MyPostCard
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
};

export default DashboardPage;
