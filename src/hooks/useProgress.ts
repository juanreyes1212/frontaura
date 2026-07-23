import { useState, useCallback } from 'react'
import { PHASES, TOTAL_TOPICS } from '../data/curriculum'

export interface TopicProgress {
  completed: boolean
  completedAt?: string
  notes?: string
  startedAt?: string
}

export interface ProgressStore {
  topics: Record<string, TopicProgress>
  startDate?: string
}

const STORAGE_KEY = 'frontaura_progress'

function loadStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ProgressStore
  } catch {
    // ignore
  }
  return { topics: {}, startDate: new Date().toISOString() }
}

function saveStore(store: ProgressStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [store, setStore] = useState<ProgressStore>(loadStore)

  const getTopicProgress = useCallback(
    (topicId: string): TopicProgress => {
      return store.topics[topicId] ?? { completed: false }
    },
    [store],
  )

  const toggleTopic = useCallback((topicId: string) => {
    setStore((prev) => {
      const current = prev.topics[topicId] ?? { completed: false }
      const updated: ProgressStore = {
        ...prev,
        topics: {
          ...prev.topics,
          [topicId]: {
            ...current,
            completed: !current.completed,
            completedAt: !current.completed ? new Date().toISOString() : undefined,
            startedAt: current.startedAt ?? new Date().toISOString(),
          },
        },
      }
      saveStore(updated)
      return updated
    })
  }, [])

  const setNotes = useCallback((topicId: string, notes: string) => {
    setStore((prev) => {
      const updated: ProgressStore = {
        ...prev,
        topics: {
          ...prev.topics,
          [topicId]: {
            ...(prev.topics[topicId] ?? { completed: false }),
            notes,
          },
        },
      }
      saveStore(updated)
      return updated
    })
  }, [])

  const startTopic = useCallback((topicId: string) => {
    setStore((prev) => {
      if (prev.topics[topicId]?.startedAt) return prev
      const updated: ProgressStore = {
        ...prev,
        topics: {
          ...prev.topics,
          [topicId]: {
            ...(prev.topics[topicId] ?? { completed: false }),
            startedAt: new Date().toISOString(),
          },
        },
      }
      saveStore(updated)
      return updated
    })
  }, [])

  const resetAll = useCallback(() => {
    const fresh: ProgressStore = { topics: {}, startDate: new Date().toISOString() }
    saveStore(fresh)
    setStore(fresh)
  }, [])

  // Computed stats
  const completedTopics = Object.values(store.topics).filter((t) => t.completed).length
  const totalTopics = TOTAL_TOPICS
  const overallPercent = Math.round((completedTopics / totalTopics) * 100)

  const phaseStats = PHASES.map((phase) => {
    const phaseTopics = phase.topics
    const done = phaseTopics.filter((t) => store.topics[t.id]?.completed).length
    return {
      phaseId: phase.id,
      phaseNumber: phase.number,
      title: phase.title,
      total: phaseTopics.length,
      completed: done,
      percent: Math.round((done / phaseTopics.length) * 100),
    }
  })

  return {
    store,
    getTopicProgress,
    toggleTopic,
    setNotes,
    startTopic,
    resetAll,
    completedTopics,
    totalTopics,
    overallPercent,
    phaseStats,
  }
}
