export type Faq = { q: string; a: string }

export const SITE_URL = 'https://srutam.iamjustkrishna.app'
export const SITE_NAME = 'Srutam'
export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=space.iamjustkrishna.srutam'

export const faqs: Faq[] = [
  {
    q: 'Is Srutam private? Where do my voice notes go?',
    a: 'Yes. Srutam transcribes on-device with Sherpa-ONNX Whisper and stores notes in a local Room database on your phone. Basic transcription uploads zero audio. A privacy lock keeps sensitive notes out of sync and away from external agents. Cloud sync is opt-in.',
  },
  {
    q: 'Does Srutam work offline?',
    a: 'Yes for capture and transcription. Recording and on-device Whisper transcription work without internet after first install. AI summaries, conversational chat, and reminders need your own AI key (BYOK) and therefore need connectivity when you use those features.',
  },
  {
    q: 'How does on-device transcription work?',
    a: 'Srutam runs Whisper (via Sherpa-ONNX) directly on your Android phone. Speech-to-text happens locally, so your audio never leaves the device for transcription. You get searchable text in about 30 seconds for a typical thought.',
  },
  {
    q: 'How does Srutam turn voice memos into action items?',
    a: 'Every note is shaped into a summary, key points, and three buckets: Next Steps, Ideas, and Decisions. Detected tasks become interactive checklists, and meetings, deadlines, and appointments can become timely reminders you can act on immediately.',
  },
  {
    q: 'Srutam vs Otter.ai or Fireflies: what is different?',
    a: 'Otter.ai and Fireflies are cloud meeting recorders built for teams. Srutam is a private, local-first voice notes app for individuals: on-device transcription, zero audio uploads for basic use, no account required to capture, plus BYOK and an MCP server so developers can query their own memos from their coding workflow.',
  },
  {
    q: 'What is the best private alternative to Otter for personal voice notes?',
    a: 'If you want personal voice notes that stay on your phone, Srutam is built for that: offline Whisper transcription, local storage, privacy lock, and optional BYOK AI chat with cited source notes — instead of uploading every meeting to a cloud workspace.',
  },
  {
    q: 'Can developers use Srutam with their coding workflow?',
    a: 'Yes. Bring your own AI key (BYOK) and expose your voice memos through the Srutam MCP server. Record architecture decisions, standups, and debugging notes by voice, then ask about them from your agent or editor with citations back to the source note.',
  },
  {
    q: 'Is Srutam good for ADHD brain dumps, students, and founders?',
    a: 'Yes. Speak freely without organizing first — Srutam structures the chaos into summaries, checklists, and searchable answers. Students turn lectures into revision notes, founders capture ideas while walking, and professionals convert 30-minute meetings into 2-second answers.',
  },
]
