import { useNavigate } from 'react-router-dom'
import { FolderKanban, Wrench, CheckCircle2, Circle, ExternalLink } from 'lucide-react'
import { PHASES } from '../data/curriculum'
import { useProgressContext } from '../context/ProgressContext'

const PHASE_COLORS: Array<'cyan' | 'green' | 'amber'> = ['cyan', 'green', 'amber', 'cyan', 'green', 'amber', 'cyan', 'green', 'amber']

export default function Projects() {
  const navigate = useNavigate()
  const { getTopicProgress, toggleTopic } = useProgressContext()

  const allProjects = PHASES.flatMap((phase, i) =>
    phase.topics.map((topic) => ({
      topicId: topic.id,
      phaseId: phase.id,
      phaseNumber: phase.number,
      phaseTitle: phase.title,
      project: topic.project,
      topicTitle: topic.title,
      priority: topic.priority,
      color: PHASE_COLORS[i % PHASE_COLORS.length],
      completed: getTopicProgress(topic.id).completed,
    }))
  )

  const done = allProjects.filter((p) => p.completed)
  const pending = allProjects.filter((p) => !p.completed)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FolderKanban size={14} className="text-cyan" />
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">// projects</span>
        </div>
        <h1 className="font-mono text-2xl font-bold text-text">
          Project Challenges<span className="text-cyan">_</span>
        </h1>
        <p className="text-text-muted text-sm mt-1">
          {done.length} built · {pending.length} remaining · {allProjects.length} total
        </p>
      </div>

      {/* Kanban-style columns */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* To Do */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Circle size={12} className="text-text-muted" />
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">To Build ({pending.length})</span>
          </div>
          <div className="space-y-3">
            {pending.map((p) => (
              <ProjectCard key={p.topicId} {...p} onToggle={() => toggleTopic(p.topicId)} onView={() => navigate(`/curriculum/${p.phaseId}/${p.topicId}`)} />
            ))}
            {pending.length === 0 && (
              <div className="neu-inset py-8 text-center rounded-xl">
                <CheckCircle2 size={20} className="text-green mx-auto mb-2" />
                <p className="font-mono text-xs text-green">All projects built!</p>
              </div>
            )}
          </div>
        </div>

        {/* Done */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <CheckCircle2 size={12} className="text-green" />
            <span className="font-mono text-xs text-green uppercase tracking-wider">Built ({done.length})</span>
          </div>
          <div className="space-y-3">
            {done.map((p) => (
              <ProjectCard key={p.topicId} {...p} onToggle={() => toggleTopic(p.topicId)} onView={() => navigate(`/curriculum/${p.phaseId}/${p.topicId}`)} />
            ))}
            {done.length === 0 && (
              <div className="neu-inset py-8 text-center rounded-xl">
                <Wrench size={20} className="text-text-dim mx-auto mb-2" />
                <p className="font-mono text-xs text-text-muted">Complete topics to unlock projects here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  topicId: string
  phaseNumber: number
  phaseTitle: string
  project: string
  topicTitle: string
  priority: string
  color: 'cyan' | 'green' | 'amber'
  completed: boolean
  onToggle: () => void
  onView: () => void
}

function ProjectCard({ phaseNumber, project, topicTitle, color, completed, onToggle, onView }: ProjectCardProps) {
  return (
    <div className={`neu p-4 group transition-all duration-150 ${completed ? 'opacity-70' : 'hover:shadow-glow-cyan'}`}>
      <div className="flex items-start gap-3">
        <button onClick={onToggle} className="shrink-0 mt-0.5 text-text-muted hover:text-cyan transition-colors">
          {completed ? (
            <CheckCircle2 size={15} className="text-green drop-shadow-[0_0_4px_#39ff1488]" />
          ) : (
            <Circle size={15} />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`font-mono text-xs text-${color}`}>Ph.{String(phaseNumber).padStart(2, '0')}</span>
          </div>
          <p className={`font-mono text-xs text-text leading-snug ${completed ? 'line-through text-text-dim' : ''}`}>
            {project}
          </p>
          <p className="font-mono text-xs text-text-muted mt-1 truncate">{topicTitle}</p>
        </div>
        <button
          onClick={onView}
          className="shrink-0 text-text-dim hover:text-cyan transition-colors"
          title="View topic"
        >
          <ExternalLink size={12} />
        </button>
      </div>
    </div>
  )
}
