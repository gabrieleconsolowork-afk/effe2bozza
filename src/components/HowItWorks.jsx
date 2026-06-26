import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { aboutImages } from '../data/siteImages'
import imgCiContatti from '../assets/about/ci-contatti.png'
import imgTeamLavora from '../assets/about/team-lavora.png'

/**
 * Returns true when the element is in view OR has been scrolled past downward.
 * Returns false only when the element is below the viewport (not yet reached).
 */
function useScrollReveal(ref, threshold = 0.4) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        } else {
          // exit from top (rect.top < 0) = scrolled past going down → keep visible
          // exit from bottom (rect.top > 0) = scrolled back up → hide
          if (entry.boundingClientRect.top > 0) {
            setVisible(false)
          }
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])

  return visible
}

const steps = [
  {
    number: '01',
    title: 'Ci contatti',
    desc: 'Mandaci la scansione STL o le immagini via WhatsApp o email. Nessun software da installare, nessuna burocrazia.',
    image: imgCiContatti,
  },
  {
    number: '02',
    title: 'Il team lavora',
    desc: 'Davide e il team prendono in carico il tuo ordine. Comunichiamo direttamente — sai sempre a che punto siamo.',
    image: imgTeamLavora,
  },
  {
    number: '03',
    title: 'Ricevi il lavoro',
    desc: 'Lavorazione completata e spedita con corriere espresso tracciabile. Consegna nei tempi concordati, sempre.',
    image: aboutImages.cta,
  },
]

function StepCard({ step, index }) {
  const ref = useRef(null)
  const inView = useScrollReveal(ref, 0.4)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'overflow-hidden border border-border bg-white transition-shadow hover:shadow-sm',
        '[--feature-img-r:0.5rem] [--feature-img-gap:1rem]',
        'rounded-[calc(var(--feature-img-r)+var(--feature-img-gap))]',
        'flex flex-col max-md:min-h-0',
        'md:flex-row md:items-center md:gap-6 md:rounded-2xl md:p-5',
      ].join(' ')}
    >
      <div
        className={[
          'shrink-0 px-[var(--feature-img-gap)] pt-[var(--feature-img-gap)]',
          'md:w-44 md:p-0 lg:w-52',
        ].join(' ')}
      >
        <div className="aspect-video w-full overflow-hidden rounded-[var(--feature-img-r)] md:aspect-square md:h-44 md:w-44 lg:h-52 lg:w-52">
          <img
            src={step.image}
            alt={step.title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0 p-6 md:p-0">
        <span className="text-xs font-semibold text-muted tracking-widest uppercase">
          {step.number}
        </span>
        <h3 className="text-lg font-bold text-primary-dark mt-1 mb-2">
          {step.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section id="come-funziona" className="py-24 bg-white">
      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — sticky heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-40 space-y-5"
          >
            <span className="section-label">Come funziona</span>
            <h2 className="text-4xl font-bold text-primary-dark leading-tight">
              Tre passi,<br />zero complicazioni
            </h2>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Dal primo contatto alla consegna del lavoro finito.
              Semplice, veloce, trasparente.
            </p>
          </motion.div>

          {/* Right — stacked cards, each with its own inView ref */}
          <div className="flex flex-col gap-4 overflow-hidden">
            {steps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
