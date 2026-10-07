import type { Metadata } from 'next'
import styles from './page.module.css'

const title = 'Third-party notices'
const description =
  "Attribution and license notices for the components used in Srutam's on-device speech recognition."
const path = '/legal/third-party-notices'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  robots: { index: false, follow: false, nosnippet: true },
  openGraph: {
    title: `${title} | Srutam`,
    description,
    url: path,
    siteName: 'Srutam',
    type: 'website',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: `${title} | Srutam`,
    description,
    images: [],
  },
}

export default function ThirdPartyNoticesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>
          <span aria-hidden="true">&larr; </span>Back to Srutam
        </a>
      </header>
      <main id="main">
        <article>
          <header className={styles.intro}>
            <span className={styles.eyebrow}>Legal / Attribution</span>
            <h1>Third-party notices</h1>
            <p>
              Srutam&apos;s on-device speech recognition is built from the
              following components.
            </p>
          </header>

          <section className={styles.section} aria-labelledby="speech-model">
            <h2 id="speech-model">
              Speech recognition model: NVIDIA Parakeet-TDT-CTC-110M
            </h2>
            <ul>
              <li>
                Creator: NVIDIA. Source:{' '}
                <a href="https://huggingface.co/nvidia/parakeet-tdt_ctc-110m">
                  NVIDIA Parakeet-TDT-CTC-110M on Hugging Face
                </a>.
              </li>
              <li>
                License:{' '}
                <a href="https://creativecommons.org/licenses/by/4.0/">
                  Creative Commons Attribution 4.0 International (CC BY 4.0)
                </a>.
              </li>
              <li>
                Changes: the model was converted to ONNX and quantized to int8
                by the sherpa-onnx project (
                <a href="https://github.com/k2-fsa/sherpa-onnx/releases/tag/asr-models">
                  ASR model releases
                </a>
                , file{' '}
                <code>sherpa-onnx-nemo-parakeet_tdt_ctc_110m-en-36000-int8</code>
                ). Srutam uses it unmodified from that export.
              </li>
              <li>NVIDIA does not endorse Srutam.</li>
            </ul>
            <aside className={styles.note} aria-labelledby="build-note">
              <h3 id="build-note">Android source build note</h3>
              <p>
                The model file is not stored in the Android source repository.
                Before building the Android app, run{' '}
                <code>scripts/fetch-asr-model.ps1</code> (Windows) or{' '}
                <code>scripts/fetch-asr-model.sh</code> to download it into{' '}
                <code>app/src/main/assets/</code>.
              </p>
            </aside>
          </section>

          <section className={styles.section} aria-labelledby="vad-model">
            <h2 id="vad-model">Voice activity detection model: Silero VAD</h2>
            <ul>
              <li>
                Source:{' '}
                <a href="https://github.com/snakers4/silero-vad">
                  Silero VAD on GitHub
                </a>.
              </li>
              <li>License: MIT</li>
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="runtime">
            <h2 id="runtime">Inference runtime: sherpa-onnx and ONNX Runtime</h2>
            <ul>
              <li>
                <a href="https://github.com/k2-fsa/sherpa-onnx">sherpa-onnx</a>:{' '}
                Apache License 2.0. Prebuilt <code>libsherpa-onnx-jni.so</code>{' '}
                and the Kotlin wrappers under{' '}
                <code>app/src/main/java/com/k2fsa/sherpa/onnx/</code> come from
                release v1.12.39.
              </li>
              <li>
                <a href="https://github.com/microsoft/onnxruntime">
                  ONNX Runtime
                </a>: MIT License
              </li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  )
}
