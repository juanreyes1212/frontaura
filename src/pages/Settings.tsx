import { useState } from 'react'
import { Settings as SettingsIcon, Trash2, Download, Upload, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useProgressContext } from '../context/ProgressContext'

export default function Settings() {
  const { resetAll, store, completedTopics, totalTopics, overallPercent } = useProgressContext()
  const [confirmReset, setConfirmReset] = useState(false)
  const [exported, setExported] = useState(false)
  const [importError, setImportError] = useState('')

  const handleExport = () => {
    const data = JSON.stringify(store, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `frontaura-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setExported(true)
    setTimeout(() => setExported(false), 2000)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string)
        if (typeof parsed.topics !== 'object') throw new Error('Invalid format')
        localStorage.setItem('frontaura_progress', JSON.stringify(parsed))
        window.location.reload()
      } catch {
        setImportError('Invalid file format. Please use a Frontaura export file.')
        setTimeout(() => setImportError(''), 3000)
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (confirmReset) {
      resetAll()
      setConfirmReset(false)
    } else {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 5000)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <SettingsIcon size={14} className="text-cyan" />
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">// settings</span>
        </div>
        <h1 className="font-mono text-2xl font-bold text-text">
          Settings<span className="text-cyan">_</span>
        </h1>
      </div>

      {/* Progress summary */}
      <div className="neu p-5">
        <h2 className="font-mono text-sm font-semibold text-text mb-4">Progress Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="neu-inset p-3 text-center">
            <p className="font-mono text-xl font-bold glow-cyan">{overallPercent}%</p>
            <p className="font-mono text-xs text-text-muted mt-1">Complete</p>
          </div>
          <div className="neu-inset p-3 text-center">
            <p className="font-mono text-xl font-bold glow-green">{completedTopics}</p>
            <p className="font-mono text-xs text-text-muted mt-1">Topics done</p>
          </div>
          <div className="neu-inset p-3 text-center">
            <p className="font-mono text-xl font-bold text-text">{totalTopics - completedTopics}</p>
            <p className="font-mono text-xs text-text-muted mt-1">Remaining</p>
          </div>
        </div>
        {store.startDate && (
          <p className="font-mono text-xs text-text-dim mt-3">
            Journey started: {new Date(store.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}
      </div>

      {/* Export */}
      <div className="neu p-5">
        <h2 className="font-mono text-sm font-semibold text-text mb-2">Export Progress</h2>
        <p className="text-text-muted text-xs mb-4">Save your progress as a JSON file to back up or migrate to another device.</p>
        <button
          onClick={handleExport}
          className={`btn flex items-center gap-2 ${exported ? 'btn-green' : 'btn-cyan'}`}
        >
          {exported ? <CheckCircle2 size={13} /> : <Download size={13} />}
          {exported ? 'Exported!' : 'Export Progress'}
        </button>
      </div>

      {/* Import */}
      <div className="neu p-5">
        <h2 className="font-mono text-sm font-semibold text-text mb-2">Import Progress</h2>
        <p className="text-text-muted text-xs mb-4">Restore progress from a previously exported Frontaura JSON file.</p>
        {importError && (
          <div className="flex items-center gap-2 p-2.5 neu-inset-sm mb-3 border border-red/30">
            <AlertTriangle size={12} className="text-red shrink-0" />
            <span className="font-mono text-xs text-red">{importError}</span>
          </div>
        )}
        <label className="btn-cyan flex items-center gap-2 w-fit cursor-pointer">
          <Upload size={13} />
          Import File
          <input type="file" accept=".json" onChange={handleImport} className="hidden" />
        </label>
      </div>

      {/* Sustainable design info */}
      <div className="neu p-5 border border-green/10">
        <h2 className="font-mono text-sm font-semibold text-text mb-2">🌿 Sustainable Design</h2>
        <p className="text-text-muted text-xs leading-relaxed">
          Frontaura is built with sustainable web design in mind — dark mode by default (reduces energy on OLED screens), 
          minimal animations, no unnecessary network requests, and all data stored locally in your browser. 
          No tracking, no telemetry, no servers.
        </p>
      </div>

      {/* Danger zone */}
      <div className="neu p-5 border border-red/20">
        <h2 className="font-mono text-sm font-semibold text-red mb-2 flex items-center gap-2">
          <AlertTriangle size={13} /> Danger Zone
        </h2>
        <p className="text-text-muted text-xs mb-4">Reset all progress. This cannot be undone.</p>
        <button
          onClick={handleReset}
          className={`btn flex items-center gap-2 font-mono text-sm border transition-all duration-150 ${
            confirmReset
              ? 'text-red border-red/60 bg-red/10'
              : 'text-text-muted border-border hover:text-red hover:border-red/40'
          }`}
        >
          <Trash2 size={13} />
          {confirmReset ? 'Click again to confirm reset' : 'Reset All Progress'}
        </button>
      </div>
    </div>
  )
}
