'use client'

import { CirclePlay, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

export function FilmPlayer({ className = '' }: { className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!loaded) return
    dialog.current?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [loaded])
  function close() {
    video.current?.pause()
    dialog.current?.close()
    setLoaded(false)
    trigger.current?.focus()
  }
  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], video[controls]',
      ),
    )
    const first = controls[0],
      last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }
  return (
    <>
      <button
        ref={trigger}
        className={`film-trigger ${className}`}
        onClick={() => setLoaded(true)}
      >
        <CirclePlay size={19} /> Watch the film <span>0:36</span>
      </button>
      {loaded && (
        <dialog
          ref={dialog}
          className="film-dialog"
          aria-labelledby="film-title"
          onKeyDown={trapFocus}
          onCancel={(event) => {
            event.preventDefault()
            close()
          }}
          onClick={(event) => {
            if (event.target === dialog.current) close()
          }}
        >
          <div className="film-dialog-heading">
            <span id="film-title">A little space for your mind.</span>
            <button
              autoFocus
              className="icon-button"
              aria-label="Close film"
              onClick={close}
            >
              <X size={22} />
            </button>
          </div>
          <video
            ref={video}
            controls
            playsInline
            preload="metadata"
            poster="/media/srutam-poster.jpg"
          >
            <source src="/media/srutam-fast-master.mp4" type="video/mp4" />
            <track
              kind="captions"
              src="/media/srutam-fast-master.vtt"
              srcLang="en"
              label="English"
              default
            />
          </video>
          <p className="film-credit">
            Music:{' '}
            <a
              href="https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100474"
              target="_blank"
              rel="noreferrer"
            >
              Funkorama by Kevin MacLeod
            </a>
            ,{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noreferrer"
            >
              CC BY 4.0
            </a>
            . Excerpted, tempo adjusted, and mixed with narration.
          </p>
        </dialog>
      )}
    </>
  )
}
