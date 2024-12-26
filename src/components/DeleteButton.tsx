"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IDelete {
  slug: string;
}

const DeleteButton: React.FC<IDelete> = ({ slug }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const deleteImage = async (publicId: string) => {
    try {
      const response = await axios.post("/api/removeImage", { publicId });

      if (response.status === 201) {
        console.log("Image removed successfully");
        console.log("publicId: ", publicId);
      } else {
        console.log("Error removing image");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      setIsLoading(true);

      const response = await axios.delete(`/api/posts/${slug}`);
      if (response.status === 200) {
        const { publicId } = response.data;
        console.log("publicId: ", publicId);
        deleteImage(publicId);
        console.log("Post deleted successfully");
        router.push("/");
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      onClick={() => handleDelete(slug)}
      disabled={isLoading}
      className="font-bold btn btn-sm md:btn-md btn-error text-sm md:text-base"
    >
      <Trash className="w-3 h-3 md:w-5 md:h-5 mr-1" />
      Delete
    </button>
  );
};

export default DeleteButton;
