// Run with playwright-cli run-code --filename=scripts/verify-notices.playwright.js
// after opening the production site in that Playwright session.
async (page) => {
  const base = new URL(page.url()).origin
  const path = '/legal/third-party-notices'
  const check = (condition, message) => {
    if (!condition) throw new Error(message)
  }
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 1000 })

  const response = await page.goto(`${base}${path}`)
  check(response.status() === 200, 'Notices route failed')
  check(
    response.headers()['x-robots-tag'] === 'noindex, nofollow, nosnippet',
    'Missing notices HTTP indexing restriction',
  )
  check(
    await page.locator('meta[name="robots"]').getAttribute('content') ===
      'noindex, nofollow, nosnippet',
    'Missing notices robots metadata',
  )
  check(await page.title() === 'Third-party notices | Srutam', 'Wrong title')
  check(
    await page.locator('link[rel="canonical"]').getAttribute('href') ===
      `https://srutam.iamjustkrishna.space${path}`,
    'Wrong notices canonical',
  )
  check(
    await page.locator('meta[property="og:url"]').getAttribute('content') ===
      `https://srutam.iamjustkrishna.space${path}`,
    'Wrong social URL',
  )
  check(await page.locator('script[type="application/ld+json"]').count() === 0,
    'Homepage structured data leaked into notices')

  const expectedText = [
    'NVIDIA Parakeet-TDT-CTC-110M', 'CC BY 4.0', 'quantized to int8',
    'sherpa-onnx-nemo-parakeet_tdt_ctc_110m-en-36000-int8',
    'Srutam uses it unmodified from that export.',
    'NVIDIA does not endorse Srutam.', 'Android source build note',
    'scripts/fetch-asr-model.ps1', 'scripts/fetch-asr-model.sh',
    'app/src/main/assets/', 'Silero VAD', 'MIT', 'Apache License 2.0',
    'libsherpa-onnx-jni.so', 'app/src/main/java/com/k2fsa/sherpa/onnx/',
    'v1.12.39', 'ONNX Runtime',
  ]
  const text = await page.locator('main').innerText()
  expectedText.forEach((value) => check(text.includes(value), `Missing ${value}`))
  const expectedLinks = [
    'https://huggingface.co/nvidia/parakeet-tdt_ctc-110m',
    'https://creativecommons.org/licenses/by/4.0/',
    'https://github.com/k2-fsa/sherpa-onnx/releases/tag/asr-models',
    'https://github.com/snakers4/silero-vad',
    'https://github.com/k2-fsa/sherpa-onnx',
    'https://github.com/microsoft/onnxruntime',
  ]
  for (const href of expectedLinks) {
    check(await page.locator(`main a[href="${href}"]`).count() === 1,
      `Missing attribution link: ${href}`)
  }

  for (const theme of ['light', 'dark']) {
    await page.evaluate((value) => localStorage.setItem('srutam-theme', value), theme)
    await page.reload()
    await page.evaluate(() => document.fonts.ready)
    check(await page.locator('html').evaluate(
      (element) => element.classList.contains('dark')) === (theme === 'dark'),
      'Theme preference was not applied')
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      check(await page.evaluate(() => {
        const main = document.querySelector('main').getBoundingClientRect()
        return document.documentElement.scrollWidth <= innerWidth &&
          [...document.querySelectorAll('main li, main code, main a')].every(
            (element) => [...element.getClientRects()].every(
              (rect) => rect.left >= main.left && rect.right <= main.right + 1))
      }), `Content overflows at ${width}px in ${theme} mode`)
    }
    await page.setViewportSize({ width: 390, height: 844 })
    await page.screenshot({ path: `output/notices-mobile-${theme}.png`, fullPage: true })
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.screenshot({ path: `output/notices-desktop-${theme}.png`, fullPage: true })
  }

  await page.getByRole('link', { name: 'Back to Srutam' }).click()
  check(page.url() === `${base}/`, 'Back-to-home link failed')
  check(await page.locator('meta[name="robots"]').getAttribute('content') ===
    'index, follow', 'Homepage indexing changed')
  check(await page.locator('script[type="application/ld+json"]').count() === 2,
    'Homepage structured data missing')
  const homeResponse = await page.request.get(base)
  check(!homeResponse.headers()['x-robots-tag'], 'Notices HTTP header leaked to homepage')
  check(!/Whisper|Parakeet|Silero/i.test(await page.locator('body').innerText()),
    'Model-specific marketing copy remains')
  check(await page.locator(`a[href="${path}"]`).count() === 1,
    'Notices link should appear only once')
  await page.locator('footer').getByRole('link', { name: 'Third-party notices' }).click()
  check(page.url() === `${base}${path}`, 'Footer link failed')
  for (const file of ['/sitemap.xml', '/llms.txt', '/llms-full.txt']) {
    const result = await page.request.get(`${base}${file}`)
    check(result.ok(), `${file} failed`)
    const body = await result.text()
    check(!body.includes(path), `Notices published in ${file}`)
    check(!/Whisper|Parakeet|Silero/i.test(body), `Model name leaked in ${file}`)
  }
  const robots = await page.request.get(`${base}/robots.txt`)
  check(!/Disallow:\s*\/(?:legal)?/i.test(await robots.text()),
    'Crawlers blocked from reading noindex')

  const noJs = await page.context().browser().newContext({ javaScriptEnabled: false })
  try {
    const staticPage = await noJs.newPage()
    await staticPage.goto(`${base}${path}`)
    check(await staticPage.getByRole('heading', { level: 1 }).isVisible(),
      'Heading unavailable without JavaScript')
    const staticText = await staticPage.locator('main').innerText()
    expectedText.forEach((value) => check(staticText.includes(value),
      `Missing without JavaScript: ${value}`))
  } finally {
    await noJs.close()
  }
  check(errors.length === 0, `Browser errors: ${errors.join('; ')}`)
  return 'PASS: notices content, attribution links, metadata, headers, homepage schema, footer navigation, sitemap/LLM omission, both themes at 320/390/768/1440px, no-JS rendering.'
}
