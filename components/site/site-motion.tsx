'use client'

import { useEffect, useRef } from 'react'

export function SiteMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let disposed = false
    let started = false
    let cleanup: (() => void) | undefined
    const host = root.current
    if (!host) return

    async function start() {
      if (started) return
      started = true
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])
        if (disposed) return
        gsap.registerPlugin(ScrollTrigger)
        const media = gsap.matchMedia()
        media.add(
          '(prefers-reduced-motion: no-preference)',
          () => {
            host
              ?.querySelectorAll<HTMLElement>('[data-reveal]')
              .forEach((element) => {
                // Late loading must never hide content the visitor is already reading.
                if (element.getBoundingClientRect().top < innerHeight) return
                gsap.from(element, {
                  y: 28,
                  opacity: 0,
                  duration: 0.7,
                  ease: 'power3.out',
                  clearProps: 'all',
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 93%',
                    once: true,
                  },
                })
              })
          },
          host!,
        )
        media.add(
          '(min-width: 1000px) and (prefers-reduced-motion: no-preference)',
          () => {
            const panels = Array.from(
              host!.querySelectorAll<HTMLElement>('.story-phone-panel'),
            )
            panels.forEach((panel, index) => {
              if (index) gsap.set(panel, { opacity: 0, y: 25 })
            })
            host!
              .querySelectorAll<HTMLElement>('.story-chapter')
              .forEach((chapter, index) => {
                ScrollTrigger.create({
                  trigger: chapter,
                  start: 'top 55%',
                  end: 'bottom 55%',
                  onToggle: (self) => {
                    if (!self.isActive) return
                    panels.forEach((panel, i) =>
                      gsap.to(panel, {
                        opacity: i === index ? 1 : 0,
                        y: i === index ? 0 : 25,
                        duration: 0.6,
                        overwrite: true,
                      }),
                    )
                  },
                })
              })
            return () => {
              gsap.killTweensOf(panels)
              gsap.set(panels, { clearProps: 'all' })
            }
          },
          host!,
        )
        cleanup = () => media.revert()
      } catch {
        // Static content remains usable if an optional animation chunk cannot load.
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect()
        void start()
      }
    })
    host
      .querySelectorAll('[data-reveal]')
      .forEach((element) => observer.observe(element))
    return () => {
      disposed = true
      observer.disconnect()
      cleanup?.()
    }
  }, [])
  return <div ref={root}>{children}</div>
}
