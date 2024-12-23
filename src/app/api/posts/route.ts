import prisma from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/options"


export const GET = async () => {
  try {
    const posts = await prisma.posts.findMany({
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

export const POST = async (req: Request) => {
  const session = await getServerSession( authOptions)
  const authorEmail = session?.user?.email
  if (!authorEmail) {
    redirect("sign-in")
  }
  try {
    const { title, content, category, links, publicId, imgUrl } = await req.json()
    if (!title || !content ) {
      return NextResponse.json({ message: "title and content are required" }, { status: 400 })
    }
    const post = await prisma.posts.create({
      data: {
        title,
        content,
        links,
        catName: category,
        authorEmail,
        publicId,
        imageUrl: imgUrl,
      },
    })
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "could not create post" }, { status: 500 })
  }
}