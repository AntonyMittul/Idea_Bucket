"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export function AddIdeaModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const tempTitle = title
    const tempDesc = description

    // Optimistically close modal instantly
    setTitle("")
    setDescription("")
    onClose()

    // Fire network request in background
    fetch("/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: tempTitle, description: tempDesc, status: "Not Started" })
    }).then(() => {
      router.refresh()
    }).catch(console.error)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="modal-content glass-panel" 
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>New Idea</h2>
        <form onSubmit={handleSave}>
          <div className="input-group">
            <label className="input-label">Title</label>
            <input 
              ref={inputRef}
              type="text" 
              className="input-field" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="E.g., AI Interview Coach"
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Description (Optional)</label>
            <textarea 
              ref={textareaRef}
              className="input-field" 
              value={description}
              onChange={handleTextareaChange}
              placeholder="Brief details about your idea..."
              style={{ overflow: 'hidden' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  )
}
