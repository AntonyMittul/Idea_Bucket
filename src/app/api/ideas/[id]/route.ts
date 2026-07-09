import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

type Props = { params: Promise<{ id: string }> }

export async function PUT(req: Request, props: Props) {
  const session = await auth()
  if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 })
  const params = await props.params
  const id = params.id
  
  try {
    const { title, description, status } = await req.json()
    
    const idea = await prisma.idea.findUnique({ where: { id } })
    if (!idea || idea.userId !== session.user.id) {
      return new NextResponse("Not Found / Unauthorized", { status: 404 })
    }

    const updated = await prisma.idea.update({
      where: { id },
      data: { title, description, status }
    })

    return NextResponse.json(updated)
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(req: Request, props: Props) {
  const session = await auth()
  if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 })
  const params = await props.params
  const id = params.id
  
  try {
    const idea = await prisma.idea.findUnique({ where: { id } })
    if (!idea || idea.userId !== session.user.id) {
      return new NextResponse("Not Found / Unauthorized", { status: 404 })
    }

    await prisma.idea.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
