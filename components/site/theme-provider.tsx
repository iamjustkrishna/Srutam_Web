'use client'

import { useEffect, useState } from 'react'

function getInitial(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  try {
    const saved = window.localStorage.getItem('srutam-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitial)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    try {
      window.localStorage.setItem('srutam-theme', theme)
    } catch {}
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (window.localStorage.getItem('srutam-theme')) return
      } catch {}
      setTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  return (
    <div className={theme === 'dark' ? 'site dark' : 'site'} data-theme={theme}>
      <ThemeSetter theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      {children}
    </div>
  )
}

// Context-free bridge: header buttons dispatch a toggle event; provider listens.
function ThemeSetter({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  useEffect(() => {
    const handler = () => onToggle()
    window.addEventListener('srutam:toggle-theme', handler)
    return () => window.removeEventListener('srutam:toggle-theme', handler)
  }, [onToggle])
  useEffect(() => {
    document.documentElement.dataset.activeTheme = theme
  }, [theme])
  return null
}

export function toggleTheme() {
  window.dispatchEvent(new Event('srutam:toggle-theme'))
}
