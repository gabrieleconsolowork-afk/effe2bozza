import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Truck, Award } from 'lucide-react'
import { aboutImages, portfolioImages } from '../data/siteImages'

const cards = [
  {
    icon: Phone,
    title: 'Contatto diretto',
    desc: 'WhatsApp, email o telefono. Rispondiamo noi, non un bot: parli subito con chi segue il tuo ordine.',
    image: aboutImages.team['Davide Fuso'],
    alt: 'Team EFFE2 al telefono',
  },
  {
    icon: Truck,
    title: 'Consegna rapida',
    desc: 'Workflow digitale dalla scansione alla spedizione. La maggior parte delle lavorazioni in 1–3 giorni lavorativi dalla spedizione.',
    image: aboutImages.cta,
    alt: 'Produzione in laboratorio',
  },
  {
    icon: Award,
    title: 'Qualità garantita',
    desc: 'Ogni manufatto è controllato prima della spedizione. Standard elevati su corone, ponti e full arch.',
    image: portfolioImages['Corona singola anteriore'],
    alt: 'Corona singola anteriore',
  },
]


const MotionArticle = motion.create('article')

function ArticleReveal({ index, children, ...props }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <MotionArticle
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionArticle>
  )
}

const ACCORDION_MQ = '(min-width: 1440px)'

export default function Features() {
  const [active, setActive] = useState(0)
  const [accordion, setAccordion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(ACCORDION_MQ)
    const update = () => setAccordion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <section id="servizi" className="py-28 bg-white">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="section-label">
              Perché scegliere EFFE2
            </span>
            <h2 className="text-4xl font-bold text-primary-dark leading-tight">
              Tutto ciò che serve,<br className="hidden sm:block" /> in un unico posto
            </h2>
          </div>
          <p className="text-muted max-w-xs text-sm leading-relaxed md:text-right">
            Un laboratorio che risponde, consegna nei tempi e sa fare il suo lavoro. Sembra poco, eppure non è così comune.
          </p>
        </div>

        {/* mobile: colonna · md–1439px: 3 card uguali, img in basso · ≥1440px: accordion */}
        <div
          className={[
            'grid grid-cols-1 gap-4 md:grid-cols-3',
            'max-[1439px]:[&_article]:!transition-none',
            'min-[1440px]:flex min-[1440px]:min-h-[22rem] min-[1440px]:flex-row min-[1440px]:items-stretch',
          ].join(' ')}
          onMouseLeave={accordion ? () => setActive(0) : undefined}
        >
          {cards.map((card, i) => {
            const Icon = card.icon
            const isActive = accordion && active === i

            return (
              <ArticleReveal
                key={card.title}
                index={i}
                onMouseEnter={accordion ? () => setActive(i) : undefined}
                onFocus={accordion ? () => setActive(i) : undefined}
                tabIndex={accordion ? 0 : undefined}
                className={[
                  'relative flex h-full flex-col overflow-hidden border border-border bg-white outline-none',
                  '[--feature-img-r:0.5rem] [--feature-img-gap:1rem]',
                  'rounded-[calc(var(--feature-img-r)+var(--feature-img-gap))]',
                  'min-[1440px]:[--feature-img-gap:1.5rem]',
                  'w-full max-md:min-h-0 md:max-[1439px]:min-h-[28rem]',
                  'min-[1440px]:min-h-[22rem] min-[1440px]:min-w-80',
                  'min-[1440px]:transition-[flex-grow] min-[1440px]:duration-700 min-[1440px]:ease-[cubic-bezier(0.33,0.86,0.55,1)]',
                  'min-[1440px]:focus-visible:ring-2 min-[1440px]:focus-visible:ring-primary/30',
                  isActive ? 'min-[1440px]:flex-[2.25]' : 'min-[1440px]:flex-1',
                ].join(' ')}
              >
                <div
                  className={[
                    'relative z-10 flex w-full flex-col p-6 md:p-8',
                    'max-[1439px]:min-h-0 max-[1439px]:flex-1',
                    'min-[1440px]:h-full min-[1440px]:w-80 min-[1440px]:max-w-80 min-[1440px]:flex-none min-[1440px]:justify-between',
                  ].join(' ')}
                >
                  <div className="w-9 h-9 rounded-lg bg-logo-lime flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-primary-dark" strokeWidth={2.25} />
                  </div>
                  <div className="mt-auto pt-4 min-[1440px]:pt-6">
                    <h3 className="font-bold text-primary-dark text-lg md:text-xl mb-2">{card.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{card.desc}</p>
                  </div>
                </div>

                <div
                  className={[
                    'shrink-0 pt-0',
                    'px-[var(--feature-img-gap)] pb-[var(--feature-img-gap)]',
                    'md:max-[1439px]:h-52',
                    'min-[1440px]:absolute min-[1440px]:top-0 min-[1440px]:bottom-0 min-[1440px]:left-[21.5rem] min-[1440px]:right-0 min-[1440px]:h-full min-[1440px]:pl-0',
                    'min-[1440px]:py-[var(--feature-img-gap)] min-[1440px]:pr-[var(--feature-img-gap)]',
                    'min-[1440px]:transition-opacity min-[1440px]:duration-700 min-[1440px]:ease-[cubic-bezier(0.33,0.86,0.55,1)]',
                    isActive
                      ? 'min-[1440px]:opacity-100'
                      : 'min-[1440px]:opacity-0 min-[1440px]:pointer-events-none',
                  ].join(' ')}
                  aria-hidden={accordion && !isActive}
                >
                  <div
                    className={[
                      'overflow-hidden rounded-[var(--feature-img-r)]',
                      'max-md:aspect-video max-md:w-full',
                      'md:max-[1439px]:h-full',
                      'min-[1440px]:h-full',
                    ].join(' ')}
                  >
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </ArticleReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
