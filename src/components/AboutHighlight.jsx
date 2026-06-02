import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import Logo from './Logo'
import { aboutImages } from '../data/siteImages'

const teamAvatars = [
  { src: aboutImages.team['Davide Fuso'], alt: 'Team EFFE2' },
  { src: aboutImages.team['Team CAD/CAM'], alt: 'CAD/CAM' },
  { src: aboutImages.team['Team ceramica'], alt: 'Ceramica' },
]

const brandFadeGradient = 'bg-gradient-to-t from-[#c4d66e] to-[#c4d66e]/0'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function AboutHighlight() {
  return (
    <section className="py-28 bg-white">
      <div className="site-container">
        <div className="text-center max-w-5xl mx-auto mb-16">
          <div className="space-y-3">
            <motion.span
              {...fade(0)}
              className="section-label"
            >
              Chi siamo
            </motion.span>
            <motion.h2 {...fade(0.08)} className="text-4xl font-bold text-primary-dark leading-tight">
              Un laboratorio odontotecnico dedicato a realizzare soluzioni più precise e più affidabili
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Card principale */}
          <motion.div
            {...fade(0.12)}
            className="md:col-span-2 lg:col-span-5 lg:row-span-2 relative min-h-[22rem] rounded-3xl overflow-hidden border border-border"
          >
            <img
              src={aboutImages.story}
              alt="Laboratorio EFFE2"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <div
              className={`absolute inset-x-0 bottom-0 h-64 pointer-events-none ${brandFadeGradient}`}
              aria-hidden
            />

            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-10">
              <div className="inline-flex h-10 items-center rounded-full bg-white px-3 shadow-sm">
                <Logo header showText className="gap-2 [&_img]:h-7 [&_span]:text-xl" />
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-border shadow-sm">
                <BarChart3 size={18} className="text-primary-dark" strokeWidth={2.25} />
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 z-10">
              <div className="rounded-2xl bg-white p-5">
                <p className="text-4xl font-bold text-primary-dark tabular-nums">26+</p>
                <p className="text-sm text-muted leading-relaxed mt-1">
                  Anni di attività con competenza artigianale, CAD/CAM e finitura in laboratorio.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card centrale */}
          <motion.div
            {...fade(0.18)}
            className="md:col-span-2 lg:col-span-4 lg:row-span-2 rounded-3xl bg-surface-muted border border-border p-6 flex flex-col justify-between min-h-[16rem] lg:min-h-0"
          >
            <div>
              <p className="text-xs text-muted mb-2">Qualità su ogni lavoro</p>
              <p className="text-5xl font-bold text-primary-dark tabular-nums">100%</p>
            </div>
            <div className="space-y-4 mt-8">
              <div className="flex -space-x-2">
                {teamAvatars.map((a) => (
                  <img
                    key={a.alt}
                    src={a.src}
                    alt={a.alt}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                    loading="lazy"
                  />
                ))}
              </div>
              <p className="text-sm text-muted leading-relaxed">
                Ogni manufatto è controllato prima della spedizione. Collaborazioni durature con studi in tutto il Veneto.
              </p>
            </div>
          </motion.div>

          {/* Tempi di lavorazione */}
          <motion.div
            {...fade(0.22)}
            className="lg:col-span-3 rounded-3xl bg-logo-lime border border-logo-lime/50 p-6 flex flex-col justify-center min-h-[10rem]"
          >
            <p className="text-xs text-effe-dark font-medium mb-2">Tempi di lavorazione</p>
            <p className="text-4xl font-bold text-primary-dark tabular-nums">1–2</p>
            <p className="text-sm text-muted leading-relaxed mt-2">
              Giorni lavorativi medi grazie al workflow digitale, dalla scansione alla consegna.
            </p>
          </motion.div>

          {/* Comunicazione */}
          <motion.div
            {...fade(0.26)}
            className="lg:col-span-3 rounded-3xl bg-effe-dark p-6 flex flex-col justify-center min-h-[10rem]"
          >
            <p className="text-xs text-white/75 font-medium mb-2">Comunicazione</p>
            <p className="text-3xl font-bold text-white leading-tight">Diretta</p>
            <p className="text-sm text-white/85 leading-relaxed mt-2">
              Parli con il team che segue il tuo ordine: risposte chiare, senza intermediari.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
