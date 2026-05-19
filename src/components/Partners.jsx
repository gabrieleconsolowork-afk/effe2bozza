import { motion } from 'framer-motion'

const partners = ['ZirkonZahn', 'Shofu', 'Ivoclar', 'Noritake', 'Bredent', 'Elegoo']

export default function Partners() {
  return (
    <section className="py-12 bg-slate-50 border-b border-slate-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Partner tecnologici</p>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-16 items-center pr-16 shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        >
          {[...partners, ...partners].map((p, i) => (
            <span key={i} className="text-slate-400 font-semibold text-lg whitespace-nowrap hover:text-slate-600 transition-colors cursor-default">
              {p}
            </span>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />
      </div>
    </section>
  )
}
