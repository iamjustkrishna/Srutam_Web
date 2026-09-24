import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { SiteJsonLd } from '@/components/seo/json-ld'
import { ThemeProvider } from '@/components/site/theme-provider'
import { PLAY_STORE_URL, SITE_URL } from '@/lib/site'
import './globals.css'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const TITLE = 'Srutam — Private AI Voice Notes App | Offline Transcription'
const DESCRIPTION =
  'Srutam is a private on-device AI voice notes app for Android. Offline Whisper transcription, AI summaries, tasks, and conversational search. Zero audio uploads. BYOK + MCP for developers.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Srutam',
  },
  description: DESCRIPTION,
  keywords: [
    'private voice notes app',
    'offline transcription app android',
    'on-device AI voice memo',
    'whisper transcription offline',
    'voice memo to tasks',
    'AI meeting notes private',
    'ADHD voice notes app',
    'BYOK AI notes',
    'MCP server voice memos',
  ],
  authors: [{ name: 'Srutam' }],
  creator: 'Srutam',
  category: 'Productivity',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description:
      'Turn spoken thoughts into organized, searchable knowledge. On-device Whisper transcription — your audio stays on your phone.',
    url: SITE_URL,
    siteName: 'Srutam',
    locale: 'en_US',
    type: 'website',
    images: [
      { url: '/apple-icon.png', alt: 'Srutam — private AI voice notes app' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description:
      'Private AI voice notes for Android: offline transcription, summaries, tasks, and chat over your notes.',
    images: ['/apple-icon.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.jpg', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.jpg', media: '(prefers-color-scheme: dark)' },
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
  other: {
    'play-store': PLAY_STORE_URL,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfcfe' },
    { media: '(prefers-color-scheme: dark)', color: '#050714' },
  ],
}

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('srutam-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t;}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <link rel="preconnect" href="https://play.google.com" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <SiteJsonLd />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
