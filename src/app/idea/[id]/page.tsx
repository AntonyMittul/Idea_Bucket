import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { IdeaClientView } from "./IdeaClientView"

export default async function IdeaPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  const idea = await prisma.idea.findUnique({
    where: { id: params.id }
  })

  if (!idea) {
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
