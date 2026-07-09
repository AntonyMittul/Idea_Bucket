import Link from "next/link"
import { motion } from "framer-motion"

export function IdeaCard({ idea }: { idea: any }) {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress': return 'status-in-progress'
      case 'completed': return 'status-completed'
      case 'archived': return 'status-archived'
      default: return 'status-not-started'
    }
  }

  const date = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  }).format(new Date(idea.createdAt))

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/idea/${idea.id}`} className="idea-card glass-panel">
        <div className="idea-card-header">
          <h3 className="idea-title">{idea.title}</h3>
        </div>
        <p className="idea-description">{idea.description || 'No description provided.'}</p>
        <div className="idea-meta">
          <span className={`status-badge ${getStatusClass(idea.status)}`}>
            {idea.status}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>{date}</span>
        </div>
      </Link>
    </motion.div>
  )
}
