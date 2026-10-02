'use client'

import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { PLAY_STORE_URL } from '@/lib/site'
import { useTheme } from './theme-provider'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [open])
  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Primary">
        <a className="brand" href="#top" aria-label="Srutam home">
          <Image src="/media/app-icon.png" alt="" width={32} height={32} />
          <span>
            srutam<span className="brand-dot">.</span>
          </span>
        </a>
        <div className={`nav-links ${open ? 'open' : ''}`} id="primary-menu">
          <a href="#how" onClick={() => setOpen(false)}>
            The experience
          </a>
          <a href="#features" onClick={() => setOpen(false)}>
            Possibilities
          </a>
          <a href="#privacy" onClick={() => setOpen(false)}>
            Your privacy
          </a>
          <a
            className="nav-download"
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
          >
            Get Srutam <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="nav-tools">
          <button
            className="icon-button"
            onClick={toggle}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={dark}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            ref={menuButton}
            className="icon-button menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="primary-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
