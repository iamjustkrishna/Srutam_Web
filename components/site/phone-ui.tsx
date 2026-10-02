import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ListChecks,
  Menu,
  MoreHorizontal,
  Search,
  Sparkles,
} from 'lucide-react'

export const SAMPLE_TITLE = 'A little idea for a big launch'
export const SAMPLE_TRANSCRIPT =
  "What if we made the launch feel more personal? Let's show how Srutam captures ideas on a morning walk. I'll film a short demo on Friday. Keep the story simple: speak, find clarity, take the next step."
export const SAMPLE_TASKS = [
  'Film a morning-walk demo on Friday',
  'Keep the launch story personal',
]

export function Waveform({ paused = false }: { paused?: boolean }) {
  return (
    <span className={`waveform ${paused ? 'paused' : ''}`} aria-hidden="true">
      {Array.from({ length: 23 }, (_, i) => (
        <i
          key={i}
          style={{
            height: `${7 + ((i * 13 + 9) % 27)}px`,
            animationDelay: `${i * -0.08}s`,
          }}
        />
      ))}
    </span>
  )
}

export function PhoneFrame({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`phone-frame ${className}`}>
      <div className="phone-screen">
        <div className="phone-status">
          <span>9:41</span>
          <span className="phone-camera" />
          <span className="phone-signal">
            <span className="signal-bars" />
            <span className="battery" />
          </span>
        </div>
        {children}
      </div>
      <span className="phone-side-button" />
    </div>
  )
}

export function FeedContent({
  sample = false,
  onOpen,
  title = SAMPLE_TITLE,
}: {
  sample?: boolean
  onOpen?: () => void
  title?: string
}) {
  return (
    <>
      <div className="app-heading">
        <Menu size={18} />
        <span>
          My notes<span className="app-heading-dot">.</span>
        </span>
        <MoreHorizontal size={20} />
      </div>
      <div className="app-greeting">A little space for your mind.</div>
      <div className="app-search">
        <Search size={14} />
        <span>Find a thought...</span>
        <Search size={12} />
      </div>
      <div className="app-filters">
        <span className="selected">All notes</span>
        <span>Ideas</span>
        <span>Personal</span>
      </div>
      <div className="app-date">
        TODAY <span>{sample ? '3' : '2'} NOTES</span>
      </div>
      {sample && (
        <button className="note-card sample-note" onClick={onOpen}>
          <span className="note-meta">
            <span className="tiny-dot" /> JUST NOW <ArrowUpRight size={13} />
          </span>
          <strong>{title}</strong>
          <p>A morning walk. A clearer story. A next step.</p>
          <span className="note-tag">Launch idea</span>
        </button>
      )}
      <div className="note-card blue-note">
        <div className="note-meta">
          <span className="tiny-dot" /> 09:32 AM <span>01:24</span>
        </div>
        <strong>The idea on my morning walk</strong>
        <p>Some of the best thoughts arrive when you stop looking for them.</p>
        <div className="note-card-bottom">
          <span className="note-tag">Personal</span>
          <span className="small-wave" aria-hidden>
            ▂▅▃▇▂▆▃▅▂
          </span>
        </div>
      </div>
      <div className="note-card">
        <div className="note-meta">
          <span className="tiny-dot amber" /> 08:15 AM <span>00:48</span>
        </div>
        <strong>A few things for tomorrow</strong>
        <p>Less to remember. More room to think.</p>
        <div className="note-card-bottom">
          <span className="note-tag warm">Life stuff</span>
          <ListChecks size={14} />
        </div>
      </div>
      {!sample && (
        <div className="app-whisper">Your next thought belongs here.</div>
      )}
    </>
  )
}

export function StaticDock({ recording = false }: { recording?: boolean }) {
  return (
    <div className="app-dock">
      <div className={`dock-capsule ${recording ? 'is-recording' : ''}`}>
        {recording ? (
          <>
            <span className="record-dot" />
            <span className="record-time">00:08</span>
            <Waveform />
            <span className="pause-glyph">Ⅱ</span>
          </>
        ) : (
          <>
            <span className="dock-tab active">
              <Menu size={14} />
              Notes
            </span>
            <span className="dock-tab">
              <ListChecks size={14} />
              Insights
            </span>
            <span className="dock-tab">
              <Sparkles size={14} />
              AI
            </span>
          </>
        )}
      </div>
      <span className={`shutter ${recording ? 'recording' : ''}`}>
        <i />
      </span>
    </div>
  )
}

export function StaticPhone({ recording = false }: { recording?: boolean }) {
  return (
    <PhoneFrame>
      <FeedContent />
      <StaticDock recording={recording} />
    </PhoneFrame>
  )
}

export function ClarityPreview({ actions = false }: { actions?: boolean }) {
  return (
    <PhoneFrame>
      <div className="app-heading">
        <ChevronLeft size={18} />
        <span>{actions ? 'Next steps' : 'A clearer picture'}</span>
        <MoreHorizontal size={18} />
      </div>
      <div className="preview-intro">
        <span className="note-tag">FROM YOUR VOICE</span>
        <h3>{SAMPLE_TITLE}</h3>
        <p>One thought. A little more possibility.</p>
      </div>
      <div className="insight-card">
        <span className="insight-label">
          <Sparkles size={15} />
          {actions ? 'READY WHEN YOU ARE' : 'THE ESSENCE'}
        </span>
        <p>
          {actions
            ? 'Small steps make ideas real.'
            : 'Make the launch personal. Show how a morning walk becomes a moment of clarity with Srutam.'}
        </p>
      </div>
      {actions ? (
        SAMPLE_TASKS.map((task) => (
          <div className="preview-task" key={task}>
            <span className="fake-check">
              <Check size={12} />
            </span>
            {task}
          </div>
        ))
      ) : (
        <>
          <div className="insight-card">
            <span className="insight-label">THE IDEA</span>
            <p>A launch told through everyday moments.</p>
          </div>
          <div className="insight-card">
            <span className="insight-label">THE DECISION</span>
            <p>Keep the story simple. Keep it human.</p>
          </div>
        </>
      )}
      <StaticDock />
    </PhoneFrame>
  )
}
