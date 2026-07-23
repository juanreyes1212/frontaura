import { useNavigate } from 'react-router-dom'
import { ChevronRight, Clock, CheckCircle2 } from 'lucide-react'
import type { Phase } from '../data/curriculum'
import { ProgressBar } from './ProgressBar'
import { useProgressContext } from '../context/ProgressContext'

interface PhaseCardProps {
  phase: Phase
}

const PHASE_COLORS: Array<'cyan' | 'green' | 'amber'> = [
  'cyan', 'green', 'amber', 'cyan', 'green', 'amber', 'cyan', 'green', 'amber',
]

export function PhaseCard({ phase }: PhaseCardProps) {
  const navigate = useNavigate()
  const { phaseStats } = useProgressContext()
  const stat = phaseStats.find((s) => s.phaseId === phase.id)
  const color = PHASE_COLORS[(phase.number - 1) % PHASE_COLORS.length]
  const isComplete = stat?.percent === 100

  return (
    <div
      className="neu p-5 cursor-pointer group transition-all duration-200 hover:shadow-glow-cyan"
      onClick={() => navigate('/curriculum')}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg neu-sm flex items-center justify-center text-${color} font-mono text-xs font-bold border border-${color}/20`}
          >
            {String(phase.number).padStart(2, '0')}
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-text leading-tight">{phase.title}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock size={10} className="text-text-muted" />
              <span className="font-mono text-xs text-text-muted">{phase.timeline}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {isComplete && <CheckCircle2 size={14} className="text-green" />}
          <ChevronRight size={14} className="text-text-dim group-hover:text-cyan transition-colors" />
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-text-muted mb-4 leading-relaxed line-clamp-2">{phase.description}</p>

      {/* Progress */}
      <ProgressBar percent={stat?.percent ?? 0} color={color} size="sm" />
      <div className="flex justify-between mt-1.5">
        <span className="font-mono text-xs text-text-dim">{stat?.completed ?? 0}/{stat?.total ?? 0} topics</span>
      </div>
    </div>
  )
}
