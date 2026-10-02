import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  ChevronDown,
  Code2,
  Fingerprint,
  LockKeyhole,
  Mic,
  Search,
  ShieldCheck,
  Sparkles,
  WifiOff,
} from 'lucide-react'
import Image from 'next/image'
import { SiteHeader } from '@/components/site/site-chrome'
import { HeroVisual } from '@/components/site/hero-visual'
import { ProductDemo } from '@/components/site/product-demo'
import { ClarityPreview, StaticPhone } from '@/components/site/phone-ui'
import { FilmPlayer } from '@/components/site/film-player'
import { SiteMotion } from '@/components/site/site-motion'
import { HowToJsonLd } from '@/components/seo/json-ld'
import { PLAY_STORE_URL, faqs } from '@/lib/site'

function Download({ label = 'Get Srutam for Android' }: { label?: string }) {
  return (
    <a
      className="button-primary"
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noreferrer"
    >
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden>
        <path
          d="M1 1L11 10 1 19V1ZM11 10l3-3 3 2v2l-3 2-3-3ZM1 1l13 6M1 19l13-6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      {label}
      <ArrowUpRight size={17} />
    </a>
  )
}

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <HowToJsonLd />
      <SiteMotion>
        <main id="main">
          <section
            className="hero shell"
            id="top"
            aria-labelledby="hero-heading"
          >
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="availability-dot" /> A LITTLE SPACE FOR YOUR
                MIND
              </p>
              <h1 id="hero-heading">
                Pure voice.
                <br />
                <em>Crystallized</em>
                <br />
                thought<span className="heading-period">.</span>
              </h1>
              <p className="hero-lede">
                For the idea on your walk.
                <br />
                The thought between things.
                <br />
                <strong>Speak it. Keep it. Make something of it.</strong>
              </p>
              <div className="hero-actions">
                <Download />
                <FilmPlayer />
              </div>
              <div className="hero-footnote">
                <ShieldCheck size={14} />
                <span>On-device transcription.</span>
                <span className="footnote-divider" />
                <span>Yours by design.</span>
              </div>
            </div>
            <HeroVisual />
            <a className="scroll-invitation" href="#how">
              <ArrowDown size={14} />
              <span>A thought becomes a possibility</span>
            </a>
          </section>
          <div className="belief-strip">
            <div className="shell">
              <span>
                LESS IN YOUR HEAD. <strong>MORE IN YOUR HANDS.</strong>
              </span>
              <span>
                <WifiOff size={15} /> Offline transcription
              </span>
              <span>
                <LockKeyhole size={15} /> Private by default
              </span>
              <span>
                <Sparkles size={15} /> Clarity, on demand
              </span>
            </div>
          </div>
          <section className="intro-section shell section" data-reveal>
            <p className="eyebrow">GOOD IDEAS RARELY ARRIVE AT A DESK.</p>
            <h2>
              They show up on walks.
              <br />
              Between meetings. <em>Mid-life.</em>
            </h2>
            <p className="section-lede">
              Give them somewhere to land.
              <br />
              Srutam turns passing thoughts into things you can come back to.
            </p>
            <span className="intro-asterisk" aria-hidden>
              ✳
            </span>
          </section>
          <section
            className="story-section shell"
            id="how"
            aria-label="From capture to action"
          >
            <div className="story-visual" aria-hidden="true">
              <div className="story-disc" />
              <span className="story-orbit" />
              <div className="story-phone-panel">
                <StaticPhone recording />
              </div>
              <div className="story-phone-panel">
                <ClarityPreview />
              </div>
              <div className="story-phone-panel">
                <ClarityPreview actions />
              </div>
              <span className="story-caption">
                A THOUGHT, FINDING ITS SHAPE.
              </span>
            </div>
            <div className="story-chapters">
              <article className="story-chapter" data-reveal>
                <span className="chapter-number">01 / CAPTURE</span>
                <div className="chapter-symbol">
                  <Mic size={27} />
                </div>
                <h2>
                  Think out loud.
                  <br />
                  <em>We&apos;re listening.</em>
                </h2>
                <p>
                  No blank page. No perfect sentences. Just tap the red button
                  and let it out. Pause, resume, and carry on with your day.
                </p>
                <span className="chapter-detail">
                  <WifiOff size={15} /> Record and transcribe on your phone,
                  offline.
                </span>
                <div className="mobile-story-phone" aria-hidden>
                  <StaticPhone recording />
                </div>
              </article>
              <article className="story-chapter" data-reveal>
                <span className="chapter-number">02 / UNDERSTAND</span>
                <div className="chapter-symbol">
                  <Sparkles size={27} />
                </div>
                <h2>
                  A little less noise.
                  <br />
                  <em>A lot more clarity.</em>
                </h2>
                <p>
                  Your ramble has something to say. Find the summary, the idea,
                  and the decision hiding inside it with optional connected AI.
                </p>
                <span className="chapter-detail">
                  <Sparkles size={15} /> Your thoughts, thoughtfully organized.
                </span>
                <div className="mobile-story-phone" aria-hidden>
                  <ClarityPreview />
                </div>
              </article>
              <article className="story-chapter" data-reveal>
                <span className="chapter-number">03 / ACT</span>
                <div className="chapter-symbol">
                  <ArrowUpRight size={27} />
                </div>
                <h2>
                  From &ldquo;what if&rdquo;
                  <br />
                  <em>to what&apos;s next.</em>
                </h2>
                <p>
                  Turn the promising bits into checklists. Ask your notes a
                  question. Come back to the answer, with a source you can
                  follow.
                </p>
                <a className="inline-link" href="#demo">
                  Give it a little try <ArrowRight size={17} />
                </a>
                <div className="mobile-story-phone" aria-hidden>
                  <ClarityPreview actions />
                </div>
              </article>
            </div>
          </section>
          <ProductDemo />
          <section
            className="possibilities-section section shell"
            id="features"
          >
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">MADE FOR THE WAY YOUR MIND MOVES</p>
                <h2>
                  Small moments.
                  <br />
                  <em>Unexpected possibilities.</em>
                </h2>
              </div>
              <p>
                For makers, wanderers, overthinkers.
                <br />
                For you, wherever an idea finds you.
              </p>
            </div>
            <div className="feature-grid">
              <article className="feature-card feature-search" data-reveal>
                <span className="feature-index">01 / RECALL</span>
                <div className="search-art" aria-hidden>
                  <span className="search-orbit" />
                  <div className="search-question">
                    <Search size={20} /> What was that idea again?
                  </div>
                  <div className="search-result">
                    <span className="result-icon">
                      <AudioLines size={22} />
                    </span>
                    <div>
                      <strong>The one from your morning walk.</strong>
                      <span>
                        Found in your notes <ArrowUpRight size={12} />
                      </span>
                    </div>
                    <Check size={18} />
                  </div>
                </div>
                <h3>
                  A thought is only lost
                  <br />
                  until you find it.
                </h3>
                <p>
                  Search your transcripts. Or ask connected AI to look across
                  your notes, with citations back to the source.
                </p>
              </article>
              <article className="feature-card feature-tasks" data-reveal>
                <span className="feature-index">02 / FOLLOW THROUGH</span>
                <div className="tasks-art" aria-hidden>
                  <div>
                    <span className="fake-check">
                      <Check size={13} />
                    </span>{' '}
                    Make room for the idea
                  </div>
                  <div>
                    <span className="fake-check">
                      <Check size={13} />
                    </span>{' '}
                    Take the first small step
                  </div>
                  <div>
                    <span className="empty-check" /> See where it goes{' '}
                    <span className="task-arrow">↗</span>
                  </div>
                </div>
                <h3>
                  A next step.
                  <br />
                  Not another to-do app.
                </h3>
                <p>
                  Your voice notes become actionable checklists. Less mental
                  juggling, more forward motion.
                </p>
              </article>
              <article className="feature-card feature-code" data-reveal>
                <div>
                  <span className="feature-index">03 / FOR THE BUILDERS</span>
                  <h3>
                    Your thinking.
                    <br />
                    In your workflow.
                  </h3>
                  <p>
                    Bring your own AI key. Connect your notes to your coding
                    workflow through Srutam&apos;s MCP server.
                  </p>
                </div>
                <div className="code-art" aria-hidden>
                  <div className="code-dots">
                    <i />
                    <i />
                    <i />
                    <span>thoughts → context</span>
                  </div>
                  <code>
                    <span className="code-comment">
                      // that architecture idea?
                    </span>
                    <br />
                    <span className="code-blue">ask</span>(&quot;What did I
                    decide?&quot;)
                    <br />
                    <br />
                    <span className="code-comment">
                      // right where you need it.
                    </span>
                    <br />
                    <span className="code-green">↳</span> notes.with_context
                  </code>
                  <Code2 size={25} />
                </div>
              </article>
            </div>
          </section>
          <section className="privacy-section" id="privacy">
            <div className="privacy-grain" aria-hidden />
            <div className="shell privacy-inner">
              <div className="privacy-copy" data-reveal>
                <p className="eyebrow">PERSONAL MEANS PERSONAL.</p>
                <h2>
                  Your mind.
                  <br />
                  Your phone.
                  <br />
                  <em>Your business.</em>
                </h2>
                <p>
                  Some thoughts are still becoming. They deserve a space that
                  belongs to you.
                </p>
                <p className="privacy-explanation">
                  Recording and transcription happen on your device. Optional AI
                  features use your chosen provider and need a connection. Cloud
                  sync is opt-in.
                </p>
                <div className="privacy-facts">
                  <span>
                    <Check size={16} /> On-device transcription
                  </span>
                  <span>
                    <Check size={16} /> No account needed to capture
                  </span>
                  <span>
                    <Check size={16} /> You choose when to connect
                  </span>
                </div>
              </div>
              <div className="privacy-art" aria-hidden>
                <div className="privacy-ring ring-one" />
                <div className="privacy-ring ring-two" />
                <div className="privacy-ring ring-three" />
                <div className="privacy-core">
                  <Fingerprint size={106} strokeWidth={0.8} />
                </div>
                <span className="privacy-label">
                  <span className="availability-dot" /> YOUR SPACE. PROTECTED.
                </span>
                <span className="privacy-coordinate">
                  LOCAL FIRST / ALWAYS YOURS
                </span>
              </div>
            </div>
          </section>
          <section className="faq-section shell section" id="faq">
            <div data-reveal>
              <p className="eyebrow">A FEW THINGS ON YOUR MIND</p>
              <h2>
                Glad you
                <br />
                <em>asked.</em>
              </h2>
              <p className="section-lede">
                A little clarity, before you begin.
              </p>
            </div>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <details key={faq.q}>
                  <summary>
                    <span className="faq-number">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {faq.q}
                    <ChevronDown size={18} />
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="final-section shell" data-reveal>
            <div className="final-orbit" aria-hidden />
            <span className="eyebrow">
              THE NEXT GOOD IDEA IS ALREADY IN YOU.
            </span>
            <h2>
              Let it <em>out.</em>
            </h2>
            <p>A little less in your head. A little more possibility.</p>
            <Download label="Make room for your thoughts" />
            <span className="final-note">
              Available for Android. Made for a mind like yours.
            </span>
          </section>
        </main>
      </SiteMotion>
      <footer className="footer shell">
        <a className="brand" href="#top">
          <Image src="/apple-icon.png" alt="" width={28} height={28} />
          <span>
            srutam<span className="brand-dot">.</span>
          </span>
        </a>
        <span>
          Thoughtfully built by{' '}
          <a
            href="https://x.com/iamjustkrishna"
            target="_blank"
            rel="noreferrer"
          >
            @iamjustkrishna <ArrowUpRight size={12} />
          </a>
        </span>
        <div>
          <a href="#privacy">Privacy</a>
          <a href="#faq">FAQ</a>
          <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
            Google Play <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
    </>
  )
}
