import {
  ArrowUpRight,
  Check,
  CirclePlay,
  Code2,
  Headphones,
  ListChecks,
  LockKeyhole,
  Mic,
  Moon,
  Play,
  Search,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import { HowToJsonLd } from '@/components/seo/json-ld'
import { SiteHeader } from '@/components/site/site-chrome'
import { PLAY_STORE_URL, faqs } from '@/lib/site'

const features = [
  { icon: Mic, title: 'On-device transcription', text: 'Whisper speech-to-text runs locally via Sherpa-ONNX. Your audio stays on your phone — zero uploads.' },
  { icon: Sparkles, title: 'AI insights extraction', text: 'Every note becomes summary, key points, and three buckets: Next Steps, Ideas, and Decisions.' },
  { icon: Search, title: 'Conversational AI chat', text: 'Ask questions across your recordings and get answers with cited source notes.' },
  { icon: ListChecks, title: 'Actionable task checklist', text: 'Tasks detected in your voice notes become interactive checklists you can finish.' },
  { icon: Zap, title: 'Smart reminders', text: 'Meetings, deadlines, and appointments turn into timely system notifications.' },
  { icon: Headphones, title: 'Floating record dock', text: 'Capture from anywhere with persistent studio controls that never interrupt your flow.' },
  { icon: Moon, title: 'Cosmic dark mode', text: 'A deep-space theme with stardust coordinates and radial void gradients.' },
  { icon: Code2, title: 'BYOK and MCP server', text: 'Bring your own AI key and query your voice memos from your coding workflow.' },
]

const audiences = [
  ['Founders & creators', 'Capture product ideas, strategy thoughts, and content hooks while walking.'],
  ['Engineers & builders', 'Record architecture decisions, standup notes, and debugging observations without losing flow.'],
  ['Students & researchers', 'Turn lectures and study sessions into revision notes and checklists.'],
  ['Busy professionals', 'Convert 30-minute meetings into crisp action items you can share immediately.'],
  ['ADHD & brain dumpers', 'Speak freely without organizing first. Let Srutam structure the chaos.'],
]

const comparisons = [
  ['Where audio goes', 'Stays on your phone', 'Uploaded to cloud servers'],
  ['Transcription', 'On-device Whisper, works offline', 'Cloud processing, needs internet'],
  ['Best for', 'Personal notes, ideas, ADHD dumps', 'Team meetings, call recording'],
  ['AI chat', 'Over your notes, with citations', 'Over meeting transcripts'],
  ['Developer use', 'BYOK + MCP server for agents', 'API / integrations'],
]

export default function Page() {
  return (
    <>
      <HowToJsonLd />
      <SiteHeader />
      <main id="top">
        <section className="hero shell" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow">Private AI voice notes app for Android · Offline transcription</p>
            <h1 id="hero-heading">
              Pure voice.
              <br />
              <em>Crystallized thought.</em>
            </h1>
            <p className="lede" data-speakable="true">
              Turn spoken thoughts into organized, searchable knowledge. On-device Whisper
              transcription, AI summaries, tasks, and chat — on your phone, on your terms.
            </p>
            <div className="hero-actions">
              <a className="play-button" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
                <Play size={20} aria-hidden />
                <span>
                  <small>GET IT ON</small>Google Play
                </span>
              </a>
              <a className="text-link" href="#how">
                <CirclePlay size={17} aria-hidden /> See how it works
              </a>
            </div>
            <p className="hero-note">
              <span className="pulse-dot" aria-hidden /> Android only · Private by default · No account to capture
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <Image
              src="/apple-icon.png"
              alt=""
              width={370}
              height={370}
              priority
              className="hero-logo"
            />
            <div className="floating-card recording">
              <div className="mini-wave" aria-hidden>
                {Array.from({ length: 18 }).map((_, i) => (
                  <i key={i} style={{ height: `${12 + ((i * 17) % 28)}px` }} />
                ))}
              </div>
              <strong>Listening...</strong>
              <span>Capturing what matters</span>
            </div>
            <div className="floating-card insight">
              <Search size={14} aria-hidden />
              <span>What did I commit to last week?</span>
              <ArrowUpRight size={14} aria-hidden />
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Key facts">
          <div className="shell proof-grid">
            <div className="proof-label">Built for real life</div>
            <div>
              <strong>30s</strong>
              <span>to capture a thought</span>
            </div>
            <div>
              <strong>2s</strong>
              <span>to find the answer</span>
            </div>
            <div>
              <strong>0</strong>
              <span>audio uploads for basic transcription</span>
            </div>
          </div>
        </section>

        <section className="section shell problem" aria-labelledby="problem-heading">
          <div className="section-intro">
            <p className="eyebrow">The retrieval problem</p>
            <h2 id="problem-heading">
              Voice notes have
              <br />
              <em>a retrieval problem.</em>
            </h2>
            <p>
              Recording is effortless. Going through 30 audio files to find one decision from
              last Tuesday is where everyone gives up. Srutam makes every memo searchable in seconds.
            </p>
          </div>
          <div className="contrast-card">
            <div className="contrast-line">
              <span>Record</span>
              <b>30 sec</b>
            </div>
            <div className="contrast-line muted">
              <span>Re-listen</span>
              <b>45 min</b>
            </div>
            <div className="contrast-line answer">
              <span>Ask Srutam</span>
              <b>2 sec</b>
            </div>
            <p>A voice memo is only useful when you can find it again.</p>
          </div>
        </section>

        <section id="how" className="section shell how" aria-labelledby="how-heading" style={{ scrollMarginTop: '88px' }}>
          <div className="center-intro">
            <p className="eyebrow">From voice to clarity</p>
            <h2 id="how-heading">
              Speak naturally.
              <br />
              <em>Srutam does the sorting.</em>
            </h2>
            <p className="section-sub">Capture → Understand → Act. Three steps, no filing system required.</p>
          </div>
          <div className="steps">
            <Step number="01" icon={Mic} title="Capture" text="Tap record and speak naturally. Pause, resume, or use the floating dock from anywhere on your phone." />
            <Step number="02" icon={Sparkles} title="Understand" text="Your note is transcribed on-device with Whisper, then shaped into a summary, key points, and WIIFM." />
            <Step number="03" icon={Target} title="Act" text="Next Steps, Ideas, and Decisions are pulled out automatically — finish checklists or ask AI with citations." />
          </div>
        </section>

        <section id="features" className="section shell" aria-labelledby="features-heading" style={{ scrollMarginTop: '88px' }}>
          <div className="section-intro wide">
            <p className="eyebrow">A thoughtful toolkit</p>
            <h2 id="features-heading">
              Less filing.
              <br />
              <em>More remembering.</em>
            </h2>
            <p>
              Offline transcription, AI summaries, task checklists, and conversational search —
              everything you need to turn fleeting thoughts into useful context.
            </p>
          </div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, text }) => (
              <article className="feature-card" key={title}>
                <div className="icon-wrap">
                  <Icon size={19} aria-hidden />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="privacy" className="privacy-section" aria-labelledby="privacy-heading" style={{ scrollMarginTop: '88px' }}>
          <div className="shell privacy-inner">
            <div className="privacy-mark" aria-hidden>
              <LockKeyhole size={28} />
            </div>
            <div>
              <p className="eyebrow">Your thoughts stay yours</p>
              <h2 id="privacy-heading">
                Private by design.
                <br />
                <em>Not by promise.</em>
              </h2>
              <p data-speakable="true">
                Transcription runs on-device. Notes live in a local Room database. A privacy
                lock keeps sensitive notes out of sync and away from external agents.
              </p>
              <div className="privacy-list">
                <span>
                  <Check size={15} aria-hidden /> No unwanted tracking
                </span>
                <span>
                  <Check size={15} aria-hidden /> Your key, your provider
                </span>
                <span>
                  <Check size={15} aria-hidden /> Cloud sync is your choice
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section shell" aria-labelledby="audience-heading">
          <div className="section-intro wide">
            <p className="eyebrow">Made for your kind of mind</p>
            <h2 id="audience-heading">
              There is no wrong way
              <br />
              <em>to think out loud.</em>
            </h2>
          </div>
          <div className="audience-grid">
            {audiences.map(([title, text], i) => (
              <article key={title} className={i === 0 ? 'audience-card featured' : 'audience-card'}>
                <span aria-hidden>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell compare" aria-labelledby="compare-heading">
          <div className="section-intro wide">
            <p className="eyebrow">Srutam vs cloud recorders</p>
            <h2 id="compare-heading">
              Personal notes,
              <br />
              <em>not another meeting bot.</em>
            </h2>
            <p>Otter.ai and Fireflies upload calls to the cloud for teams. Srutam keeps personal voice notes on your phone.</p>
          </div>
          <div className="compare-table" role="table" aria-label="Srutam versus cloud meeting recorders">
            <div className="compare-row compare-head" role="row">
              <span role="columnheader"> </span>
              <span role="columnheader">Srutam</span>
              <span role="columnheader">Cloud recorders</span>
            </div>
            {comparisons.map(([label, a, b]) => (
              <div className="compare-row" role="row" key={label}>
                <span role="rowheader">{label}</span>
                <span role="cell"><Check size={14} aria-hidden /> {a}</span>
                <span role="cell" className="muted">{b}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="section shell faq" aria-labelledby="faq-heading" style={{ scrollMarginTop: '88px' }}>
          <div className="section-intro wide">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-heading">
              Private voice notes,
              <br />
              <em>answered.</em>
            </h2>
            <p>Short answers for search and AI overviews. Long answers live in the app.</p>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <details className="faq-item" key={f.q} name="srutam-faq">
                <summary>{f.q}</summary>
                <p data-speakable="true">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta shell" aria-labelledby="cta-heading">
          <Image src="/apple-icon.png" alt="Srutam app icon" width={78} height={78} loading="lazy" />
          <p className="eyebrow">Pure voice. Crystallized thought.</p>
          <h2 id="cta-heading">
            Remember more.
            <br />
            <em>Live more.</em>
          </h2>
          <a className="play-button" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
            <Play size={20} aria-hidden />
            <span>
              <small>GET IT ON</small>Google Play
            </span>
          </a>
          <p className="available">Available on Android · Free to capture</p>
        </section>
      </main>

      <footer className="footer shell">
        <div className="footer-grid">
          <div className="brand">
            <Image src="/apple-icon.png" alt="Srutam logo" width={26} height={26} loading="lazy" />
            <span>SRUTAM</span>
          </div>
          <p className="footer-tag">Private AI voice notes for Android. Built by @iamjustkrishna.</p>
          <nav aria-label="Footer">
            <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">Google Play</a>
            <a href="#privacy">Privacy</a>
            <a href="#faq">FAQ</a>
          </nav>
          <small>Made with Jetpack Compose, Kotlin, and an unreasonable amount of coffee.</small>
        </div>
      </footer>
    </>
  )
}

function Step({ number, icon: Icon, title, text }: { number: string; icon: typeof Mic; title: string; text: string }) {
  return (
    <article className="step">
      <span className="step-number">{number}</span>
      <div className="step-icon">
        <Icon size={22} aria-hidden />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}
