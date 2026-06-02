import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail } from 'lucide-react'

const cards = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    desc: 'Mandaci la scansione, fai una domanda, chiedi un aggiornamento. Direttamente su WhatsApp. Rispondiamo noi.',
    color: 'bg-logo-light',
    iconColor: 'text-effe-dark',
    border: 'border-logo-lime/40',
  },
  {
    icon: Phone,
    title: 'Al telefono',
    desc: 'Preferisci sentirci? Chiamaci e parli direttamente con chi segue il tuo ordine. Niente centralini, niente attese.',
    color: 'bg-logo-light/60',
    iconColor: 'text-primary',
    border: 'border-effe-medium/30',
  },
  {
    icon: Mail,
    title: 'Email chiare',
    desc: 'Preventivi, conferme e aggiornamenti via email, con prezzi e dettagli sempre espliciti. Tutto per iscritto.',
    color: 'bg-logo-light',
    iconColor: 'text-effe-medium',
    border: 'border-logo-lime/50',
  },
]

export default function Communication() {
  return (
    <section className="py-28 bg-white">
      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="section-label">
            Sempre connesso
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-primary-dark"
          >
            Comunicazione diretta, zero attese
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted max-w-lg mx-auto text-sm"
          >
            WhatsApp, email o telefono, scegli tu come preferisci.<br className="hidden sm:block" /> Dall'altra parte ci siamo noi, non un sistema automatico.
          </motion.p>
        </div>

        {/* Cards — no shadow, only border */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6 border border-border bg-white"
              >
                <div className={`w-9 h-9 ${c.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon size={18} className={c.iconColor} />
                </div>
                <h3 className="font-semibold text-primary-dark mb-2 text-sm">{c.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{c.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
