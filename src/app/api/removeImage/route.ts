import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  
});

const removeImage = async (publicId: string) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    console.log(result);
    console.log("Image removed successfully");
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req: Request) => {
  const { publicId } = await req.json();
  await removeImage(publicId);
  return NextResponse.json({ message: "Image removed successfully" }, { status: 201 });

};

