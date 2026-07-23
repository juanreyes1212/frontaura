import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  FolderKanban,
  Settings,
  Zap,
} from 'lucide-react'
import { useProgressContext } from '../context/ProgressContext'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/curriculum', label: 'Curriculum', icon: BookOpen },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const { overallPercent, completedTopics, totalTopics } = useProgressContext()

  return (
    <aside className="w-56 shrink-0 flex flex-col border-r border-border bg-surface sticky top-0 h-screen">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg neu-sm flex items-center justify-center">
            <Zap size={14} className="text-cyan" />
          </div>
          <span className="font-mono font-bold text-sm tracking-widest glow-cyan">
            FRONTAURA
          </span>
        </div>
        <p className="font-mono text-xs text-text-muted mt-1 pl-9">jr → senior</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={15} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Progress footer */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-mono text-xs text-text-muted">Overall</span>
          <span className="font-mono text-xs text-cyan">{overallPercent}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${overallPercent}%` }} />
        </div>
        <p className="font-mono text-xs text-text-dim mt-1.5">
          {completedTopics}/{totalTopics} topics
        </p>
      </div>
    </aside>
  )
}
