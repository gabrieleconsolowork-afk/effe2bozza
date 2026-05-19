import { motion } from 'framer-motion'
import { MessageCircle, Bell, Mail } from 'lucide-react'

const cards = [
  {
    icon: MessageCircle,
    title: 'WhatsApp integrato',
    desc: 'Ricevi aggiornamenti sugli ordini direttamente su WhatsApp. Conferme, stati, avvisi — tutto nel tuo telefono.',
    color: 'bg-green-50',
    iconColor: 'text-green-700',
    border: 'border-green-100',
  },
  {
    icon: Bell,
    title: 'Notifiche in tempo reale',
    desc: 'Ogni cambio di stato genera una notifica immediata. In-app, email o WhatsApp — tu scegli.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-700',
    border: 'border-blue-100',
  },
  {
    icon: Mail,
    title: 'Email automatiche',
    desc: 'Riepiloghi e conferme via email per ogni ordine. Tutto documentato, sempre accessibile nella tua casella.',
    color: 'bg-slate-50',
    iconColor: 'text-slate-700',
    border: 'border-slate-100',
  },
]

export default function Communication() {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full uppercase tracking-wider">
            Sempre connesso
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-slate-900"
          >
            Comunicazione multicanale,<br className="hidden sm:block" /> zero interruzioni
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 max-w-lg mx-auto text-sm"
          >
            WhatsApp, email e notifiche in-app: scegli tu come restare aggiornato sullo stato dei tuoi ordini.
          </motion.p>
        </div>

        {/* Cards — no shadow, only border */}
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6 border border-slate-200 bg-white"
              >
                <div className={`w-9 h-9 ${c.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon size={18} className={c.iconColor} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{c.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
