'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CirclePlay,
  Code2,
  FileText,
  Headphones,
  Lightbulb,
  ListChecks,
  LockKeyhole,
  Menu,
  Mic,
  Moon,
  Search,
  Sparkles,
  Sun,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react'

const playStoreUrl = 'https://play.google.com/store/apps/details?id=space.iamjustkrishna.srutam'
const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/srutam22-k2Ta95l9H9JBoWpIjVjrudqo5RVTee.png'
const features = [
  { icon: Mic, title: 'On-device transcription', text: 'Speech-to-text runs locally with Sherpa-ONNX Whisper. Your audio stays on your phone.' },
  { icon: Sparkles, title: 'AI insights extraction', text: 'Every note becomes three useful buckets: Next Steps, Ideas, and Decisions.' },
  { icon: Search, title: 'Conversational AI chat', text: 'Ask questions across your recordings and get answers with cited source notes.' },
  { icon: ListChecks, title: 'Actionable task checklist', text: 'Tasks detected in your voice notes become interactive checklists you can finish.' },
  { icon: Zap, title: 'Smart reminders', text: 'Meetings, deadlines, and appointments turn into timely system notifications.' },
  { icon: Headphones, title: 'Floating record dock', text: 'Capture from anywhere with persistent studio controls that never interrupt your flow.' },
  { icon: Moon, title: 'Cosmic dark mode', text: 'A deep space theme with stardust coordinates and radial void gradients.' },
  { icon: Code2, title: 'BYOK and MCP server', text: 'Bring your own AI key and make your voice memos available to your coding workflow.' },
]

const audiences = [
  ['Founders & creators', 'Capture product ideas, strategy thoughts, and content hooks while walking.'],
  ['Engineers & builders', 'Record architecture decisions, standup notes, and debugging observations without losing flow.'],
  ['Students & researchers', 'Turn lectures and study sessions into revision notes and checklists.'],
  ['Busy professionals', 'Convert 30-minute meetings into crisp action items you can share immediately.'],
  ['ADHD & brain dumpers', 'Speak freely without organizing first. Let Srutam structure the chaos.'],
]

