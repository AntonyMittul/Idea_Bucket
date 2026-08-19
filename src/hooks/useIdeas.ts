"use client"
import { useState, useEffect } from 'react'

export type Idea = {
  id: string
  title: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
}

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from local storage on mount
  useEffect(() => {
    const storedIdeas = localStorage.getItem('idea-bucket-ideas')
    if (storedIdeas) {
      try {
        setIdeas(JSON.parse(storedIdeas))
      } catch (e) {
        console.error("Failed to parse ideas from local storage", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to local storage whenever ideas change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('idea-bucket-ideas', JSON.stringify(ideas))
    }
  }, [ideas, isLoaded])

  const addIdea = (title: string, description: string) => {
    const newIdea: Idea = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'Not Started',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setIdeas(prev => [newIdea, ...prev])
  }

  const updateIdea = (id: string, updates: Partial<Idea>) => {
    setIdeas(prev => prev.map(idea => {
      if (idea.id === id) {
        return { ...idea, ...updates, updatedAt: new Date().toISOString() }
      }
      return idea
    }))
  }

  const deleteIdea = (id: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id))
  }

  const getIdea = (id: string) => {
    return ideas.find(idea => idea.id === id)
  }

  return {
    ideas,
    isLoaded,
    addIdea,
    updateIdea,
    deleteIdea,
    getIdea
  }
}
