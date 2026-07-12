import prisma from "@/lib/prisma"
import { Dashboard } from "@/components/Dashboard"

export const dynamic = "force-dynamic"

export default async function Home() {
  const ideas = await prisma.idea.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return <Dashboard initialIdeas={ideas} />
}
