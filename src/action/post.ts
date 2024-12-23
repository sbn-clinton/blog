"use server";

import  prisma  from "@/lib/db";

export const getAllPosts = async () => {
  const posts = await prisma.posts.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      id: true,
      content: true,
      slug: true,
      catName: true,
      createdAt: true,
      links: true,
      authorEmail: true,
      publicId: true,
      imageUrl: true,
    },
  });
  return posts;
};

export const getCatPosts = async (catName: string) => {
  const posts = await prisma.posts.findMany({
    where: {
      catName: catName,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    select: {
      title: true,
      id: true,
      content: true,
      slug: true,
      catName: true,
      createdAt: true,
      links: true,
      authorEmail: true,
      publicId: true,
      imageUrl: true,
    },
  });
  return posts;
};
 