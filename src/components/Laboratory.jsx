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
    card: 'h-full bg-white/10 border border-white/10 flex flex-col',
    iconBox: 'w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/10',
    icon: 'text-lime-500',
    desc: 'text-xs text-white/60 leading-relaxed flex-1',
    navBtn: 'w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors',
  },
  light: {
    badge: 'inline-block px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full uppercase tracking-wider',
    title: 'font-semibold text-primary-dark mb-2 text-sm',
    titleLg: 'text-4xl font-bold text-primary-dark leading-tight',
    titleCentered: 'text-3xl font-bold text-primary-dark',
    subtitle: 'text-slate-500',
    card: 'h-full bg-white border border-slate-200 flex flex-col',
    iconBox: 'w-9 h-9 bg-logo-light rounded-lg flex items-center justify-center border border-effe-medium/30',
    icon: 'text-primary',
    desc: 'text-xs text-slate-500 leading-relaxed flex-1',
    navBtn: 'w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-primary-dark transition-colors',
  },
}

function LabCard({ item, width, fadeIn, fadeOut, theme = 'dark' }) {
  const Icon = item.icon
  const t = themes[theme]
  const content = (
    <div
      className={t.card}
      style={cardShellStyle}
    >
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
  )

  return (
    <div className="shrink-0 self-stretch" style={{ width }}>
      {fadeIn || fadeOut ? (
        <motion.div
          className="h-full origin-center"
          initial={{
            opacity: fadeIn ? 0 : 1,
            scale: fadeIn ? ENTER_SCALE : 1,
          }}
          animate={{
            opacity: fadeOut ? 0 : 1,
            scale: fadeOut ? ENTER_SCALE : 1,
          }}
          transition={{ duration: SLIDE_MS, ease: 'easeInOut' }}
        >
          {content}
        </motion.div>
      ) : (
        content
      )}
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

export default function Laboratory({ sectionId = 'chi-siamo', header = 'split', theme = 'dark', className = 'py-28 bg-effe-darker text-white' }) {
  const containerRef = useRef(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [instant, setInstant] = useState(false)
  const [paused, setPaused] = useState(false)
  const [cardWidth, setCardWidth] = useState(0)
  const [fadeEnterKey, setFadeEnterKey] = useState(null)
  const [fadeExitKey, setFadeExitKey] = useState(null)
  const visibleCount = useVisibleCount()

  const trackItems = [...items, ...items]
  const cardKey = (i, item) => `${item.title}-${i}`

  const markEntering = useCallback((enterIdx) => {
    const extended = [...items, ...items]
    if (enterIdx >= 0 && enterIdx < extended.length) {
      setFadeEnterKey(`${extended[enterIdx].title}-${enterIdx}`)
    }
  }, [])

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
      setCardWidth(w)
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [visibleCount])

  const goNext = useCallback(() => {
    setInstant(false)
    setTrackIndex((prev) => {
      const next = prev + 1
      markEntering(next + visibleCount - 1)
      markExiting(prev)
      return next
    })
  }, [visibleCount, markEntering, markExiting])

  const goPrev = useCallback(() => {
    if (trackIndex === 0) {
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
      setInstant(false)
      const prev = trackIndex - 1
      markEntering(prev)
      markExiting(trackIndex + visibleCount - 1)
      setTrackIndex(prev)
    }
  }, [trackIndex, visibleCount, markEntering, markExiting])

  const handleAnimationComplete = useCallback(() => {
    setFadeEnterKey(null)
    setFadeExitKey(null)
    if (trackIndex >= items.length) {
      setInstant(true)
      setTrackIndex(trackIndex - items.length)
      requestAnimationFrame(() => setInstant(false))
    }
  }, [trackIndex])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(goNext, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, goNext])

  const slideStep = cardWidth + GAP
  const t = themes[theme]

  return (
    <section {...(sectionId ? { id: sectionId } : {})} className={className}>
      <div className="max-w-6xl mx-auto px-6">
        <LaboratoryHeader variant={header} theme={theme} />

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              className="flex items-stretch"
              style={{ gap: GAP }}
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
    </section>
  )
}
