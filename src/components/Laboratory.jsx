import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { laboratoryItems as items } from '../data/laboratoryItems'

const GAP = 16
const AUTOPLAY_MS = 6000
const SLIDE_MS = 0.7
const ENTER_SCALE = 0.88
const CARD_PAD = '1rem'
const IMG_RADIUS = '0.75rem'

const cardShellStyle = {
  '--card-pad': CARD_PAD,
  '--img-radius': IMG_RADIUS,
  padding: 'var(--card-pad)',
  borderRadius: 'calc(var(--img-radius) + var(--card-pad))',
}

const themes = {
  dark: {
    badge: 'inline-block px-3 py-1.5 bg-white/10 text-white/60 text-xs font-semibold rounded-full uppercase tracking-wider',
    title: 'font-semibold text-white mb-2 text-sm',
    titleLg: 'text-4xl font-bold text-white leading-tight',
    titleCentered: 'text-3xl font-bold text-white',
    subtitle: 'text-white/60',
    card: 'h-full bg-white/10 border border-white/5 flex flex-col',
    iconBox: 'w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/5',
    icon: 'text-lime-500',
    desc: 'text-xs text-white/60 leading-relaxed flex-1',
    navBtn: 'cursor-pointer w-10 h-10 rounded-full bg-white/10 border border-white/5 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors',
  },
  light: {
    badge: 'section-label',
    title: 'font-semibold text-primary-dark mb-2 text-sm',
    titleLg: 'text-4xl font-bold text-primary-dark leading-tight',
    titleCentered: 'text-3xl font-bold text-primary-dark',
    subtitle: 'text-muted',
    card: 'h-full bg-white border border-primary-dark/10 flex flex-col',
    iconBox: 'w-9 h-9 bg-logo-light rounded-lg flex items-center justify-center border border-primary-dark/10',
    icon: 'text-primary',
    desc: 'text-xs text-muted leading-relaxed flex-1',
    navBtn: 'cursor-pointer w-10 h-10 rounded-full bg-slate-100 border border-primary-dark/10 flex items-center justify-center text-muted hover:bg-slate-200 hover:text-primary-dark transition-colors',
  },
}

