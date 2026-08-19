import { IdeaClientView } from "./IdeaClientView"

export default async function IdeaPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">Idea Bucket</h1>
      </header>
      <IdeaClientView ideaId={params.id} />
    </div>
  )
}
