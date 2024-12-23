import prisma from "@/lib/db"
import { NextResponse } from "next/server"

  

export const GET = async () => {
  try {
    const category = await prisma.category.findMany()
    return NextResponse.json(category, {status: 200})
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message : "could not fetch category"}, {status: 500} )
  }
}