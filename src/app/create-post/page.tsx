"use client";

import FormCard from "@/components/FormCard";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [publicId, setPublicId] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!title || !content) {
        return setErrorMessage("Title and content are required");
      }
      const newPost = {
        title,
        content,
        category,
        links,
        publicId,
        imgUrl,
      };
      const response = await axios.post("/api/posts", newPost);
      setIsLoading(true);
      if (response.status === 201) {
        console.log("Post created successfully");
        setTitle("");
        setContent("");
        setCategory("");
        setLinks([]);
        setPublicId("");
        setImgUrl("");
        router.push("/");
        router.refresh();
      } else {
        setErrorMessage(response.statusText);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-5 max-w-3xl mx-auto px-5">
      <h1 className="font-bold text-xl text-center">Create Post</h1>
      <FormCard
        title={title}
        content={content}
        category={category}
        links={links}
        publicId={publicId}
        imgUrl={imgUrl}
        setTitle={setTitle}
        setContent={setContent}
        setCategory={setCategory}
        setLinks={setLinks}
        setPublicId={setPublicId}
        setImgUrl={setImgUrl}
        errorMessage={errorMessage}
        isLoading={isLoading}
        submit={createPost}
        isEditing={false}
      />
    </div>
  );
};

export default CreatePostPage;
