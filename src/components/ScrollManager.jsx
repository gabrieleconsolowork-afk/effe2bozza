import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {
  initScrollRestoration,
  smoothScrollToIdWhenReady,
  smoothScrollToTop,
} from '../utils/smoothScroll'

export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const skipInitialTop = useRef(true)
  const prevPathname = useRef(null)

  useEffect(() => {
    initScrollRestoration()
  }, [])

  useEffect(() => {
    if (hash) return
    if (skipInitialTop.current) {
      skipInitialTop.current = false
      return
    }
    smoothScrollToTop()
  }, [pathname, hash])

  /* Solo cambio pagina con hash (es. FAQ dal footer su altra route) */
  useEffect(() => {
    if (!hash) return
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname

    const id = hash.replace('#', '')
    const timer = window.setTimeout(() => {
      smoothScrollToIdWhenReady(id)
    }, 100)

    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}
