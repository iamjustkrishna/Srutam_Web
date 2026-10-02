async (page) => {
  const base = 'http://localhost:3101'
  const results = []
  const check = (condition, message) => {
    if (!condition) throw new Error(message)
  }
  const demo = page.locator('#demo')
  const button = (name) => demo.getByRole('button', { name, exact: true })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))

  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(base)
  await page.locator('.scene-ready').waitFor({ timeout: 15000 })
  check((await page.locator('canvas').count()) === 1, 'Desktop scene missing')
  await page.waitForTimeout(2000)
  const canvas = page.locator('canvas')
  const before = await canvas.screenshot()
  await canvas.hover({ position: { x: 100, y: 200 } })
  await page.waitForTimeout(700)
  const after = await canvas.screenshot()
  check(!before.equals(after), '3D phone did not respond to the pointer')
  results.push('Desktop WebGL scene and pointer response')

  await page.getByRole('button', { name: 'Watch the film' }).click()
  const dialog = page.getByRole('dialog')
  await dialog.waitFor()
  await page.waitForFunction(
    () => document.querySelector('video')?.readyState >= 1,
  )
  await page.locator('video').evaluate((video) => video.play())
  const media = await page
    .locator('video')
    .evaluate((video) => ({
      paused: video.paused,
      duration: video.duration,
      captions: video.textTracks.length,
    }))
  check(
    !media.paused && media.duration === 36 && media.captions === 1,
    'Film playback or captions failed',
  )
  await page.getByRole('button', { name: 'Close film' }).focus()
  await page.keyboard.press('Shift+Tab')
  check(
    await dialog.evaluate((el) => el.contains(document.activeElement)),
    'Backward focus escaped film dialog',
  )
  await page.keyboard.press('Tab')
  check(
    await page
      .getByRole('button', { name: 'Close film' })
      .evaluate((el) => el === document.activeElement),
    'Forward focus did not wrap',
  )
  await page.keyboard.press('Escape')
  check((await dialog.count()) === 0, 'Escape did not close film')
  check(
    await page
      .getByRole('button', { name: 'Watch the film' })
      .evaluate((el) => el === document.activeElement),
    'Film focus was not restored',
  )
  check(
    (await page.locator('video').count()) === 0,
    'Video remained mounted after close',
  )
  results.push(
    'Film playback, English captions, focus wrap, Escape, and teardown',
  )

  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Possibilities' })
    .click()
  check(
    (await page
      .getByRole('button', { name: 'Open navigation' })
      .getAttribute('aria-expanded')) === 'false',
    'Navigation remained open',
  )
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.keyboard.press('Escape')
  check(
    await page
      .getByRole('button', { name: 'Open navigation' })
      .evaluate((el) => el === document.activeElement),
    'Navigation focus was not restored',
  )
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await page.reload()
  await page.getByRole('button', { name: 'Switch to light theme' }).waitFor()
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  results.push('Mobile navigation, Escape handling, and persistent theme')

  await button('Insights').click()
  check(
    await demo.locator('.demo-empty').isVisible(),
    'Missing empty insights state',
  )
  await button('AI').click()
  check(await demo.locator('.demo-empty').isVisible(), 'Missing empty AI state')
  await button('Start sample recording').click()
  await page.waitForTimeout(1100)
  check(
    (await demo.locator('.record-time').innerText()) !== '00:00',
    'Timer did not advance',
  )
  await button('Pause recording').click()
  const paused = await demo.locator('.record-time').innerText()
  await page.waitForTimeout(1100)
  check(
    (await demo.locator('.record-time').innerText()) === paused,
    'Timer advanced while paused',
  )
  await button('Resume recording').click()
  await page.waitForTimeout(1100)
  check(
    (await demo.locator('.record-time').innerText()) !== paused,
    'Timer did not resume',
  )
  await button('Stop sample recording').click()
  check(
    await demo
      .getByLabel('Name your sample note')
      .evaluate((el) => el === document.activeElement),
    'Save input was not focused',
  )
  await demo.getByLabel('Name your sample note').fill('My launch thought')
  await button('Save note').click()
  check(
    (await demo.locator('.sample-note').innerText()).includes(
      'My launch thought',
    ),
    'Saved title missing from feed',
  )
  await demo.locator('.sample-note').click()
  check(
    (await demo.locator('.note-detail').innerText()).includes('morning walk'),
    'Transcript missing',
  )
  await button('See insights').click()
  await demo.getByRole('checkbox').first().check()
  await button('AI').click()
  for (const question of [
    'What should I do next?',
    'What was my launch idea?',
  ]) {
    await button(question).click()
    check(
      await demo.locator('.ai-answer').isVisible(),
      'Prepared answer missing',
    )
  }
  await demo.locator('.ai-answer button').click()
  check(
    await demo.locator('.note-detail').isVisible(),
    'Citation did not open the source',
  )
  await button('Insights').click()
  check(
    await demo.getByRole('checkbox').first().isChecked(),
    'Task state lost on tab switch',
  )
  await button('Start fresh').click()
  check(
    (await demo.locator('.sample-note').count()) === 0,
    'Reset left sample data',
  )
  await button('Start sample recording').click()
  await button('Discard recording').click()
  await button('Start sample recording').click()
  await button('Stop sample recording').click()
  await demo.getByLabel('Name your sample note').fill('   ')
  await button('Save note').click()
  check(
    (await demo.locator('.sample-note').innerText()).includes(
      'A little idea for a big launch',
    ),
    'Blank title fallback missing',
  )
  await button('Start fresh').click()
  await button('Start sample recording').click()
  await button('Start fresh').click()
  await page.waitForTimeout(1100)
  check(
    (await demo.locator('.record-time').count()) === 0,
    'Reset left an active recording',
  )
  results.push(
    'Empty states, record/pause/resume/discard, save/rename, transcript, insights, checklist, both AI answers, source navigation, blank title, and reset',
  )

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: width >= 1000 ? 1000 : 900 })
    for (const reduced of ['no-preference', 'reduce']) {
      await page.emulateMedia({ reducedMotion: reduced })
      for (const theme of ['light', 'dark']) {
        const target = page.getByRole('button', {
          name: `Switch to ${theme} theme`,
        })
        if (await target.count()) await target.click()
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: 'instant' }),
        )
        if (width >= 900 && reduced === 'no-preference')
          await page.locator('.scene-ready').waitFor({ timeout: 15000 })
        await page.waitForTimeout(650)
        const dimensions = await page.evaluate(() => ({
          width: innerWidth,
          scroll: document.documentElement.scrollWidth,
        }))
        check(
          dimensions.scroll === dimensions.width,
          `Horizontal overflow: ${width}/${theme}/${reduced}`,
        )
        if (reduced === 'reduce' || width < 900)
          check(
            (await page.locator('canvas').count()) === 0,
            'Unexpected WebGL in static mode',
          )
        if (width !== 320)
          await page.screenshot({
            path: `output/playwright/${width}-${theme}-${reduced}.png`,
          })
      }
    }
  }
  results.push(
    '320/390/768/1440 widths, both themes, normal/reduced motion, no horizontal overflow',
  )

  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await page.locator('.scene-ready').waitFor({ timeout: 15000 })
  for (let index = 0; index < 3; index++) {
    await page
      .locator('.story-chapter')
      .nth(index)
      .evaluate((el) =>
        window.scrollTo({
          top: el.getBoundingClientRect().top + scrollY - innerHeight * 0.25,
          behavior: 'instant',
        }),
      )
    await page.waitForTimeout(750)
    const opacity = await page
      .locator('.story-phone-panel')
      .nth(index)
      .evaluate((el) => Number(getComputedStyle(el).opacity))
    check(opacity > 0.99, `Story chapter ${index + 1} did not activate`)
  }
  await page.locator('#features').scrollIntoViewIfNeeded()
  await page.waitForTimeout(850)
  await page
    .locator('#features')
    .screenshot({
      path: 'output/playwright/desktop-features.png',
      style: '.site-header { visibility: hidden; }',
    })
  await page.locator('#privacy').scrollIntoViewIfNeeded()
  await page.waitForTimeout(850)
  await page
    .locator('#privacy')
    .screenshot({
      path: 'output/playwright/desktop-privacy.png',
      style: '.site-header { visibility: hidden; }',
    })
  results.push('All three scroll-linked story chapters')

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page
    .locator('canvas')
    .evaluate((canvas) =>
      canvas
        .getContext('webgl2')
        .getExtension('WEBGL_lose_context')
        .loseContext(),
    )
  await page.waitForTimeout(500)
  check(
    (await page.locator('canvas').count()) === 0,
    'Lost WebGL context was not removed',
  )
  check(
    (await page
      .locator('.hero-static-phone')
      .evaluate((el) => Number(getComputedStyle(el).opacity))) === 1,
    'Static fallback not restored',
  )
  results.push('WebGL context-loss fallback')

  const noJsContext = await page
    .context()
    .browser()
    .newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    })
  const noJsPage = await noJsContext.newPage()
  await noJsPage.goto(base)
  check(
    await noJsPage.locator('h1').isVisible(),
    'Headline missing without JavaScript',
  )
  check(
    (await noJsPage.locator('#privacy h2').count()) === 1,
    'Server-rendered product content missing',
  )
  check(
    (await noJsPage.locator('a[href*=\"play.google.com\"]').count()) >= 3,
    'Download links missing without JavaScript',
  )
  await noJsPage.screenshot({
    path: 'output/playwright/mobile-no-javascript.png',
  })
  await noJsContext.close()
  results.push('JavaScript-disabled content and download links')
  check(errors.length === 0, `Runtime errors: ${errors.join('; ')}`)
  return { passed: results, runtimeErrors: errors }
}
