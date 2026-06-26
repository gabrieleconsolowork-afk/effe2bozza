import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScanFace, SlidersHorizontal, Download } from 'lucide-react'
import imgPrima from '../assets/smile-design/prima.png'
import imgDopo from '../assets/smile-design/dopo.png'

const smileFeatures = [
  {
    icon: ScanFace,
    title: 'Anteprima del risultato',
    desc: 'Il paziente vede il sorriso finale prima ancora di iniziare il trattamento.',
    color: 'bg-logo-light',
    iconColor: 'text-effe-dark',
  },
  {
    icon: SlidersHorizontal,
    title: 'Confronto prima/dopo',
    desc: 'Affianca la situazione iniziale al risultato atteso con lo slider interattivo.',
    color: 'bg-logo-light/60',
    iconColor: 'text-primary',
  },
  {
    icon: Download,
    title: 'Esporta e condividi',
    desc: 'Scarica immagini HD del confronto da mostrare o inviare al paziente.',
    color: 'bg-logo-light',
    iconColor: 'text-effe-medium',
  },
]

function SliderDemo() {
  const [pos, setPos] = useState(50)

  return (
    <div className="relative h-full w-full min-h-0 max-md:aspect-video rounded-2xl overflow-hidden bg-slate-900 select-none border border-border shadow-sm">
      {/* Dopo (full frame) */}
      <img
        src={imgDopo}
        alt="Dopo il trattamento"
        className="absolute inset-0 w-full h-full object-cover object-center scale-x-[-1]"
        draggable={false}
      />
      <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-xs font-semibold text-white rounded-full z-10">
        Dopo
      </span>

      {/* Prima (clipped left side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={imgPrima}
          alt="Prima del trattamento"
          className="absolute inset-0 w-full h-full object-cover object-center scale-x-[-1]"
          draggable={false}
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-xs font-semibold text-white rounded-full">
          Prima
        </span>
      </div>

      {/* Divider handle */}
      <div
        className="absolute inset-y-0 flex items-center justify-center z-10 pointer-events-none"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-0.5 h-full bg-white/90 shadow-sm" />
        <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center border border-border shadow-md">
          <span className="text-muted text-[10px] font-bold tracking-tighter">⟺</span>
        </div>
      </div>

      <input
        type="range"
        min={5}
        max={95}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Confronto prima e dopo"
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
    </div>
  )
}

export default function SmileDesign() {
  return (
    <section id="smile-design" className="py-28 bg-white">
      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1.5 bg-white border border-border text-muted text-xs font-semibold rounded-full uppercase tracking-wider"
          >
            Anteprima in tempo reale
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-primary-dark"
          >
            Mostra al paziente il risultato<br className="hidden sm:block" /> prima di iniziare
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-muted max-w-lg mx-auto"
          >
            Con il mock up diagnostico il dentista può presentare al paziente il risultato atteso, prima ancora di iniziare il trattamento.<br className="hidden sm:block" /> Un servizio che pochi laboratori offrono.
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 md:items-stretch">
          {/* Slider — stessa altezza della colonna card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex min-h-0 md:h-full"
          >
            <SliderDemo />
          </motion.div>

          {/* Feature list */}
          <div className="flex flex-col gap-4 md:h-full md:justify-between">
            {smileFeatures.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-[#DEE4ED] md:flex-1 md:min-h-0"
                >
                  <div className={`w-10 h-10 ${f.color} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={f.iconColor} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-1">{f.title}</h3>
                    <p className="text-sm text-muted">{f.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