export default function Page() {
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className={dark ? 'site dark' : 'site'}>
      <nav className="nav shell">
        <a href="#top" className="brand" aria-label="Srutam home">
          <img src={logoUrl} alt="Srutam logo" />
          <span>SRUTAM</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#how">How it works</a><a href="#features">Features</a><a href="#privacy">Privacy</a>
          <a className="nav-cta" href={playStoreUrl} target="_blank" rel="noreferrer">Get the app <ArrowUpRight size={15} /></a>
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle color theme">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section id="top" className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">A quieter mind for a busier world</p>
          <h1>Pure voice.<br /><em>Crystallized thought.</em></h1>
          <p className="lede">Turn spoken thoughts into organized, searchable knowledge. On your phone. On your terms.</p>
          <div className="hero-actions"><a className="play-button" href={playStoreUrl} target="_blank" rel="noreferrer"><span className="play-triangle">▶</span><span><small>GET IT ON</small>Google Play</span></a><a className="text-link" href="#how"><CirclePlay size={17} /> See how it works</a></div>
          <div className="hero-note"><span className="pulse-dot" /> Android only · Private by default</div>
        </div>
        <div className="hero-visual">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <img src={logoUrl} alt="Blue and white Srutam voice mark" className="hero-logo" />
          <div className="floating-card recording"><div className="mini-wave">{Array.from({ length: 18 }).map((_, i) => <i key={i} style={{ height: `${12 + ((i * 17) % 28)}px` }} />)}</div><strong>Listening...</strong><span>Capturing what matters</span></div>
          <div className="floating-card insight"><Search size={14} /><span>What did I commit to last week?</span><ArrowUpRight size={14} /></div>
        </div>
      </section>

      <section className="proof-strip"><div className="shell proof-grid"><div className="proof-label">Built for real life</div><div><strong>30s</strong><span>to capture a thought</span></div><div><strong>2s</strong><span>to find the answer</span></div><div><strong>0</strong><span>audio uploads for basic transcription</span></div></div></section>

      <section className="section shell problem"><div className="section-intro"><p className="eyebrow">The retrieval problem</p><h2>Voice notes have<br /><em>a retrieval problem.</em></h2><p>Recording is effortless. Going through 30 audio files to find one decision from last Tuesday is where everyone gives up.</p></div><div className="contrast-card"><div className="contrast-line"><span>Record</span><b>30 sec</b></div><div className="contrast-line muted"><span>Re-listen</span><b>45 min</b></div><div className="contrast-line answer"><span>Ask Srutam</span><b>2 sec</b></div><p>A voice memo is only useful when you can find it again.</p></div></section>

      <section id="how" className="section shell how"><div className="center-intro"><p className="eyebrow">From voice to clarity</p><h2>Speak naturally.<br /><em>Srutam does the sorting.</em></h2></div><div className="steps"><Step number="01" icon={Mic} title="Capture" text="Tap record and speak naturally. Pause, resume, or use the floating dock from anywhere on your phone." /><Step number="02" icon={Sparkles} title="Understand" text="Your note is transcribed on-device, then shaped into a summary, key points, and WIIFM." /><Step number="03" icon={Target} title="Act" text="Next Steps, Ideas, and Decisions are pulled out automatically, ready to use." /></div></section>

      <section id="features" className="section shell"><div className="section-intro wide"><p className="eyebrow">A thoughtful toolkit</p><h2>Less filing.<br /><em>More remembering.</em></h2><p>Everything you need to turn fleeting thoughts into useful context, without turning your life into a productivity project.</p></div><div className="feature-grid">{features.map(({ icon: Icon, title, text }) => <article className="feature-card" key={title}><div className="icon-wrap"><Icon size={19} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section id="privacy" className="privacy-section"><div className="shell privacy-inner"><div className="privacy-mark"><LockKeyhole size={28} /></div><div><p className="eyebrow">Your thoughts stay yours</p><h2>Private by design.<br /><em>Not by promise.</em></h2><p>Transcription runs on-device. Notes live in a local Room database. A privacy lock keeps sensitive notes out of sync and away from external agents.</p><div className="privacy-list"><span><Check size={15} /> No unwanted tracking</span><span><Check size={15} /> Your key, your provider</span><span><Check size={15} /> Cloud sync is your choice</span></div></div></div></section>

      <section className="section shell"><div className="section-intro wide"><p className="eyebrow">Made for your kind of mind</p><h2>There is no wrong way<br /><em>to think out loud.</em></h2></div><div className="audience-grid">{audiences.map(([title, text], i) => <article key={title} className={i === 0 ? 'audience-card featured' : 'audience-card'}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="final-cta shell"><img src={logoUrl} alt="Srutam app icon" /><p className="eyebrow">Pure voice. Crystallized thought.</p><h2>Remember more.<br /><em>Live more.</em></h2><a className="play-button" href={playStoreUrl} target="_blank" rel="noreferrer"><span className="play-triangle">▶</span><span><small>GET IT ON</small>Google Play</span></a><p className="available">Available on Android</p></section>

      <footer className="footer shell"><div className="brand"><img src={logoUrl} alt="Srutam logo" /><span>SRUTAM</span></div><span>Built by @iamjustkrishna</span><div><a href={playStoreUrl}>Google Play</a><a href="#privacy">Privacy</a></div><small>Made with Jetpack Compose, Kotlin, and an unreasonable amount of coffee.</small></footer>
    </main>
  )
}

function Step({ number, icon: Icon, title, text }: { number: string; icon: typeof Mic; title: string; text: string }) { return <article className="step"><span className="step-number">{number}</span><div className="step-icon"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p></article> }

