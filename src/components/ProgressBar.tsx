interface ProgressBarProps {
  percent: number
  label?: string
  showValue?: boolean
  color?: 'cyan' | 'green' | 'amber'
  size?: 'sm' | 'md'
}

const COLOR_MAP = {
  cyan: 'linear-gradient(90deg, #00e5ff, #006d7a)',
  green: 'linear-gradient(90deg, #39ff14, #1a7a0a)',
  amber: 'linear-gradient(90deg, #ff9f1c, #7a4a00)',
}

const GLOW_MAP = {
  cyan: '0 0 6px #00e5ff88',
  green: '0 0 6px #39ff1488',
  amber: '0 0 6px #ff9f1c88',
}

export function ProgressBar({ percent, label, showValue = true, color = 'cyan', size = 'md' }: ProgressBarProps) {
  const height = size === 'sm' ? 'h-1.5' : 'h-2'

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="font-mono text-xs text-text-muted">{label}</span>}
          {showValue && (
            <span className={`font-mono text-xs text-${color} ml-auto`}>{percent}%</span>
          )}
        </div>
      )}
      <div className={`neu-inset-sm ${height} relative overflow-hidden rounded-full`}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percent}%`,
            background: COLOR_MAP[color],
            boxShadow: GLOW_MAP[color],
          }}
        />
      </div>
    </div>
  )
}
