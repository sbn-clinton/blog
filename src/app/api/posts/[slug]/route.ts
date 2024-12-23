import prisma from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/options"



export const GET = async (req : Request, { params }: { params: { slug: string } }) => {
  const slug = params.slug
  try {
    const post = await prisma.posts.findUnique({
      where: {
        slug
      },
      select: {
        title: true,
        content: true,
        catName: true,
        links: true,
        createdAt: true,
        authorEmail: true,
        publicId: true,
        imageUrl: true,
      },
      
    })
    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "could not fetch post" }, { status: 500 })
  }
}

export const DELETE = async (req : Request, { params }: { params: { slug: string } }) => {
  const slug = params.slug
  try {
    const post = await prisma.posts.delete({
      where: { slug },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ message: "Could not delete post" }, { status: 500 });
  }
};


export const PUT = async (req: Request, { params }: { params: { slug: string } }) => {
  const slug = params.slug

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
    const post = await prisma.posts.update({
      where: {
        slug
      },
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
    return NextResponse.json({ message: "could not update post" }, { status: 500 })
  }
}