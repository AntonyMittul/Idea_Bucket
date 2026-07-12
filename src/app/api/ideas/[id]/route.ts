import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const { title, description, status } = await req.json()

    const idea = await prisma.idea.findUnique({
      where: { id: params.id }
    })

    if (!idea) {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    const updatedIdea = await prisma.idea.update({
      where: { id: params.id },
      data: { title, description, status }
    })

    return NextResponse.json(updatedIdea)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    
    const idea = await prisma.idea.findUnique({
      where: { id: params.id }
    })

    if (!idea) {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    await prisma.idea.delete({
      where: { id: params.id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
