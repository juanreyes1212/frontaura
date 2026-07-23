import { useNavigate } from 'react-router-dom'
import { Zap, Clock, Target, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react'
import { useProgressContext } from '../context/ProgressContext'
import { PHASES } from '../data/curriculum'
import { ProgressBar } from '../components/ProgressBar'

function StatCard({ label, value, sub, color = 'cyan' }: { label: string; value: string | number; sub?: string; color?: 'cyan' | 'green' | 'amber' }) {
  return (
    <div className="neu p-4">
      <p className="font-mono text-xs text-text-muted mb-1">{label}</p>
      <p className={`font-mono text-2xl font-bold text-${color} glow-${color}`}>{value}</p>
      {sub && <p className="font-mono text-xs text-text-dim mt-1">{sub}</p>}
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { overallPercent, completedTopics, totalTopics, phaseStats, store } = useProgressContext()

  const startDate = store.startDate ? new Date(store.startDate) : new Date()
  const daysElapsed = Math.floor((Date.now() - startDate.getTime()) / 86400000)

  // Find current / next incomplete phase
  const currentPhaseIdx = phaseStats.findIndex((s) => s.percent < 100)
  const currentPhase = currentPhaseIdx >= 0 ? PHASES[currentPhaseIdx] : null
  const currentStat = currentPhaseIdx >= 0 ? phaseStats[currentPhaseIdx] : null

  // Recently completed topics
  const recentlyCompleted = Object.entries(store.topics)
    .filter(([, v]) => v.completed && v.completedAt)
    .sort(([, a], [, b]) => (b.completedAt! > a.completedAt! ? 1 : -1))
    .slice(0, 4)

  const completedPhases = phaseStats.filter((s) => s.percent === 100).length

  return (
    <div className="space-y-8 animate-flicker">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">// system online</span>
        </div>
        <h1 className="font-mono text-2xl font-bold text-text">
          Mission Control
          <span className="text-cyan ml-2">_</span>
        </h1>
        <p className="text-text-muted text-sm mt-1">Track your path from mid-junior to senior frontend engineer.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Overall Progress" value={`${overallPercent}%`} sub="of curriculum" color="cyan" />
        <StatCard label="Topics Complete" value={completedTopics} sub={`of ${totalTopics} total`} color="green" />
        <StatCard label="Phases Complete" value={completedPhases} sub={`of ${PHASES.length} phases`} color="amber" />
        <StatCard label="Days Active" value={daysElapsed || 1} sub="since start" color="cyan" />
      </div>

      {/* Overall progress bar */}
      <div className="neu p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={14} className="text-cyan" />
          <span className="font-mono text-sm font-semibold text-text">Curriculum Progress</span>
        </div>
        <ProgressBar percent={overallPercent} showValue size="md" />
        <div className="mt-4 grid grid-cols-3 gap-3">
          {phaseStats.slice(0, 3).map((s) => (
            <div key={s.phaseId}>
              <ProgressBar
                percent={s.percent}
                label={`Ph.${String(s.phaseNumber).padStart(2, '0')}`}
                color={s.phaseNumber % 3 === 1 ? 'cyan' : s.phaseNumber % 3 === 2 ? 'green' : 'amber'}
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Current phase */}
      {currentPhase && currentStat && (
        <div className="neu p-5 border border-cyan/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target size={14} className="text-cyan" />
              <span className="font-mono text-xs text-text-muted tracking-wider uppercase">Current Phase</span>
            </div>
            <button
              onClick={() => navigate('/curriculum')}
              className="btn-cyan px-3 py-1 text-xs flex items-center gap-1"
            >
              View <ArrowRight size={11} />
            </button>
          </div>
          <h2 className="font-mono text-base font-semibold text-text mb-1">
            {String(currentPhase.number).padStart(2, '0')}. {currentPhase.title}
          </h2>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={11} className="text-text-muted" />
            <span className="font-mono text-xs text-text-muted">{currentPhase.timeline}</span>
          </div>
          <ProgressBar percent={currentStat.percent} color="cyan" size="sm" />
          <p className="font-mono text-xs text-text-dim mt-1.5">{currentStat.completed}/{currentStat.total} topics</p>
        </div>
      )}

      {/* All phases done */}
      {!currentPhase && (
        <div className="neu p-6 border border-green/20 text-center">
          <CheckCircle2 size={32} className="text-green mx-auto mb-3 drop-shadow-[0_0_8px_#39ff1499]" />
          <p className="font-mono text-lg font-bold glow-green">Curriculum Complete!</p>
          <p className="text-text-muted text-sm mt-1">You've covered all {PHASES.length} phases. Senior level achieved.</p>
        </div>
      )}

      {/* Recently completed */}
      {recentlyCompleted.length > 0 && (
        <div className="neu p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={14} className="text-green" />
            <span className="font-mono text-sm font-semibold text-text">Recently Completed</span>
          </div>
          <div className="space-y-2">
            {recentlyCompleted.map(([id, prog]) => {
              const phaseEntry = PHASES.find((p) => p.topics.some((t) => t.id === id))
              const topic = phaseEntry?.topics.find((t) => t.id === id)
              if (!topic) return null
              return (
                <div
                  key={id}
                  className="flex items-center gap-3 p-2.5 neu-inset-sm cursor-pointer hover:border-green/20 border border-transparent transition-colors"
                  onClick={() => phaseEntry && navigate(`/curriculum/${phaseEntry.id}/${id}`)}
                >
                  <CheckCircle2 size={13} className="shrink-0 text-green" />
                  <span className="font-mono text-xs text-text flex-1">{topic.title}</span>
                  {prog.completedAt && (
                    <span className="font-mono text-xs text-text-dim">
                      {new Date(prog.completedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick start if nothing done */}
      {completedTopics === 0 && (
        <div className="neu p-5 border border-cyan/10">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-cyan" />
            <span className="font-mono text-sm font-semibold text-text">Get Started</span>
          </div>
          <p className="text-text-muted text-sm mb-4">Begin with Phase 1 — TypeScript Mastery & Core React. Each topic has a checklist and a project to build.</p>
          <button onClick={() => navigate('/curriculum')} className="btn-cyan flex items-center gap-2">
            Open Curriculum <ArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  )
}
