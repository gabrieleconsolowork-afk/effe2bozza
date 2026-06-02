export const NAV_OFFSET = 88

let lenisInstance = null

export function setLenis(instance) {
  lenisInstance = instance
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

function nativeScrollToElement(element) {
  if (!element) return
  element.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}

export function smoothScrollToElement(element) {
  if (!element) return Promise.resolve()

  if (lenisInstance && !prefersReducedMotion()) {
    return new Promise((resolve) => {
      lenisInstance.scrollTo(element, {
        offset: -NAV_OFFSET,
        duration: 0.85,
        onComplete: resolve,
      })
    })
  }

  nativeScrollToElement(element)
  return Promise.resolve()
}

export function smoothScrollToId(id) {
  return smoothScrollToElement(document.getElementById(id))
}

export function smoothScrollToTop() {
  if (lenisInstance && !prefersReducedMotion()) {
    return new Promise((resolve) => {
      lenisInstance.scrollTo(0, { duration: 0.65, onComplete: resolve })
    })
  }
  window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  return Promise.resolve()
}

export function smoothScrollToIdWhenReady(id, maxAttempts = 80) {
  return new Promise((resolve) => {
    let attempts = 0

    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        smoothScrollToElement(el).then(resolve)
        return
      }
      if (attempts++ >= maxAttempts) {
        resolve()
        return
      }
      requestAnimationFrame(tryScroll)
    }

    tryScroll()
  })
}

export function parseHashHref(href) {
  if (!href?.includes('#')) return null
  try {
    const url = new URL(href, window.location.origin)
    const id = url.hash.replace('#', '').split('?')[0]
    if (!id) return null
    return { path: url.pathname || '/', id }
  } catch {
    return null
  }
}

export function syncHash(path, id) {
  window.history.pushState(null, '', `${path}#${id}`)
}

export function initScrollRestoration() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
}
