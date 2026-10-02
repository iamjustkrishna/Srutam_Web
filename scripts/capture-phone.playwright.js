async (page) => {
  await page.setViewportSize({ width: 1440, height: 1500 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('http://localhost:3101')
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() => {
    const frame = document.querySelector('.hero-static-phone .phone-frame').cloneNode(true)
    document.body.replaceChildren(frame)
    frame.style.transform = 'scale(2)'
    frame.style.transformOrigin = 'top left'
    const screen = frame.querySelector('.phone-screen')
    screen.style.borderRadius = '0'
    screen.style.border = '0'
  })
  await page.locator('.phone-screen').screenshot({ path: 'public/media/phone-screen.png' })
  await page.goto('http://localhost:3101')
  return { texture: 'public/media/phone-screen.png', source: 'Shared StaticPhone component at 2x resolution' }
}
