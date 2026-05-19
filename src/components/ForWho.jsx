import { motion } from 'framer-motion'
import { ArrowRight, Stethoscope, Star } from 'lucide-react'

const cards = [
  {
    tag: 'Per dentisti',
    icon: Stethoscope,
    title: 'Sei un dentista?',
    desc: 'Ordina lavorazioni in modo semplice e veloce, senza burocrazia. Tutto dal tuo telefono.',
    bullets: ['Ordine online in 5 minuti', 'Prezzi trasparenti e preventivo immediato', 'Tracking in tempo reale'],
    cta: 'Scopri di più',
    color: 'blue',
  },
  {
    tag: 'Smart Service',
    icon: Star,
    title: 'Servizio premium',
    desc: 'Consulenza in poltrona con il dentista e chirurgia guidata con implantologa dedicata.',
    bullets: ['Consulenza in poltrona', 'Chirurgia guidata', 'Implantologa dedicata'],
    cta: 'Scopri di più',
    color: 'indigo',
  },
]

export default function ForWho() {
  return (
    <section id="per-chi" className="py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full uppercase tracking-wider">
            Per chi è EFFE2
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-slate-900"
          >
            Una soluzione per tutti
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cards.map((card, i) => {
            const Icon = card.icon
            const isBlue = card.color === 'blue'
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`rounded-3xl p-8 border cursor-pointer transition-all ${
                  isBlue
                    ? 'bg-white border-slate-200 hover:border-green-300'
                    : 'bg-slate-900 border-slate-800 text-white'
                }`}
              >
                <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full mb-6 ${
                  isBlue ? 'bg-green-50 text-green-700' : 'bg-white/10 text-white'
                }`}>
                  {card.tag}
                </span>

                <h3 className={`text-2xl font-bold mb-3 ${isBlue ? 'text-slate-900' : 'text-white'}`}>
                  {card.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 ${isBlue ? 'text-slate-500' : 'text-slate-300'}`}>
                  {card.desc}
                </p>

                <ul className="space-y-2 mb-8">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-green-600' : 'bg-slate-400'}`} />
                      <span className={isBlue ? 'text-slate-700' : 'text-slate-300'}>{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:effe2snc@gmail.com"
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                    isBlue ? 'text-green-700 hover:text-green-800' : 'text-white hover:text-slate-200'
                  }`}
                >
                  {card.cta}
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
