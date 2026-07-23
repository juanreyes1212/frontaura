import { TrendingUp, Calendar, Award, Clock } from 'lucide-react'
import { useProgressContext } from '../context/ProgressContext'
import { PHASES } from '../data/curriculum'
import { ProgressBar } from '../components/ProgressBar'

const COLORS: Array<'cyan' | 'green' | 'amber'> = ['cyan', 'green', 'amber']

export default function Progress() {
  const { overallPercent, completedTopics, totalTopics, phaseStats, store } = useProgressContext()

  const startDate = store.startDate ? new Date(store.startDate) : new Date()
  const daysElapsed = Math.max(1, Math.floor((Date.now() - startDate.getTime()) / 86400000))
  const topicsPerDay = (completedTopics / daysElapsed).toFixed(2)

  // Timeline of completions
  const completed = Object.entries(store.topics)
    .filter(([, v]) => v.completed && v.completedAt)
    .sort(([, a], [, b]) => (a.completedAt! > b.completedAt! ? -1 : 1))
    .slice(0, 10)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={14} className="text-cyan" />
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">// progress</span>
        </div>
        <h1 className="font-mono text-2xl font-bold text-text">
          Your Progress<span className="text-cyan">_</span>
        </h1>
      </div>

      {/* Velocity stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="neu p-4">
          <p className="font-mono text-xs text-text-muted mb-1">Overall</p>
          <p className="font-mono text-2xl font-bold glow-cyan">{overallPercent}%</p>
        </div>
        <div className="neu p-4">
          <p className="font-mono text-xs text-text-muted mb-1">Topics Done</p>
          <p className="font-mono text-2xl font-bold glow-green">{completedTopics}</p>
          <p className="font-mono text-xs text-text-dim">{totalTopics} total</p>
        </div>
        <div className="neu p-4">
          <p className="font-mono text-xs text-text-muted mb-1">Days Active</p>
          <p className="font-mono text-2xl font-bold glow-amber">{daysElapsed}</p>
        </div>
        <div className="neu p-4">
          <p className="font-mono text-xs text-text-muted mb-1">Topics/Day</p>
          <p className="font-mono text-2xl font-bold glow-cyan">{topicsPerDay}</p>
          <p className="font-mono text-xs text-text-dim">velocity</p>
        </div>
      </div>

      {/* Overall bar */}
      <div className="neu p-5">
        <h2 className="font-mono text-sm font-semibold text-text mb-4">Overall Completion</h2>
        <div className="flex items-center gap-4">
          {/* Circular indicator */}
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#1e2840" strokeWidth="8" />
              <circle
                cx="40" cy="40" r="32"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(overallPercent / 100) * 201} 201`}
                style={{ filter: 'drop-shadow(0 0 4px #00e5ff88)' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold text-cyan">
              {overallPercent}%
            </span>
          </div>
          <div className="flex-1">
            <ProgressBar percent={overallPercent} color="cyan" />
            <p className="font-mono text-xs text-text-dim mt-2">
              {completedTopics} of {totalTopics} topics completed
            </p>
            {completedTopics > 0 && (
              <p className="font-mono text-xs text-text-muted mt-1">
                At current pace, full completion in ~{Math.ceil((totalTopics - completedTopics) / parseFloat(topicsPerDay))} days
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Per-phase breakdown */}
      <div className="neu p-5">
        <h2 className="font-mono text-sm font-semibold text-text mb-4">Phase Breakdown</h2>
        <div className="space-y-4">
          {phaseStats.map((stat, i) => {
            const phase = PHASES.find((p) => p.id === stat.phaseId)!
            const color = COLORS[i % COLORS.length]
            return (
              <div key={stat.phaseId}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs text-${color}`}>
                      {String(stat.phaseNumber).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-xs text-text truncate max-w-48">{phase.title}</span>
                  </div>
                  <span className="font-mono text-xs text-text-muted ml-2 shrink-0">
                    {stat.completed}/{stat.total}
                  </span>
                </div>
                <ProgressBar percent={stat.percent} color={color} size="sm" showValue={false} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="neu p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={14} className="text-cyan" />
          <h2 className="font-mono text-sm font-semibold text-text">Completion Timeline</h2>
        </div>
        {completed.length === 0 ? (
          <div className="neu-inset py-8 text-center">
            <Clock size={24} className="text-text-dim mx-auto mb-2" />
            <p className="font-mono text-xs text-text-muted">No completions yet — start marking topics done!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {completed.map(([id, prog]) => {
              const phaseEntry = PHASES.find((p) => p.topics.some((t) => t.id === id))
              const topic = phaseEntry?.topics.find((t) => t.id === id)
              if (!topic) return null
              return (
                <div key={id} className="flex items-center gap-3 p-2.5 neu-inset-sm">
                  <Award size={12} className="shrink-0 text-green" />
                  <span className="font-mono text-xs text-text flex-1 truncate">{topic.title}</span>
                  <span className="font-mono text-xs text-text-dim shrink-0">
                    {prog.completedAt ? new Date(prog.completedAt).toLocaleDateString() : ''}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Start date */}
      <div className="flex items-center gap-2 text-text-dim font-mono text-xs px-1">
        <Clock size={11} />
        <span>Journey started {startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>
    </div>
  )
}
