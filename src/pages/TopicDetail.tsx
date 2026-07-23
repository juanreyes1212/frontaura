import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, CheckCircle2, Circle, ExternalLink, BookOpen, Wrench, Save } from 'lucide-react'
import { getTopicById, getPhaseById } from '../data/curriculum'
import { useProgressContext } from '../context/ProgressContext'

const PRIORITY_BADGE: Record<string, string> = {
  Critical: 'badge-critical',
  High: 'badge-high',
  Medium: 'badge-medium',
  'Nice-to-Have': 'badge text-text-dim border-border',
}

export default function TopicDetail() {
  const { phaseId, topicId } = useParams<{ phaseId: string; topicId: string }>()
  const navigate = useNavigate()
  const { getTopicProgress, toggleTopic, setNotes, startTopic } = useProgressContext()

  const topic = topicId ? getTopicById(topicId) : undefined
  const phase = phaseId ? getPhaseById(phaseId) : undefined
  const prog = topicId ? getTopicProgress(topicId) : undefined

  const [notes, setLocalNotes] = useState(prog?.notes ?? '')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (topicId) startTopic(topicId)
  }, [topicId, startTopic])

  useEffect(() => {
    setLocalNotes(prog?.notes ?? '')
  }, [prog?.notes])

  const handleSaveNotes = () => {
    if (topicId) {
      setNotes(topicId, notes)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  if (!topic || !phase) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="neu p-8 text-center">
          <p className="font-mono text-text-muted">Topic not found.</p>
          <button onClick={() => navigate('/curriculum')} className="btn-cyan mt-4">
            Back to Curriculum
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back */}
      <button
        onClick={() => navigate('/curriculum')}
        className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-cyan transition-colors"
      >
        <ArrowLeft size={13} /> Back to Curriculum
      </button>

      {/* Header */}
      <div className="neu p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-mono text-xs text-text-muted">Phase {phase.number} ·</span>
              <span className="font-mono text-xs text-text-muted">{phase.title}</span>
            </div>
            <h1 className="font-mono text-xl font-bold text-text mb-3">{topic.title}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={PRIORITY_BADGE[topic.priority] ?? 'badge text-text-dim border-border'}>
                {topic.priority}
              </span>
              <span className="font-mono text-xs text-text-dim">{topic.points.length} learning points</span>
              {prog?.startedAt && (
                <span className="font-mono text-xs text-text-dim">
                  Started {new Date(prog.startedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => topicId && toggleTopic(topicId)}
            className={`shrink-0 flex items-center gap-2 btn ${
              prog?.completed ? 'btn-green' : 'btn-cyan'
            }`}
          >
            {prog?.completed ? (
              <>
                <CheckCircle2 size={14} /> Complete
              </>
            ) : (
              <>
                <Circle size={14} /> Mark Done
              </>
            )}
          </button>
        </div>
      </div>

      {/* Learning Points */}
      <div className="neu p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={14} className="text-cyan" />
          <h2 className="font-mono text-sm font-semibold text-text">Learning Points</h2>
        </div>
        <ul className="space-y-2">
          {topic.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 p-2.5 neu-inset-sm">
              <span className="font-mono text-xs text-cyan mt-0.5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-sm text-text leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Project */}
      <div className="neu p-5 border border-amber/10">
        <div className="flex items-center gap-2 mb-3">
          <Wrench size={14} className="text-amber" />
          <h2 className="font-mono text-sm font-semibold text-text">Project Challenge</h2>
        </div>
        <p className="font-mono text-sm text-text leading-relaxed mb-3">{topic.project}</p>
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(topic.project + ' tutorial')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cyan inline-flex items-center gap-2 text-xs"
        >
          Find Resources <ExternalLink size={11} />
        </a>
      </div>

      {/* Notes */}
      <div className="neu p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-mono text-sm font-semibold text-text">My Notes</h2>
          <button
            onClick={handleSaveNotes}
            className={`btn text-xs flex items-center gap-1.5 ${saved ? 'btn-green' : 'btn-cyan'}`}
          >
            <Save size={11} />
            {saved ? 'Saved!' : 'Save'}
          </button>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setLocalNotes(e.target.value)}
          placeholder="// Add your notes, links, and takeaways here..."
          rows={6}
          className="w-full bg-transparent font-mono text-sm text-text placeholder:text-text-dim outline-none resize-y neu-inset p-3 rounded-xl leading-relaxed"
        />
      </div>

      {/* Completed stamp */}
      {prog?.completed && prog.completedAt && (
        <div className="neu-inset p-4 border border-green/20 text-center">
          <CheckCircle2 size={20} className="text-green mx-auto mb-1 drop-shadow-[0_0_6px_#39ff1499]" />
          <p className="font-mono text-xs text-green">
            Completed {new Date(prog.completedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      )}
    </div>
  )
}
