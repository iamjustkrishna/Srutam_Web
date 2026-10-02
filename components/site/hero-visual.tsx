'use client'

import dynamic from 'next/dynamic'
import { Component, useEffect, useState } from 'react'
import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { StaticPhone } from './phone-ui'

const Scene = dynamic(() => import('./hero-scene'), { ssr: false })
class SceneBoundary extends Component<
  { children: React.ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onError()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function HeroVisual() {
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const query = matchMedia(
      '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
    )
    let timer: ReturnType<typeof setTimeout>
    function update() {
      clearTimeout(timer)
      setReady(false)
      setEnabled(false)
      if (query.matches) timer = setTimeout(() => setEnabled(true), 900)
    }
    update()
    query.addEventListener('change', update)
    return () => {
      clearTimeout(timer)
      query.removeEventListener('change', update)
    }
  }, [])
  return (
    <div className={`hero-visual ${ready && enabled ? 'scene-ready' : ''}`}>
      <div className="hero-halo" aria-hidden />
      <div className="sound-orbit orbit-a" aria-hidden />
      <div className="sound-orbit orbit-b" aria-hidden />
      <div className="sound-orbit orbit-c" aria-hidden />
      <span className="orbital-dot orbital-dot-a" aria-hidden />
      <span className="orbital-dot orbital-dot-b" aria-hidden />
      <div className="hero-static-phone" aria-hidden>
        <StaticPhone />
      </div>
      {enabled && (
        <SceneBoundary
          onError={() => {
            setReady(false)
            setEnabled(false)
          }}
        >
          <Scene
            onReady={() => setReady(true)}
            onUnavailable={() => {
              setReady(false)
              setEnabled(false)
            }}
          />
        </SceneBoundary>
      )}
      <div className="floating-note float-insight">
        <span className="floating-icon">
          <Sparkles size={16} />
        </span>
        <div>
          <small>A LITTLE CLARITY</small>
          <strong>That idea? It&apos;s a plan now.</strong>
        </div>
        <ArrowUpRight size={15} />
      </div>
      <div className="floating-note float-saved">
        <span className="saved-icon">
          <Check size={14} />
        </span>
        <div>
          <strong>Thought saved.</strong>
          <small>Headspace, restored.</small>
        </div>
      </div>
      <div className="hero-visual-caption">
        <span>YOUR MIND, WITH MORE ROOM.</span>
        <span>01 / 03</span>
      </div>
    </div>
  )
}
