import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { smoothScrollToId, syncHash } from '../utils/smoothScroll'
import heroTeam from '../assets/hero-team.png'

const MotionLink = motion.create(Link)

const stats = [
  { value: 26, suffix: '', label: 'Anni di attività', note: 'Fondati nel 1998' },
  { value: 6, suffix: '', label: 'Professionisti', note: 'Team dedicato' },
  { value: 1998, suffix: '', label: 'Anno di fondazione', note: 'Ponte nelle Alpi (BL)' },
  { value: 100, suffix: '%', label: 'Qualità garantita', note: 'Ogni singolo lavoro' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

function scrollToComeFunziona() {
  smoothScrollToId('come-funziona')
  syncHash('/', 'come-funziona')
}

function MockUI() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[19rem] bg-white rounded-xl border border-border overflow-hidden shadow-lg"
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border-light bg-surface-muted">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-effe-medium" />
      </div>
      <div className="p-3 space-y-2.5">
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 text-[10px] bg-primary-dark text-white rounded-md font-medium">Produzione</span>
          <span className="px-2 py-0.5 text-[10px] bg-logo-light text-effe-dark rounded-md">Corona</span>
          <span className="px-2 py-0.5 text-[10px] bg-logo-light text-effe-dark rounded-md">Zirconia</span>
        </div>
        <div className="border-2 border-dashed border-border rounded-lg p-2 space-y-1.5">
          <div className="flex items-center gap-1.5 bg-surface-muted rounded-md px-2.5 py-1.5">
            <span className="text-primary text-[10px]">📄</span>
            <span className="text-[10px] text-muted-strong font-medium truncate">corona_superiore.stl</span>
          </div>
          <div className="flex items-center justify-center py-1">
            <span className="text-[10px] text-slate-400">Trascina altri file qui</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-muted">
            <span>Avanzamento</span>
            <span className="font-medium text-primary-dark">5 di 7</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-logo-lime rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '71%' }}
              transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className="text-4xl font-bold text-primary-dark tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col pt-16 overflow-hidden bg-white">
      {/* Geometric background — diagonal grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(#1d1d1b 1px, transparent 1px), linear-gradient(90deg, #1d1d1b 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

      <div className="relative flex-1 flex items-center">
        <div className="site-container py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center w-full">
        {/* Left: testo — sotto mock/foto su mobile, a sinistra da lg */}
        <div className="relative z-10 order-2 lg:order-1 space-y-7 min-w-0 max-lg:max-w-xl max-lg:mx-auto max-lg:w-full">
          <motion.div {...fadeUp(0.1)}>
            <span className="section-label">
              Laboratorio Odontotecnico · dal 1998
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.2)}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-dark leading-[1.15] tracking-tight text-balance">
            Qualità artigianale,<br />
            precisione digitale.
          </motion.h1>

          <motion.p {...fadeUp(0.3)}
            className="text-lg text-muted leading-relaxed">
            Corone, ponti, zirconia e full arch. 26 anni di esperienza,
            tecnologia CAD/CAM e un team che risponde, non un call center.
          </motion.p>

          <motion.div className="flex flex-wrap gap-3 pt-2">
            <MotionLink
              to="/contattaci"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-effe-dark transition-colors"
            >
              Contattaci
              <ArrowRight size={15} />
            </MotionLink>
            <motion.button
              type="button"
              onClick={scrollToComeFunziona}
              {...fadeUp(0.4)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-muted-strong rounded-xl font-medium hover:bg-surface-muted border border-slate-300 transition-colors"
            >
              Scopri di più
            </motion.button>
          </motion.div>
        </div>

        {/* Right: mock sopra il team (overlap su tutti i breakpoint) */}
        <div className="relative z-0 order-1 lg:order-2 w-full max-lg:mx-auto max-lg:max-w-sm sm:max-lg:max-w-md lg:min-h-[36rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:absolute lg:bottom-0 lg:right-[-1.5rem] xl:right-[-2.5rem] lg:w-[34rem] xl:w-[38rem] lg:max-w-none z-0 pointer-events-none"
          >
            <img
              src={heroTeam}
              alt=""
              aria-hidden="true"
              className="w-full h-auto max-h-[min(58vh,30rem)] sm:max-h-[32rem] lg:max-h-none object-contain object-bottom select-none"
              draggable={false}
            />
          </motion.div>
          <div className="absolute bottom-6 right-0 sm:bottom-8 sm:right-2 lg:bottom-10 lg:right-8 z-10 w-full max-w-[17rem] sm:max-w-[19rem] pointer-events-auto">
            <MockUI />
          </div>
        </div>
        </div>
      </div>

      <div className="relative w-full mt-auto">
        <div className="site-container w-full pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`py-4 flex flex-col gap-1 ${i === stats.length - 1 ? 'md:items-end md:text-right' : ''}`}
              >
                <Counter target={s.value} suffix={s.suffix} />
                <p className="text-sm font-semibold text-primary-dark mt-1">{s.label}</p>
                <p className="text-xs text-muted">{s.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
