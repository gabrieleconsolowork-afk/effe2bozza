function easeOutQuart(t) {
  return 1 - (1 - t) ** 4
}

export function smoothScrollToElement(element, { duration = 900, offset = 0 } = {}) {
  if (!element) return

  const startY = window.scrollY
  const targetY = element.getBoundingClientRect().top + window.scrollY - offset
  const distance = targetY - startY
  if (distance === 0) return

  const startTime = performance.now()

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, startY + distance * easeOutQuart(progress))
    if (progress < 1) requestAnimationFrame(tick)
  }

  tick(startTime + 1)
  requestAnimationFrame(tick)
}

export function smoothScrollToId(id, options) {
  smoothScrollToElement(document.getElementById(id), options)
}
