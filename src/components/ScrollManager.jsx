import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {
  initScrollRestoration,
  smoothScrollToIdWhenReady,
  instantScrollToTop,
} from '../utils/smoothScroll'

export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const skipInitialTop = useRef(true)
  const prevKey = useRef(null)

  useEffect(() => {
    initScrollRestoration()
  }, [])

  // On route change scroll to top (skip on first mount = page load/reload)
  useEffect(() => {
    if (hash) return
    if (skipInitialTop.current) {
      skipInitialTop.current = false
      return
    }
    instantScrollToTop()
  }, [pathname, hash])

  // Hash navigation (e.g. FAQ link from footer on different route)
  useEffect(() => {
    if (!hash) return
    const key = `${pathname}${hash}`
    if (prevKey.current === key) return
    prevKey.current = key

    const id = hash.replace('#', '')
    const timer = window.setTimeout(() => {
      smoothScrollToIdWhenReady(id)
    }, 300)

    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}
