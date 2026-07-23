import type { ReactNode } from 'react'

interface NeuCardProps {
  children: ReactNode
  className?: string
  inset?: boolean
  sm?: boolean
  glow?: 'cyan' | 'green' | 'amber'
  onClick?: () => void
}

export function NeuCard({ children, className = '', inset = false, sm = false, glow, onClick }: NeuCardProps) {
  const base = inset ? (sm ? 'neu-inset-sm' : 'neu-inset') : sm ? 'neu-sm' : 'neu'
  const glowClass = glow ? `border border-${glow}/30` : ''
  const glowShadow = glow ? `shadow-glow-${glow}` : ''
  const cursor = onClick ? 'cursor-pointer' : ''

  return (
    <div
      className={`${base} ${glowClass} ${glowShadow} ${cursor} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
