"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

interface IDelete {
  slug: string;
}

const DeleteButton: React.FC<IDelete> = ({ slug }) => {
  const router = useRouter();

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
    }
  };
  return (
    <div
      onClick={() => handleDelete(slug)}
      className="font-bold btn btn-error text-sm md:text-base"
    >
      Delete
    </div>
  );
};

export default DeleteButton;