function LabCard({ item, width, fadeIn, fadeOut, theme = 'dark' }) {
  const Icon = item.icon
  const t = themes[theme]

  // Usa sempre motion.div con keyframe array: evita il ciclo mount/unmount
  // del rendering condizionale che impediva a Framer Motion di applicare
  // initial in modo affidabile. I keyframe [da, a] forzano l'animazione
  // indipendentemente dallo stato precedente dell'elemento.
  return (
    <div className="shrink-0 self-stretch" style={{ width }}>
      <motion.div
        className="h-full origin-center"
        animate={{
          opacity: fadeIn ? [0, 1] : fadeOut ? [1, 0] : 1,
          scale:   fadeIn ? [ENTER_SCALE, 1] : fadeOut ? [1, ENTER_SCALE] : 1,
        }}
        transition={
          fadeIn || fadeOut
            ? { duration: SLIDE_MS, ease: 'easeInOut' }
            : { duration: 0 }
        }
      >
        <div className={t.card} style={cardShellStyle}>
          <div
            className="aspect-[4/3] w-full overflow-hidden shrink-0"
            style={{ borderRadius: 'var(--img-radius)' }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="pt-4 flex flex-col flex-1">
            <div className="mb-4">
              <div className={t.iconBox}>
                <Icon size={17} className={t.icon} />
              </div>
            </div>
            <h3 className={t.title}>{item.title}</h3>
            <p className={t.desc}>{item.desc}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function useVisibleCount() {
  const [count, setCount] = useState(3)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCount(3)
      else if (window.innerWidth >= 640) setCount(2)
      else setCount(1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return count
}

function LaboratoryHeader({ variant, theme = 'dark' }) {
  const t = themes[theme]
  if (variant === 'centered') {
    return (
      <div className="text-center mb-14 space-y-3">
        <span className={t.badge}>
          Il laboratorio
        </span>
        <h2 className={t.titleCentered}>Attrezzature e competenze</h2>
        <p className={`${t.subtitle} max-w-lg mx-auto text-sm`}>
          Workflow completamente digitale con finitura artigianale. Dalla fresatura alla ceramizzazione, tutto sotto lo stesso tetto.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
      <div className="space-y-3">
        <span className={t.badge}>
          Il laboratorio
        </span>
        <h2 className={t.titleLg}>
          Attrezzature e competenze
        </h2>
      </div>
      <p className={`${t.subtitle} max-w-xs text-sm leading-relaxed md:text-right`}>
        Workflow completamente digitale con finitura artigianale. Dalla fresatura alla ceramizzazione, tutto sotto lo stesso tetto.
      </p>
    </div>
  )
}

const innerThemeClass = {
  dark:  'bg-effe-darker text-white',
  light: 'bg-surface text-primary-dark',
}

export default function Laboratory({ sectionId = 'chi-siamo', header = 'split', theme = 'dark', className = 'py-12 sm:py-20' }) {
  const containerRef = useRef(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const trackIndexRef = useRef(0)
  const [instant, setInstant] = useState(false)
  const [paused, setPaused] = useState(false)
  // Stima iniziale basata sul viewport per evitare il flash vuoto
  // al primo carico (viene corretta dal ResizeObserver al primo paint)
  const [cardWidth, setCardWidth] = useState(() => {
    if (typeof window === 'undefined') return 0
    const visible = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1
    const containerPad = 48 // site-container padding-inline * 2
    const innerPad = window.innerWidth >= 1024 ? 80 : window.innerWidth >= 640 ? 64 : 40
    const containerW = Math.min(1392, window.innerWidth - containerPad) - innerPad * 2
    return Math.max(0, (containerW - GAP * (visible - 1)) / visible)
  })
  const [fadeEnterKey, setFadeEnterKey] = useState(null)
  const [fadeExitKey, setFadeExitKey] = useState(null)
  const fadeTimerRef = useRef(null)
  const visibleCount = useVisibleCount()

  useEffect(() => {
    trackIndexRef.current = trackIndex
  }, [trackIndex])

  const trackItems = [...items, ...items]
  const cardKey = (i, item) => `${item.title}-${i}`

  const clearFadeKeys = useCallback(() => {
    clearTimeout(fadeTimerRef.current)
    setFadeEnterKey(null)
    setFadeExitKey(null)
  }, [])

  const markEntering = useCallback((enterIdx) => {
    const extended = [...items, ...items]
    if (enterIdx >= 0 && enterIdx < extended.length) {
      clearTimeout(fadeTimerRef.current)
      setFadeEnterKey(`${extended[enterIdx].title}-${enterIdx}`)
      // Fallback: se onAnimationComplete non scatta (es. scroll pesante), pulisce i fade
      fadeTimerRef.current = setTimeout(clearFadeKeys, SLIDE_MS * 1000 + 300)
    }
  }, [clearFadeKeys])

  const markExiting = useCallback((exitIdx) => {
    const extended = [...items, ...items]
    if (exitIdx >= 0 && exitIdx < extended.length) {
      setFadeExitKey(`${extended[exitIdx].title}-${exitIdx}`)
    }
  }, [])

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (!el) return
      const w = (el.offsetWidth - GAP * (visibleCount - 1)) / visibleCount
      // Non sovrascrivere con 0: il layout potrebbe non essere ancora completato
      if (w > 0) setCardWidth(w)
    }

    // Doppio RAF: aspetta che il browser completi il paint e il layout
    // prima di misurare (fix per il primo carico, quando CSS/font non sono settled)
    let raf2 = null
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(update)
    })

    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [visibleCount])

  const goNext = useCallback(() => {
    // Legge l'indice corrente dal ref (evita stale closure)
    // e chiama mark* FUORI dall'updater: garantisce che fade e slide
    // partano nello stesso batch di render
    const prev = trackIndexRef.current
    const next = prev + 1
    markEntering(next + visibleCount - 1)
    markExiting(prev)
    setInstant(false)
    setTrackIndex(next)
  }, [visibleCount, markEntering, markExiting])

  const goPrev = useCallback(() => {
    const current = trackIndexRef.current
    if (current === 0) {
      setInstant(true)
      setFadeEnterKey(null)
      setFadeExitKey(null)
      setTrackIndex(items.length)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setInstant(false)
          setTrackIndex(items.length - 1)
        })
      })
    } else {
      const prev = current - 1
      markEntering(prev)
      markExiting(current + visibleCount - 1)
      setInstant(false)
      setTrackIndex(prev)
    }
  }, [visibleCount, markEntering, markExiting])

  const handleAnimationComplete = useCallback(() => {
    // NON pulire i fade qui: la slide (700ms) completa prima che le card
    // abbiano finito di animare (anche 700ms ma partono un render dopo).
    // Il timer in markEntering (1000ms) ci pensa lui con il buffer giusto.
    const currentIndex = trackIndexRef.current
    if (currentIndex >= items.length) {
      setInstant(true)
      setTrackIndex(currentIndex - items.length)
      requestAnimationFrame(() => setInstant(false))
    }
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(goNext, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, goNext])

  useEffect(() => {
    return () => clearTimeout(fadeTimerRef.current)
  }, [])

  const slideStep = cardWidth + GAP
  const t = themes[theme]

  return (
    <section {...(sectionId ? { id: sectionId } : {})} className={className}>
      <div className="site-container">
        <div className={`${innerThemeClass[theme]} rounded-3xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12`}>
          <LaboratoryHeader variant={header} theme={theme} />

          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div ref={containerRef} className="overflow-hidden">
              <motion.div
                className="flex items-stretch"
                style={{ gap: GAP, willChange: 'transform' }}
                animate={{ x: -trackIndex * slideStep }}
                transition={instant ? { duration: 0 } : { duration: SLIDE_MS, ease: 'easeInOut' }}
                onAnimationComplete={handleAnimationComplete}
              >
                {trackItems.map((item, i) => (
                  <LabCard
                    key={cardKey(i, item)}
                    item={item}
                    width={cardWidth}
                    fadeIn={fadeEnterKey === cardKey(i, item)}
                    fadeOut={fadeExitKey === cardKey(i, item)}
                    theme={theme}
                  />
                ))}
              </motion.div>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              <button
                type="button"
                aria-label="Slide precedente"
                onClick={goPrev}
                className={t.navBtn}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Slide successiva"
                onClick={goNext}
                className={t.navBtn}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
