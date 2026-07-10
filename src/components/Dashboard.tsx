"use client"
import { useState, useRef, useEffect } from "react"
import { IdeaCard } from "./IdeaCard"
import { FloatingActionButton } from "./FloatingActionButton"
import { AddIdeaModal } from "./AddIdeaModal"
import { Search, Lightbulb, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function Dashboard({ initialIdeas }: { initialIdeas: any[] }) {
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [filter, setFilter] = useState("All")
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filtered = initialIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(search.toLowerCase()) || 
                          (idea.description && idea.description.toLowerCase().includes(search.toLowerCase()))
    
    if (filter === "All") return matchesSearch
    return matchesSearch && idea.status.toLowerCase() === filter.toLowerCase()
  })

  const filters = ["All", "Not Started", "In Progress", "Completed", "Archived"]

  return (
    <>
      <header className="app-header flex justify-between items-center">
        <div>
          <div className="app-title-row">
            <Lightbulb size={28} color="var(--primary)" />
            <h1 className="app-title">Idea Bucket</h1>
          </div>
          <p className="app-tagline">Never lose a good idea.</p>
        </div>
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-muted-foreground hover:text-foreground transition-colors p-2"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </header>
      
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input 
          ref={searchInputRef}
          type="text" 
          className="search-input" 
          placeholder="Search ideas..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="search-shortcut">Ctrl K</span>
      </div>

      <div className="filter-chips">
        {filters.map(f => (
          <button 
            key={f} 
            className={`filter-chip ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="ideas-feed">
        {filtered.length === 0 ? (
          search || filter !== "All" ? (
            <div className="empty-state">
              <p>No ideas match your search or filter.</p>
            </div>
          ) : (
            <div className="empty-state">
              <Lightbulb size={64} className="empty-state-icon" strokeWidth={1} />
              <h3>No ideas yet</h3>
              <p>Capture your first idea before it slips away.</p>
              <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                Create Idea
              </button>
            </div>
          )
        ) : (
          filtered.map(idea => <IdeaCard key={idea.id} idea={idea} />)
        )}
      </div>

      <FloatingActionButton onClick={() => setIsModalOpen(true)} />
      <AddIdeaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
