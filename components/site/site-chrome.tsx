'use client'

import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { PLAY_STORE_URL } from '@/lib/site'
import { toggleTheme } from './theme-provider'

export function ThemeToggleButton({ initialDark }: { initialDark?: boolean }) {
  const [dark, setDark] = useState(!!initialDark)
  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={dark}
      onClick={() => {
        setDark((d) => !d)
        toggleTheme()
      }}
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Primary">
        <a href="#top" className="brand" aria-label="Srutam home">
          <Image src="/icon.svg" alt="Srutam logo" width={34} height={34} priority />
          <span>SRUTAM</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="primary-menu">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#privacy">Privacy</a>
          <a href="#faq">FAQ</a>
          <a
            className="nav-cta"
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
          >
            Get the app <ArrowUpRight size={15} aria-hidden />
          </a>
          <ThemeToggleButton />
        </div>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
        >
          {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </nav>
    </header>
  )
}
