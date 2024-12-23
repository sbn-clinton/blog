"use client";

import FormCard from "@/components/FormCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

const EditPostPage = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [publicId, setPublicId] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [post, setPost] = useState({
    slug: "",
    id: "",
    title: "",
    content: "",
    catName: "",
    links: [],
    createdAt: "",
    authorEmail: "",
    publicId: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/posts/${slug}`);
        const data = await response.data;
        setPost(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [slug]);

  const router = useRouter();

  const editPost = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const response = await axios.put(`/api/posts/${slug}`, newPost);
      setIsLoading(true);
      if (response.status === 201) {
        console.log("Post updated successfully");
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
      <BackButton />
      <h1 className="font-bold text-xl text-center">Edit Post</h1>
      <FormCard
        title={title}
        content={content}
        category={category}
        links={links}
        publicId={publicId}
        imgUrl={imgUrl}
        isEditing={true}
        setTitle={setTitle}
        setContent={setContent}
        setCategory={setCategory}
        setLinks={setLinks}
        setPublicId={setPublicId}
        setImgUrl={setImgUrl}
        errorMessage={errorMessage}
        isLoading={isLoading}
        submit={editPost}
        initialValues={post}
      />
    </div>
  );
};

export default EditPostPage;
