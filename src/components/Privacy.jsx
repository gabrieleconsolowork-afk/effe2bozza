import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Server, Cookie, UserCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

function CardReveal({ index, className, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const items = [
  {
    icon: ShieldCheck,
    title: 'Conforme GDPR',
    desc: 'Trattamento dei dati secondo il Regolamento UE 2016/679. Basi giuridiche chiare, finalità definite, nessun dato superfluo.',
  },
  {
    icon: Server,
    title: 'Server in Europa',
    desc: 'I tuoi dati sono ospitati su infrastruttura europea. Nessun trasferimento extra-UE.',
  },
  {
    icon: Cookie,
    title: 'Solo cookie tecnici',
    desc: 'Nessun cookie di profilazione, nessun tracciamento. Solo ciò che serve al funzionamento del portale.',
  },
  {
    icon: UserCheck,
    title: 'I tuoi diritti',
    desc: 'Accesso, rettifica, cancellazione, portabilità: puoi esercitare tutti i tuoi diritti in qualsiasi momento.',
  },
]

export default function Privacy() {
  return (
    <section className="py-28 bg-white">
      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="section-label">
            Privacy e sicurezza
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-primary-dark"
          >
            I tuoi dati sono al sicuro
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted max-w-lg mx-auto text-sm"
          >
            Lavoriamo con informazioni sensibili e le trattiamo con la massima serietà. Conformità GDPR, trasparenza totale.
          </motion.p>
        </div>

        {/* Cards — no shadow, only border */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <CardReveal key={item.title} index={i} className="bg-surface-muted rounded-2xl p-6 border border-border">
                <div className="w-9 h-9 bg-logo-light rounded-lg flex items-center justify-center mb-4 border border-logo-lime/30">
                  <Icon size={17} className="text-primary" />
                </div>
                <h3 className="font-semibold text-primary-dark mb-1.5 text-sm">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </CardReveal>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link to="/privacy" className="text-sm text-muted hover:text-slate-800 font-medium transition-colors underline underline-offset-4">
            Leggi la privacy policy →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
