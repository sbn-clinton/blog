import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req : Request, { params }: { params: { authorEmail: string } }) => {
  const authorEmail = params.authorEmail
  try {
    const posts = await prisma.posts.findMany({
      where: {
        authorEmail
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        title: true,
        content: true,
        slug: true,
        catName: true,
        createdAt: true,
        links: true,
        authorEmail: true,
        publicId: true,
        imageUrl: true,
      },
    })
    return NextResponse.json(posts, { status: 200 })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "could not fetch post" }, { status: 500 })
  }
}