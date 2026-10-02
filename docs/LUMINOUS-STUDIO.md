# Srutam: Luminous Studio

Implemented on `feat/srutam-luminous-studio`.

## Experience

- Pearl, cobalt, and midnight surfaces with locally hosted Fraunces and Manrope.
- A rounded, procedural Three.js phone with pointer response and a screen texture generated from the shared native-style UI.
- Capture / Understand / Act story chapters, with a sticky phone on desktop and stacked previews on mobile.
- In-memory sample recording: timer, pause/resume, discard, save and rename, transcript, insights, checklist, prepared AI answers, and source links.
- Captioned 36-second film in a keyboard-accessible dialog, with music attribution.
- Persistent light/dark themes, reduced-motion support, and static fallbacks for mobile, disabled JavaScript, and unavailable/lost WebGL.

The demo never accesses the microphone or calls an AI service. The Android app and Remotion project were used as references and were not edited for this redesign.

## Implementation Notes

The landing page and SEO content remain server-rendered. Client components contain the demo, theme control, dialog, motion orchestration, and 3D scene.

Three.js loads only on desktop without reduced motion. Its canvas uses demand rendering, stops offscreen, and settles rather than running a continuous animation. GSAP loads only when a story or feature section enters the viewport; it never hides content already being read. Both systems clean up on unmount and preference changes.

The homepage has no new backend or public API. Existing download URLs and section anchors are preserved. Copy distinguishes offline recording/transcription from optional connected AI. Vercel Analytics runs only on Vercel production deployments.

Fonts retain their OFL licenses in `public/fonts`. Film attribution is in `public/media/MUSIC-CREDIT.txt` and the player dialog.

## Run And Verify

```powershell
npm install
npm run build
node node_modules/next/dist/bin/next start --port 3101
```

In another terminal:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=srutam open http://localhost:3101
npx --yes --package @playwright/cli playwright-cli -s=srutam run-code --filename scripts/verify-site.playwright.js
```

To regenerate the 3D phone texture after editing the shared screen:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=srutam run-code --filename scripts/capture-phone.playwright.js
```

The verification script covers the complete recording flow, both sample questions, task persistence, reset, film playback and captions, focus wrapping, Escape handling, theme persistence, all three story chapters, and WebGL context-loss recovery. It checks 320, 390, 768, and 1440px widths in both themes and motion preferences, and verifies server-rendered content with JavaScript disabled.

Screenshots and local audit outputs are in the ignored `output` directory. The final browser run passed with no runtime exceptions. Production compilation and TypeScript validation passed.

## Performance Audit

Run against the production server, not `next dev`:

```powershell
npx --yes lighthouse http://localhost:3101 --output=json --output=html --output-path=output/lighthouse-mobile '--only-categories=performance,accessibility,best-practices,seo' '--chrome-flags=--headless --no-sandbox' --quiet
```

Lighthouse scores are local lab measurements, not field performance guarantees. Reports are in `output/lighthouse-mobile.report.html` and `.json`.

Final mobile audit on 2026-09-28: **90 performance, 100 accessibility, 96 best practices, 100 SEO**. LCP: 3.3 seconds; total blocking time: 160ms; cumulative layout shift: 0.

Final visual references: `output/playwright/desktop-final.png`, `desktop-demo-final.png`, `mobile-final.png`, and `mobile-recording-final.png`. The viewport/theme/reduced-motion matrix screenshots are in the same directory.

The current React Three Fiber dependency emits an upstream `THREE.Clock` deprecation warning. It does not produce a runtime exception; 3D mounting, pointer interaction, preference changes, and context-loss fallback were verified.
