import { createContext, useContext } from 'react'
import type { useProgress } from '../hooks/useProgress'

type ProgressContextType = ReturnType<typeof useProgress>

export const ProgressContext = createContext<ProgressContextType | null>(null)

export function useProgressContext(): ProgressContextType {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgressContext must be used inside ProgressContext.Provider')
  return ctx
}
