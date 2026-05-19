import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 26, suffix: '', label: 'Anni di attività', note: 'Fondati nel 1998' },
  { value: 6, suffix: '', label: 'Professionisti', note: 'Team dedicato' },
  { value: 1998, suffix: '', label: 'Anno di fondazione', note: 'Ponte nelle Alpi (BL)' },
  { value: 100, suffix: '%', label: 'Qualità garantita', note: 'Ogni singolo lavoro' },
]

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
    <span ref={ref} className="text-4xl font-bold text-white tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-16 bg-slate-950 flex flex-col justify-center items-center gap-[99px] h-[230px]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-slate-950 px-8 py-8 flex flex-col gap-1"
            >
              <Counter target={s.value} suffix={s.suffix} />
              <p className="text-sm font-semibold text-white mt-1">{s.label}</p>
              <p className="text-xs text-slate-500">{s.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
