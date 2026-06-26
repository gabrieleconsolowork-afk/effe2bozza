import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import SmoothHashLink from './SmoothHashLink'
import { getLenis } from '../utils/smoothScroll'

const links = [
  { label: 'Home', to: '/#home' },
  { label: 'Chi siamo', to: '/chi-siamo' },
  { label: 'Servizi', to: '/servizi' },
]

function isLinkActive(to, pathname, hash) {
  if (to === '/#home') {
    return pathname === '/' && (!hash || hash === '#home')
  }
  if (to.includes('#')) {
    const [path, linkHash] = to.split('#')
    return pathname === path && hash === `#${linkHash}`
  }
  return pathname === to
}

const headerShellPadding = 'py-3 pr-3 pl-4 sm:py-4 sm:pr-4 sm:pl-5'

const SITE_MAX_PX = 1440 // 90rem
const HEADER_EXPAND_MAX_PX = 2400

const HEADER_COMPACT_AT = 24
const HEADER_EXPAND_AT = 120
const SCROLL_DIRECTION_THRESHOLD = 6
const SCROLL_STATE_HYSTERESIS = 12

const headerShellTransition =
  'max-width 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1)'

const pillTransition =
  'transition-[color,background-color] duration-500 ease-[cubic-bezier(0.33,0.86,0.55,1)]'

const pillBase = [
  'items-center justify-center min-h-[3.25rem] px-7 py-4 text-sm rounded-full whitespace-nowrap',
  pillTransition,
].join(' ')

const SCROLLED_INACTIVE_PILL_BG = 'bg-black/25'
const HERO_INACTIVE_PILL_BG = 'bg-neutral-800/45'
const DEFAULT_INACTIVE_PILL_BG = 'bg-neutral-900/30'

const inactivePillHover =
  'backdrop-blur-md text-white hover:bg-white hover:text-primary-dark'

function getInactivePillClass(scrolled, onHero) {
  if (scrolled) return `${SCROLLED_INACTIVE_PILL_BG} ${inactivePillHover}`
  if (onHero) return `${HERO_INACTIVE_PILL_BG} ${inactivePillHover}`
  return `${DEFAULT_INACTIVE_PILL_BG} ${inactivePillHover}`
}

function getInactivePillBg(scrolled, onHero) {
  if (scrolled) return SCROLLED_INACTIVE_PILL_BG
  if (onHero) return HERO_INACTIVE_PILL_BG
  return DEFAULT_INACTIVE_PILL_BG
}

