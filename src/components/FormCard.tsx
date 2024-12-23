"use client";

import { Post } from "@/lib/types";
import { Category } from "@prisma/client";
import axios from "axios";
import { Link, PlusIcon, Trash2Icon } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import {
  CldUploadButton,
  CloudinaryUploadWidgetOptions,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";

interface formCardProps {
  title: string;
  content: string;
  category: string;
  links: string[];
  publicId: string;
  imgUrl: string;
  errorMessage: string;
  isLoading: boolean;
  initialValues?: Post;
  isEditing?: boolean;
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  setCategory: Dispatch<SetStateAction<string>>;
  setLinks: Dispatch<SetStateAction<string[]>>;
  setPublicId: Dispatch<SetStateAction<string>>;
  setImgUrl: Dispatch<SetStateAction<string>>;
}
const FormCard: FC<formCardProps> = ({
  title,
  content,
  category,
  links,
  errorMessage,
  isLoading,
  initialValues,
  isEditing,
  submit,
  publicId,
  imgUrl,
  setTitle,
  setContent,
  setCategory,
  setLinks,
  setPublicId,
  setImgUrl,
}) => {
  const [linkValue, setLinkValue] = useState("");
  const [catLoading, setCatLoading] = useState(false);
  const [allCategory, setAllCategory] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      setCatLoading(true);
      try {
        const response = await axios.get("/api/category");
        setAllCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setCatLoading(false);
      }
    };
    getCategories();

    if (initialValues) {
      setTitle(initialValues.title);
      setContent(initialValues.content);
      setCategory(initialValues.catName);
      setLinks(initialValues.links);
      setPublicId(initialValues.publicId);
      setImgUrl(initialValues.imageUrl);
    }
  }, [
    initialValues,
    setTitle,
    setContent,
    setCategory,
    setLinks,
    setPublicId,
    setImgUrl,
  ]);

  const handleImageUpload = (results: CloudinaryUploadWidgetResults) => {
    console.log("result ", results);
    const info = results.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const publicId = info.public_id as string;
      setImgUrl(url);
      setPublicId(publicId);
      console.log("url ", url);
      console.log("publicId ", publicId);
    }
  };

  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/removeImage", { publicId });

      if (response.status === 201) {
        setImgUrl("");
        setPublicId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const widgetOptions: CloudinaryUploadWidgetOptions | undefined = {
    sources: ["local", "camera"], // Limit sources to local storage and camera
    resourceType: "image", // Restrict to image uploads only
    clientAllowedFormats: ["png", "jpg", "jpeg"], // Allow only specific formats
    maxFileSize: 5000000, // Optional: 5MB max file size
    cropping: false, // Optional: Disable cropping
  };

  const LinkSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (linkValue.trim() === "") return;
    setLinks([...links, linkValue]);
    console.log(links);
    setLinkValue("");
  };
  const LinkDelete = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-4 md:gap-7 justify-center items-center w-full p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      {/* Text Input */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="input input-bordered w-full text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />

      {/* Textarea for Bio */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea textarea-bordered w-full text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        placeholder="Content"
      ></textarea>

      {/* Select Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select select-bordered w-full text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      >
        {catLoading && <option>Loading...</option>}
        <option defaultValue={""}>Select Category</option>
        {allCategory.map((category) => (
          <option key={category.id} value={category.catName}>
            {category.catName}
          </option>
        ))}
      </select>

      {/* Links Section */}
      <div className="w-full p-3 flex flex-col gap-2">
        {links &&
          links.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
            >
              <div className="flex items-center justify-center text-gray-500 dark:text-gray-300">
                <Link className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div className="flex-1 text-xs md:text-base text-gray-700 dark:text-gray-300">
                {link}
              </div>
              <button
                onClick={(e) => LinkDelete(index, e)}
                className="btn btn-error flex items-center justify-center"
              >
                <Trash2Icon className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
          ))}
      </div>

      {/* Add Link Input */}
      <div className="w-full flex justify-between items-center gap-2 md:gap-4">
        <input
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
          type="text"
          placeholder="Add Link"
          className="input input-bordered flex-1 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
        <button
          onClick={LinkSubmit}
          className="btn flex items-center justify-center"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Image File Input */}
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={widgetOptions}
        onSuccess={handleImageUpload}
        className={`relative z-0 cursor-pointer flex flex-col items-center justify-center w-full h-40 border border-dashed rounded-lg ${
          imgUrl ? "pointer-events-none" : ""
        } text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700`}
      >
        <FiImage className="text-4xl" />
        <span className="mt-2 text-sm">Upload Image</span>
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {imgUrl && (
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="absolute inset-0 object-cover rounded-lg"
          />
        )}
      </CldUploadButton>

      {publicId && (
        <button onClick={removeImage} className="btn self-start btn-error mt-2">
          Remove Image
        </button>
      )}

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-neutral w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        disabled={isLoading}
      >
        {isEditing ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default FormCard;
