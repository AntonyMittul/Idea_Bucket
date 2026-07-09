import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const ideas = await prisma.idea.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' }
    })
    return NextResponse.json(ideas)
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const { title, description, status } = await req.json()
    if (!title) return new NextResponse("Bad Request", { status: 400 })

    const idea = await prisma.idea.create({
      data: {
        title,
        description,
        status: status || "Not Started",
        userId: session.user.id
      }
    })

    return NextResponse.json(idea)
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