function NavItem({ link, active, onClick, inactivePillClass, className = '' }) {
  const LinkComp = link.to.includes('#') ? SmoothHashLink : Link

  return (
    <LinkComp
      to={link.to}
      onClick={onClick}
      className={[
        'inline-flex',
        pillBase,
        'font-medium',
        active
          ? 'bg-white text-primary-dark hover:bg-neutral-100'
          : inactivePillClass,
        className,
      ].join(' ')}
    >
      {link.label}
    </LinkComp>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [headerExpanded, setHeaderExpanded] = useState(true)
  const lastScrollY = useRef(0)
  const [isMd, setIsMd] = useState(false)
  const [isSm, setIsSm] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth)
  const [hash, setHash] = useState(() => window.location.hash)
  const { pathname } = useLocation()

  useEffect(() => {
    const mqSm = window.matchMedia('(min-width: 640px)')
    const mqMd = window.matchMedia('(min-width: 768px)')
    const update = () => {
      setIsSm(mqSm.matches)
      setIsMd(mqMd.matches)
      setViewportWidth(window.innerWidth)
    }
    update()
    mqSm.addEventListener('change', update)
    mqMd.addEventListener('change', update)
    window.addEventListener('resize', update)
    return () => {
      mqSm.removeEventListener('change', update)
      mqMd.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const updateFromScroll = (y) => {
      setScrolled((prev) => {
        if (y <= HEADER_COMPACT_AT) return false
        if (y >= HEADER_COMPACT_AT + SCROLL_STATE_HYSTERESIS) return true
        return prev
      })

      const delta = y - lastScrollY.current
      lastScrollY.current = y

      setHeaderExpanded((prev) => {
        if (y <= HEADER_COMPACT_AT) return true
        if (y >= HEADER_EXPAND_AT) return false

        if (delta > SCROLL_DIRECTION_THRESHOLD) return false
        if (delta < -SCROLL_DIRECTION_THRESHOLD) return true
        return prev
      })
    }

    updateFromScroll(window.scrollY)

    let lenisHandler
    const attachLenis = () => {
      const lenis = getLenis()
      if (!lenis || lenisHandler) return
      lenisHandler = ({ scroll }) => updateFromScroll(scroll)
      lenis.on('scroll', lenisHandler)
      updateFromScroll(lenis.scroll)
    }

    attachLenis()
    const timer = window.setTimeout(attachLenis, 150)

    return () => {
      window.clearTimeout(timer)
      const lenis = getLenis()
      if (lenis && lenisHandler) lenis.off('scroll', lenisHandler)
    }
  }, [])

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    setHash(window.location.hash)
    lastScrollY.current = window.scrollY
    setHeaderExpanded(window.scrollY <= HEADER_COMPACT_AT)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const onHome = pathname === '/'
  const onHero = onHome && !scrolled
  const headerWide = onHome && isMd && headerExpanded
  const bgVisible = scrolled || !onHome
  const inactivePillClass = getInactivePillClass(bgVisible, onHero)
  const inactivePillBg = getInactivePillBg(bgVisible, onHero)

  const padExpandedPx = isSm ? 60 : 40
  const SITE_PADDING_PX = 24 // corrisponde a padding-inline: 1.5rem di site-container
  const compactShellWidth = Math.min(SITE_MAX_PX - SITE_PADDING_PX * 2, viewportWidth - SITE_PADDING_PX * 2)
  const wideShellWidth = Math.min(HEADER_EXPAND_MAX_PX, viewportWidth - padExpandedPx * 2)
  const headerShellWidth = headerWide ? wideShellWidth : compactShellWidth

  return (
    <motion.header
      className={[
        'fixed left-0 right-0 z-50 pointer-events-none',
        onHome ? 'top-4 sm:top-5' : 'top-0',
      ].join(' ')}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="pointer-events-auto mx-auto flex w-full flex-col">
        <div
          className={`relative mx-auto w-full rounded-full ${headerShellPadding}`}
          style={{
            maxWidth: headerShellWidth,
            transition: headerShellTransition,
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-md"
            style={{
              opacity: bgVisible ? 1 : 0,
              transition: headerShellTransition,
            }}
          />

          <div className="relative z-10 flex w-full items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-2">
            <div className="flex min-w-0 shrink-0 items-center md:justify-self-start">
              <Logo header light={onHome || bgVisible} />
            </div>

            <nav
              className="hidden md:flex items-center gap-2 justify-self-center"
              aria-label="Navigazione principale"
            >
              {links.map((l) => (
                <NavItem
                  key={l.label}
                  link={l}
                  active={isLinkActive(l.to, pathname, hash)}
                  inactivePillClass={inactivePillClass}
                />
              ))}
            </nav>

            <div className="flex shrink-0 items-center justify-end gap-2 md:justify-self-end">
              <Link
                to="/contattaci"
                className={[
                  'hidden sm:inline-flex',
                  pillBase,
                  'font-semibold bg-primary text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] hover:bg-effe-dark',
                ].join(' ')}
              >
                Contattaci
              </Link>

              <button
                type="button"
                className={`md:hidden min-h-[3.25rem] min-w-[3.25rem] p-4 rounded-full backdrop-blur-md text-white ${inactivePillBg}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`block h-0.5 bg-white transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`block h-0.5 bg-white transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 w-full"
            >
              <div className={`relative w-full rounded-3xl ${headerShellPadding}`}>
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-3xl bg-black/50 backdrop-blur-md"
                />
                <div className="relative z-10 flex flex-col gap-2">
                  {links.map((l) => (
                    <NavItem
                      key={l.label}
                      link={l}
                      active={isLinkActive(l.to, pathname, hash)}
                      inactivePillClass={inactivePillClass}
                      onClick={() => setMenuOpen(false)}
                      className="!flex w-full justify-center"
                    />
                  ))}
                  <Link
                    to="/contattaci"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full min-h-[3.25rem] items-center justify-center py-4 text-center text-sm font-semibold rounded-full bg-primary text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] hover:bg-effe-dark transition-colors"
                  >
                    Contattaci
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
