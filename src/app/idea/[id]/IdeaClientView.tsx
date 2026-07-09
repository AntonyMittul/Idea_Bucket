"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Trash2, Edit2, Save, X } from "lucide-react"

export function IdeaClientView({ initialIdea }: { initialIdea: any }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialIdea.title)
  const [description, setDescription] = useState(initialIdea.description || "")
  const [status, setStatus] = useState(initialIdea.status)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch(`/api/ideas/${initialIdea.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status })
      })
      if (res.ok) {
        setIsEditing(false)
        router.refresh()
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this idea?")) return
    try {
      const res = await fetch(`/api/ideas/${initialIdea.id}`, { method: 'DELETE' })
      if (res.ok) {
        router.push("/")
        router.refresh()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).format(new Date(dateString))
  }

  return (
    <div className="glass-panel" style={{ padding: '40px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <ArrowLeft size={20} /> Back
        </Link>
        <div style={{ display: 'flex', gap: '8px' }}>
          {isEditing ? (
            <>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}><X size={16} /> Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}><Save size={16} /> Save</button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={() => setIsEditing(true)}><Edit2 size={16} /> Edit</button>
              <button className="btn btn-secondary" style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={handleDelete}><Trash2 size={16} /> Delete</button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <label className="input-label">Title</label>
            <input className="input-field" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Status</label>
            <select className="input-field" value={status} onChange={e => setStatus(e.target.value)} style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea className="input-field" value={description} onChange={e => setDescription(e.target.value)} style={{ minHeight: '200px' }} />
          </div>
        </div>
      ) : (
        <>
          <h1 style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--text-main)', lineHeight: '1.2' }}>{title}</h1>
          
          <div style={{ display: 'inline-flex', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '32px', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Status:</span>
            <strong style={{ 
              color: status === 'Completed' ? 'var(--status-green)' : status === 'In Progress' ? 'var(--status-blue)' : status === 'Archived' ? 'var(--status-muted)' : 'var(--status-gray)' 
            }}>{status}</strong>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', marginBottom: '40px' }}>
            <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-main)', fontSize: '16px', lineHeight: '1.7' }}>{description || <span style={{ color: 'var(--text-muted)' }}>No description provided.</span>}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '20px', color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>
            <div>Created: {formatDate(initialIdea.createdAt)}</div>
            <div>Updated: {formatDate(initialIdea.updatedAt)}</div>
          </div>

          <div className="detail-section">
            <h3>Resources</h3>
            <div className="detail-section-empty">No resources yet</div>
          </div>

          <div className="detail-section">
            <h3>Notes</h3>
            <div className="detail-section-empty">No notes yet</div>
          </div>
        </>
      )}
    </div>
  )
}
