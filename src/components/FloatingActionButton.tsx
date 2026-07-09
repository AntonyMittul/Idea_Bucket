"use client"
import { Plus } from "lucide-react"

export function FloatingActionButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="fab" onClick={onClick} aria-label="Add new idea">
      <Plus size={28} />
      <span className="fab-text">New Idea</span>
    </button>
  )
}
