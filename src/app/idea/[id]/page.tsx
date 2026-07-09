import { auth } from "@/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { IdeaClientView } from "./IdeaClientView"

export default async function IdeaPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/api/auth/signin")
  }

  const idea = await prisma.idea.findUnique({
    where: { id: params.id }
  })

  if (!idea || idea.userId !== session.user.id) {
    redirect("/")
  }

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">Idea Bucket</h1>
      </header>
      <IdeaClientView initialIdea={idea} />
    </div>
  )
}
