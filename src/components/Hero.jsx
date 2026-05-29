import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

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

function MockUI() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 overflow-hidden"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-slate-50">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-effe-medium" />
        <span className="ml-3 text-xs text-slate-400 font-mono">portale.effe2.it</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <span className="px-3 py-1 text-xs bg-primary-dark text-white rounded-md font-medium">Produzione</span>
          <span className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-md">Corona</span>
          <span className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-md">Zirconia</span>
        </div>
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 space-y-2">
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
            <span className="text-primary text-xs">📄</span>
            <span className="text-xs text-slate-700 font-medium">corona_superiore.stl</span>
          </div>
          <div className="flex items-center justify-center gap-1 py-2">
            <span className="text-xs text-slate-400">Trascina altri file qui</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
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
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-logo-light rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

      <div className="relative flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
        {/* Left: text */}
        <div className="space-y-7">
          <motion.div {...fadeUp(0.1)}>
            <span className="inline-block px-3 py-1.5 bg-logo-light text-effe-dark text-xs font-semibold rounded-full uppercase tracking-wider">
              Laboratorio Odontotecnico · dal 1998
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.2)}
            className="text-4xl lg:text-5xl font-bold text-primary-dark leading-[1.15] tracking-tight">
            Qualità artigianale,<br />
            precisione digitale.
          </motion.h1>

          <motion.p {...fadeUp(0.3)}
            className="text-lg text-slate-500 leading-relaxed">
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
            <MotionLink
              to="/chi-siamo"
              {...fadeUp(0.4)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-slate-700 rounded-xl font-medium hover:bg-slate-50 border border-slate-300 transition-colors"
            >
              Scopri di più
            </MotionLink>
          </motion.div>
        </div>

        {/* Right: mock UI */}
        <div className="flex justify-center md:justify-end">
          <MockUI />
        </div>
        </div>
      </div>

      <div className="relative w-full mt-auto">
        <div className="max-w-6xl mx-auto px-6 w-full pb-16">
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
                <p className="text-xs text-slate-500">{s.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
