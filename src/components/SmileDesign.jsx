import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScanFace, SlidersHorizontal, Download } from 'lucide-react'

const smileFeatures = [
  {
    icon: ScanFace,
    title: 'Anteprima del risultato',
    desc: 'Il paziente vede il sorriso finale prima ancora di iniziare il trattamento.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: SlidersHorizontal,
    title: 'Confronto prima/dopo',
    desc: 'Affianca la situazione iniziale al risultato atteso con lo slider interattivo.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Download,
    title: 'Esporta e condividi',
    desc: 'Scarica immagini HD del confronto da mostrare o inviare al paziente.',
    color: 'bg-slate-50',
    iconColor: 'text-slate-700',
  },
]

function SliderDemo() {
  const [pos, setPos] = useState(50)

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-200 select-none border border-slate-200">
      {/* After (right side) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-2xl">🦷</div>
          <p className="text-sm font-semibold text-green-700">Dopo il trattamento</p>
        </div>
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/80 backdrop-blur-sm text-xs font-semibold text-slate-700 rounded-full">Dopo</span>
      </div>

      {/* Before (left side, clipped) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-slate-300 rounded-full flex items-center justify-center text-2xl">😊</div>
          <p className="text-sm font-semibold text-slate-600">Prima del trattamento</p>
        </div>
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/80 backdrop-blur-sm text-xs font-semibold text-slate-700 rounded-full">Prima</span>
      </div>

      {/* Divider */}
      <div
        className="absolute inset-y-0 flex items-center justify-center z-10"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-0.5 h-full bg-white" />
        <div className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-ew-resize border border-slate-200">
          <span className="text-slate-500 text-xs font-bold">⟺</span>
        </div>
      </div>

      {/* Drag range input */}
      <input
        type="range"
        min={5} max={95}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
    </div>
  )
}

export default function SmileDesign() {
  return (
    <section id="smile-design" className="py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1.5 bg-white border border-slate-200 text-slate-500 text-xs font-semibold rounded-full uppercase tracking-wider"
          >
            Smile Design
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-slate-900"
          >
            Mostra al paziente il sorriso ideale
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-slate-500 max-w-lg mx-auto"
          >
            Affianca la situazione iniziale al risultato del trattamento. Trascina lo slider per confrontare il prima e il dopo.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SliderDemo />
          </motion.div>

          {/* Feature list */}
          <div className="space-y-4">
            {smileFeatures.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-[#DEE4ED]"
                >
                  <div className={`w-10 h-10 ${f.color} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={f.iconColor} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-slate-500">{f.desc}</p>
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
