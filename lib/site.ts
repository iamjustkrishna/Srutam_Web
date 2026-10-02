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
    a: 'Recording and on-device transcription work offline once the speech model is set up. Optional AI summaries and conversational answers use your chosen AI provider and need connectivity. You can capture a thought now and use connected features later.',
  },
  {
    q: 'How does on-device transcription work?',
    a: 'Srutam runs Whisper via Sherpa-ONNX directly on your Android phone. Speech-to-text happens locally, without uploading audio for transcription. Processing time depends on your device and the length of your recording.',
  },
  {
    q: 'How does Srutam turn voice memos into action items?',
    a: 'Optional connected AI can shape a transcript into a summary, key points, and three buckets: Next Steps, Ideas, and Decisions. Detected tasks become interactive checklists, and reminders help you follow through.',
  },
  {
    q: 'Do I need an account to start?',
    a: 'No account is needed to capture your thoughts. Start with recording and local transcription. Cloud sync is optional, and connected AI features use your own provider key.',
  },
  {
    q: 'Is the website demo recording my voice?',
    a: 'No. The demo uses a prepared sample and never accesses your microphone. Its transcript, insights, and answers are examples. Nothing you enter in the demo is uploaded, and refreshing the page resets it.',
  },
  {
    q: 'Can developers use Srutam with their coding workflow?',
    a: 'Yes. Bring your own AI key (BYOK) and expose your voice memos through the Srutam MCP server. Record architecture decisions, standups, and debugging notes by voice, then ask about them from your agent or editor with citations back to the source note.',
  },
  {
    q: 'Is Srutam good for ADHD brain dumps, students, and founders?',
    a: 'Srutam gives passing thoughts somewhere to land. Capture an idea on a walk, a study note, or a brain dump. Use optional connected AI to explore summaries and next steps, without needing to organize everything before you speak.',
  },
]
