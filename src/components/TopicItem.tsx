import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react'
import type { Topic } from '../data/curriculum'
import { useProgressContext } from '../context/ProgressContext'

interface TopicItemProps {
  topic: Topic
  phaseId: string
}

const PRIORITY_BADGE: Record<string, string> = {
  Critical: 'badge-critical',
  High: 'badge-high',
  Medium: 'badge-medium',
  'Nice-to-Have': 'badge text-text-dim border-border',
}

export function TopicItem({ topic, phaseId }: TopicItemProps) {
  const navigate = useNavigate()
  const { getTopicProgress, toggleTopic } = useProgressContext()
  const prog = getTopicProgress(topic.id)

  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleTopic(topic.id)
  }

  return (
    <div
      className="flex items-center gap-3 p-3 neu-sm cursor-pointer group hover:shadow-glow-cyan transition-all duration-150"
      onClick={() => navigate(`/curriculum/${phaseId}/${topic.id}`)}
    >
      {/* Checkbox */}
      <button
        onClick={handleCheck}
        className="shrink-0 text-text-muted hover:text-cyan transition-colors"
        aria-label={prog.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {prog.completed ? (
          <CheckCircle2 size={18} className="text-green drop-shadow-[0_0_4px_#39ff1488]" />
        ) : (
          <Circle size={18} />
        )}
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <span
          className={`font-mono text-sm leading-tight ${prog.completed ? 'text-text-dim line-through' : 'text-text'}`}
        >
          {topic.title}
        </span>
        <div className="flex items-center gap-2 mt-1">
          <span className={PRIORITY_BADGE[topic.priority] ?? 'badge text-text-dim border-border'}>
            {topic.priority}
          </span>
          <span className="font-mono text-xs text-text-dim">{topic.points.length} points</span>
        </div>
      </div>

      <ChevronRight size={14} className="shrink-0 text-text-dim group-hover:text-cyan transition-colors" />
    </div>
  )
}
