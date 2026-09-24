import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Srutam — Private AI Voice Notes',
    short_name: 'Srutam',
    description:
      'Private on-device AI voice notes app for Android. Offline Whisper transcription, summaries, tasks, and conversational search.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfcfe',
    theme_color: '#2563eb',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/icon-light-32x32.jpg', sizes: '32x32', type: 'image/jpeg' },
    ],
  }
}
