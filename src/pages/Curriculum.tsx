import { useState } from 'react'
import { BookOpen, Search } from 'lucide-react'
import { PHASES } from '../data/curriculum'
import { TopicItem } from '../components/TopicItem'
import { ProgressBar } from '../components/ProgressBar'
import { useProgressContext } from '../context/ProgressContext'

type FilterMode = 'all' | 'incomplete' | 'complete'

const PHASE_COLORS: Array<'cyan' | 'green' | 'amber'> = [
  'cyan', 'green', 'amber', 'cyan', 'green', 'amber', 'cyan', 'green', 'amber',
]

export default function Curriculum() {
  const { phaseStats, getTopicProgress } = useProgressContext()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterMode>('all')
  const [expandedPhase, setExpandedPhase] = useState<string | null>(PHASES[0].id)

  const togglePhase = (id: string) => setExpandedPhase((prev) => (prev === id ? null : id))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={14} className="text-cyan" />
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">// curriculum</span>
        </div>
        <h1 className="font-mono text-2xl font-bold text-text">
          Learning Path<span className="text-cyan">_</span>
        </h1>
        <p className="text-text-muted text-sm mt-1">
          {PHASES.length} phases · 7–9 months · mid-junior → senior
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 items-center">
        <div className="flex-1 neu-inset-sm flex items-center gap-2 px-3 py-2">
          <Search size={13} className="text-text-muted shrink-0" />
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent font-mono text-sm text-text placeholder:text-text-dim outline-none flex-1"
          />
        </div>
        <div className="flex gap-1 neu-sm p-1">
          {(['all', 'incomplete', 'complete'] as FilterMode[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-3 py-1.5 rounded-md transition-all duration-150 capitalize ${
                filter === f ? 'neu-inset-sm text-cyan' : 'text-text-muted hover:text-text'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Phase list */}
      <div className="space-y-3">
        {PHASES.map((phase, i) => {
          const stat = phaseStats.find((s) => s.phaseId === phase.id)
          const color = PHASE_COLORS[i % PHASE_COLORS.length]
          const isOpen = expandedPhase === phase.id

          const filteredTopics = phase.topics
            .filter((t) => {
              if (search) {
                return (
                  t.title.toLowerCase().includes(search.toLowerCase()) ||
                  t.points.some((p) => p.toLowerCase().includes(search.toLowerCase()))
                )
              }
              return true
            })
            .filter((t) => {
              const done = getTopicProgress(t.id).completed
              if (filter === 'complete') return done
              if (filter === 'incomplete') return !done
              return true
            })

          if (filteredTopics.length === 0 && (search || filter !== 'all')) return null

          return (
            <div key={phase.id} className="neu overflow-hidden">
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-xl neu-sm flex items-center justify-center font-mono text-xs font-bold text-${color} border border-${color}/20 shrink-0`}
                >
                  {String(phase.number).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-semibold text-text">{phase.title}</span>
                    {stat?.percent === 100 && (
                      <span className="font-mono text-xs text-green">✓ complete</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-xs text-text-muted">{phase.timeline}</span>
                    <span className="font-mono text-xs text-text-dim">·</span>
                    <span className="font-mono text-xs text-text-dim">{stat?.completed ?? 0}/{stat?.total ?? 0} done</span>
                  </div>
                </div>
                <div className="w-24 shrink-0">
                  <ProgressBar percent={stat?.percent ?? 0} color={color} size="sm" showValue={false} />
                  <span className={`font-mono text-xs text-${color} float-right mt-0.5`}>{stat?.percent ?? 0}%</span>
                </div>
                <span
                  className={`font-mono text-text-muted text-sm transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-90' : ''}`}
                  style={{ display: 'inline-block' }}
                >
                  ›
                </span>
              </button>

              {/* Phase topics */}
              {isOpen && (
                <div className="border-t border-border px-4 py-3 space-y-2">
                  <p className="font-mono text-xs text-text-muted mb-3 px-1 leading-relaxed">{phase.description}</p>
                  {filteredTopics.map((topic) => (
                    <TopicItem key={topic.id} topic={topic} phaseId={phase.id} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
