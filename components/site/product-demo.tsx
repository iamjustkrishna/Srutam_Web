'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ListChecks,
  Menu,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Trash2,
} from 'lucide-react'
import {
  FeedContent,
  PhoneFrame,
  SAMPLE_TASKS,
  SAMPLE_TITLE,
  SAMPLE_TRANSCRIPT,
  Waveform,
} from './phone-ui'

type RecordingState = 'idle' | 'recording' | 'paused' | 'save'
type Tab = 'Notes' | 'Insights' | 'AI'
const questions = [
  {
    q: 'What should I do next?',
    a: 'Film a short morning-walk demo on Friday. Keep the launch story simple and personal.',
  },
  {
    q: 'What was my launch idea?',
    a: 'Show how Srutam captures a thought on a morning walk, then turns it into clarity and a next step.',
  },
]

export function ProductDemo() {
  const [state, setState] = useState<RecordingState>('idle')
  const [seconds, setSeconds] = useState(0)
  const [tab, setTab] = useState<Tab>('Notes')
  const [saved, setSaved] = useState(false)
  const [detail, setDetail] = useState(false)
  const [title, setTitle] = useState(SAMPLE_TITLE)
  const [checked, setChecked] = useState<boolean[]>([false, false])
  const [answer, setAnswer] = useState<number | null>(null)
  const [status, setStatus] = useState(
    'Tap the red button to try a sample recording.',
  )
  const titleInput = useRef<HTMLInputElement>(null)
  const shutter = useRef<HTMLButtonElement>(null)
  const active = state === 'recording' || state === 'paused'

  useEffect(() => {
    if (state !== 'recording') return
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(timer)
  }, [state])
  useEffect(() => {
    if (state === 'save') titleInput.current?.focus()
  }, [state])

  function reset() {
    setState('idle')
    setSeconds(0)
    setTab('Notes')
    setSaved(false)
    setDetail(false)
    setTitle(SAMPLE_TITLE)
    setChecked([false, false])
    setAnswer(null)
    setStatus('Demo reset. Tap the red button to begin.')
  }
  function record() {
    if (active) {
      setState('save')
      setStatus('Sample captured. Give your note a name and save it.')
      return
    }
    setSeconds(0)
    setState('recording')
    setTab('Notes')
    setDetail(false)
    setStatus('Sample recording started. No microphone is being used.')
  }
  function cancel() {
    setState('idle')
    setSeconds(0)
    setStatus('Recording discarded. Try again whenever you like.')
    shutter.current?.focus()
  }
  function save() {
    setTitle(title.trim() || SAMPLE_TITLE)
    setSaved(true)
    setState('idle')
    setTab('Notes')
    setDetail(false)
    setStatus(
      'Note saved. Open it, explore Insights, or ask a sample question in AI.',
    )
    shutter.current?.focus()
  }
  const formatted = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`

  return (
    <section
      className="demo-section shell section"
      id="demo"
      aria-labelledby="demo-heading"
    >
      <div className="demo-copy" data-reveal>
        <p className="eyebrow">
          <span className="eyebrow-line" /> A LITTLE HANDS-ON MAGIC
        </p>
        <h2 id="demo-heading">
          One button.
          <br />
          <em>A lighter mind.</em>
        </h2>
        <p className="section-lede">
          You don&apos;t need the perfect words.
          <br />
          Just a place to put them.
        </p>
        <ol className="demo-instructions">
          <li className={active ? 'current' : ''}>
            <span>01</span>
            <div>
              <strong>Let a thought out</strong>
              <p>Tap the red button. Pause. Take your time.</p>
            </div>
          </li>
          <li className={saved && tab !== 'AI' ? 'current' : ''}>
            <span>02</span>
            <div>
              <strong>See the shape of it</strong>
              <p>Stop and save. Explore your note and insights.</p>
            </div>
          </li>
          <li className={tab === 'AI' ? 'current' : ''}>
            <span>03</span>
            <div>
              <strong>Find your next move</strong>
              <p>Check off a task or ask a sample question.</p>
            </div>
          </li>
        </ol>
        <div className="demo-disclosure">
          <span className="tiny-dot" /> Interactive sample. No mic. No uploads.
        </div>
        <button className="text-button" onClick={reset}>
          <RotateCcw size={14} /> Start fresh
        </button>
      </div>
      <div className="demo-stage">
        <span className="demo-orbit" aria-hidden />
        <div className="demo-phone-wrap">
          <PhoneFrame className="interactive-phone">
            <div className="demo-scroll" inert={state === 'save'}>
              {tab === 'Notes' && !detail && (
                <FeedContent
                  sample={saved}
                  title={title}
                  onOpen={() => setDetail(true)}
                />
              )}
              {tab === 'Notes' && detail && (
                <div className="note-detail">
                  <button className="app-back" onClick={() => setDetail(false)}>
                    <ArrowLeft size={15} /> All notes
                  </button>
                  <span className="note-tag">SAMPLE NOTE</span>
                  <h3>{title}</h3>
                  <span className="insight-label">TRANSCRIPT</span>
                  <p>{SAMPLE_TRANSCRIPT}</p>
                  <button
                    className="app-primary"
                    onClick={() => setTab('Insights')}
                  >
                    See insights <Sparkles size={14} />
                  </button>
                </div>
              )}
              {tab === 'Insights' && (
                <div className="demo-panel">
                  <h3>
                    Your insights<span>.</span>
                  </h3>
                  {saved ? (
                    <>
                      <span className="note-tag">FROM YOUR SAMPLE NOTE</span>
                      <div className="insight-card">
                        <span className="insight-label">
                          <Sparkles size={15} /> SUMMARY
                        </span>
                        <p>
                          Make the launch personal. Show how a morning walk
                          becomes a moment of clarity with Srutam.
                        </p>
                      </div>
                      <span className="insight-label">NEXT STEPS</span>
                      {SAMPLE_TASKS.map((task, i) => (
                        <label
                          className={`task-check ${checked[i] ? 'done' : ''}`}
                          key={task}
                        >
                          <input
                            type="checkbox"
                            checked={checked[i]}
                            onChange={() =>
                              setChecked(
                                checked.map((value, index) =>
                                  index === i ? !value : value,
                                ),
                              )
                            }
                          />
                          <span>{task}</span>
                        </label>
                      ))}
                      <div className="insight-card">
                        <span className="insight-label">IDEA & DECISION</span>
                        <p>
                          Tell the story through everyday moments. Keep it
                          simple and human.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="demo-empty">
                      <Sparkles size={28} />
                      <p>A little clarity starts with a thought.</p>
                      <span>
                        Record and save the sample to see its summary and next
                        steps.
                      </span>
                    </div>
                  )}
                </div>
              )}
              {tab === 'AI' && (
                <div className="demo-panel">
                  <h3>
                    Ask your notes<span>.</span>
                  </h3>
                  <span className="note-tag">PREPARED SAMPLE ANSWERS</span>
                  {saved ? (
                    <>
                      <p className="app-description">
                        The thought is there. Let&apos;s find it.
                      </p>
                      {questions.map((question, i) => (
                        <button
                          className="question-button"
                          key={question.q}
                          onClick={() => setAnswer(i)}
                        >
                          {question.q}
                          <ArrowUpRight size={14} />
                        </button>
                      ))}
                      {answer !== null && (
                        <div className="ai-answer" aria-live="polite">
                          <Sparkles size={18} />
                          <p>{questions[answer].a}</p>
                          <button
                            onClick={() => {
                              setTab('Notes')
                              setDetail(true)
                            }}
                          >
                            Source: {title} <ArrowUpRight size={12} />
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="demo-empty">
                      <Sparkles size={28} />
                      <p>Your thoughts, in conversation.</p>
                      <span>
                        Save the sample recording to try a question with a cited
                        answer.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="app-dock">
              <div className={`dock-capsule ${active ? 'is-recording' : ''}`}>
                {active ? (
                  <>
                    <button
                      className="dock-icon"
                      onClick={cancel}
                      aria-label="Discard recording"
                    >
                      <Trash2 size={15} />
                    </button>
                    <span className="record-time">{formatted}</span>
                    <Waveform paused={state === 'paused'} />
                    <button
                      className="dock-icon"
                      onClick={() => {
                        setState(state === 'paused' ? 'recording' : 'paused')
                        setStatus(
                          state === 'paused'
                            ? 'Recording resumed.'
                            : 'Recording paused.',
                        )
                      }}
                      aria-label={
                        state === 'paused'
                          ? 'Resume recording'
                          : 'Pause recording'
                      }
                    >
                      {state === 'paused' ? (
                        <Play size={15} />
                      ) : (
                        <Pause size={15} />
                      )}
                    </button>
                  </>
                ) : (
                  (['Notes', 'Insights', 'AI'] as Tab[]).map((item, i) => (
                    <button
                      key={item}
                      className={`dock-tab ${tab === item ? 'active' : ''}`}
                      onClick={() => {
                        setTab(item)
                        setDetail(false)
                      }}
                      aria-pressed={tab === item}
                      disabled={state === 'save'}
                    >
                      {i === 0 ? (
                        <Menu size={14} />
                      ) : i === 1 ? (
                        <ListChecks size={14} />
                      ) : (
                        <Sparkles size={14} />
                      )}
                      {item}
                    </button>
                  ))
                )}
              </div>
              <button
                ref={shutter}
                className={`shutter ${active ? 'recording' : ''}`}
                onClick={record}
                disabled={state === 'save'}
                aria-label={
                  active ? 'Stop sample recording' : 'Start sample recording'
                }
              >
                <i />
              </button>
            </div>
            {state === 'save' && (
              <div className="save-overlay">
                <form
                  className="save-sheet"
                  onSubmit={(event) => {
                    event.preventDefault()
                    save()
                  }}
                >
                  <span className="save-handle" />
                  <Check size={24} />
                  <h3>A thought, captured.</h3>
                  <label htmlFor="sample-title">Name your sample note</label>
                  <input
                    ref={titleInput}
                    id="sample-title"
                    maxLength={80}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <button className="app-primary" type="submit">
                    Save note <Check size={15} />
                  </button>
                  <button
                    className="text-button"
                    type="button"
                    onClick={cancel}
                  >
                    Discard sample
                  </button>
                </form>
              </div>
            )}
          </PhoneFrame>
        </div>
        <p className="demo-status" role="status">
          {status}
        </p>
      </div>
    </section>
  )
}
