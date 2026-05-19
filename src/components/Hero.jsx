import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

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
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-3 text-xs text-slate-400 font-mono">portale.effe2.it</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <span className="px-3 py-1 text-xs bg-slate-900 text-white rounded-md font-medium">Produzione</span>
          <span className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-md">Corona</span>
          <span className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-md">Zirconia</span>
        </div>
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 space-y-2">
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
            <span className="text-green-600 text-xs">📄</span>
            <span className="text-xs text-slate-700 font-medium">corona_superiore.stl</span>
          </div>
          <div className="flex items-center justify-center gap-1 py-2">
            <span className="text-xs text-slate-400">Trascina altri file qui</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Avanzamento</span>
            <span className="font-medium text-slate-900">5 di 7</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-lime-400 rounded-full"
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

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center pt-16 overflow-hidden bg-white">
      {/* Geometric background — diagonal grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-green-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-lime-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <div className="space-y-7">
          <motion.div {...fadeUp(0.1)}>
            <span className="inline-block px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full uppercase tracking-wider">
              Laboratorio Odontotecnico · dal 1998
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.2)}
            className="text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
            Qualità artigianale,<br />
            precisione digitale.
          </motion.h1>

          <motion.p {...fadeUp(0.3)}
            className="text-lg text-slate-500 leading-relaxed">
            Corone, ponti, zirconia e full arch. EFFE2 unisce 26 anni di esperienza
            con tecnologia CAD/CAM avanzata e stampa 3D, a Ponte nelle Alpi.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 pt-2">
            <a href="mailto:effe2snc@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors">
              Contattaci
              <ArrowRight size={15} />
            </a>
            <a href="#laboratorio"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-slate-700 rounded-xl font-medium hover:bg-slate-50 border border-slate-300 transition-colors">
              I nostri lavori
            </a>
          </motion.div>

          {/* Founded tag */}
          <motion.div {...fadeUp(0.5)} className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-slate-400">Viale Cadore 56/G, Ponte nelle Alpi (BL)</span>
            </div>
          </motion.div>
        </div>

        {/* Right: mock UI */}
        <div className="flex justify-center md:justify-end">
          <MockUI />
        </div>
      </div>
    </section>
  )
}
