import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const cards = [
  {
    tag: 'Per dentisti',
    title: 'Sei un dentista che cerca affidabilità?',
    desc: 'Consegne nei tempi, comunicazione diretta, qualità costante. Lavoriamo con studi di Padova, Vicenza, Verona, Venezia e Treviso.',
    cta: 'Contattaci',
    to: '/contattaci',
    color: 'blue',
  },
  {
    tag: 'Smart Service',
    title: 'Smart Service, siamo in poltrona con te',
    desc: 'Consulenza diagnostica con il paziente presente e pianificazione chirurgia guidata con implantologa dedicata. Il servizio che cambia il rapporto tra dentista e laboratorio.',
    cta: 'Scopri lo Smart Service',
    to: '/contattaci',
    color: 'indigo',
  },
]

export default function ForWho() {
  return (
    <section id="per-chi" className="py-28 bg-white">
      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="section-label">
            Per chi è EFFE2
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-primary-dark"
          >
            Per chi vuole un laboratorio,<br className="hidden sm:block" /> non un fornitore
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => {
            const isBlue = card.color === 'blue'
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`rounded-3xl p-8 border flex flex-col h-full ${
                  isBlue
                    ? 'bg-white border-border'
                    : 'bg-effe-darker-soft border-white/10 text-white hover:border-white/20 transition-colors'
                }`}
              >
                <span className={`self-start inline-block px-2.5 py-1 text-xs font-semibold rounded-full mb-6 ${
                  isBlue ? 'bg-logo-light text-primary' : 'bg-white/10 text-white/60'
                }`}>
                  {card.tag}
                </span>

                <h3
                  className={`text-2xl font-bold mb-3 ${
                    isBlue ? 'text-primary-dark' : 'text-white pr-10 sm:pr-14'
                  }`}
                >
                  {card.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isBlue ? 'text-muted' : 'text-white/60'}`}>
                  {card.desc}
                </p>

                <Link
                  to={card.to}
                  className={`inline-flex items-center gap-2 text-sm font-semibold mt-auto pt-8 transition-colors duration-300 ease-in-out ${
                    isBlue ? 'text-primary hover:text-effe-dark' : 'text-logo-lime hover:text-white'
                  }`}
                >
                  {card.cta}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
