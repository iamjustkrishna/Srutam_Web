import { PLAY_STORE_URL, SITE_NAME, SITE_URL, faqs } from '@/lib/site'

function toSafeJson(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function SiteJsonLd() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}#org`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        sameAs: [PLAY_STORE_URL],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}#org` },
        inLanguage: 'en',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}#app`,
        name: `${SITE_NAME} — Private AI Voice Notes App`,
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Android',
        url: SITE_URL,
        downloadUrl: PLAY_STORE_URL,
        description:
          'Private on-device AI voice notes app for Android. Offline Whisper transcription, AI summaries, tasks, conversational chat over notes, BYOK and MCP server support.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toSafeJson(graph) }}
    />
  )
}

export function HowToJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to turn a voice memo into action items with Srutam',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Capture',
        text: 'Tap record and speak naturally. Pause, resume, or use the floating record dock from anywhere.',
      },
      {
        '@type': 'HowToStep',
        name: 'Understand',
        text: 'Your note is transcribed on-device with Whisper, then shaped into a summary, key points, Next Steps, Ideas, and Decisions.',
      },
      {
        '@type': 'HowToStep',
        name: 'Act',
        text: 'Finish detected tasks from the checklist, set reminders, or ask conversational AI across notes with cited sources.',
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toSafeJson(data) }}
    />
  )
}
