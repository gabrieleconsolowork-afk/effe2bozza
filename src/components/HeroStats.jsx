import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 26, suffix: '', label: 'Anni di', note: 'attività' },
  { value: 6, suffix: '+', label: 'Professionisti', note: 'nel team' },
  { value: 1998, suffix: '', label: 'Anno di', note: 'fondazione' },
  { value: 100, suffix: '%', label: 'Qualità', note: 'garantita' },
]

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className="tabular-nums leading-none">
      {count}
      {suffix}
    </span>
  )
}

export default function HeroStats() {
  return (
    <section className="bg-white pt-10 pb-16 sm:pt-12 sm:pb-20">
      <div className="site-container">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={[
                'flex min-w-0 items-center gap-2.5 sm:gap-3 lg:gap-4',
                'lg:justify-center lg:px-6 xl:px-8',
                i > 0 ? 'lg:border-l lg:border-border' : '',
              ].join(' ')}
            >
              <span className="shrink-0 text-4xl font-bold tracking-tight text-primary-dark sm:text-5xl lg:text-[2.75rem] xl:text-6xl">
                <Counter target={s.value} suffix={s.suffix} />
              </span>

              <div className="flex min-w-0 flex-col leading-tight">
                <span className="text-xs font-medium text-primary-dark sm:text-sm">{s.label}</span>
                <span className="text-xs font-medium text-muted sm:text-sm">{s.note}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
