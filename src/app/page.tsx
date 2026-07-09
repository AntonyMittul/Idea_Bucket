import { auth } from "@/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Dashboard } from "@/components/Dashboard"

export default async function Home() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/api/auth/signin")
  }

  const ideas = await prisma.idea.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  })

  return <Dashboard initialIdeas={ideas} />
}
