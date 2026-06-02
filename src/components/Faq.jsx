import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Come vi invio una scansione o un’impronta?',
    a: 'Puoi inviarci i file STL o le immagini direttamente via WhatsApp o email. Non serve installare alcun software né registrarsi a piattaforme esterne.',
  },
  {
    q: 'Quali sono i tempi di lavorazione?',
    a: 'Grazie al workflow digitale, la maggior parte delle lavorazioni richiede 1–2 giorni lavorativi. I tempi esatti vengono concordati al momento dell’ordine.',
  },
  {
    q: 'Lavorate solo con studi della vostra zona?',
    a: 'Collaboriamo con studi in tutto il Veneto e spediamo con corriere espresso tracciabile. La distanza non è un problema: comunicazione e consegne restano puntuali.',
  },
  {
    q: 'Che materiali utilizzate?',
    a: 'Zirconie Shofu, Biodynamic, Bredent, Whitepeaks e ZirkonZahn, ceramiche CZR/Noritake, Ivoclar e Reox, resine certificate per la stampa 3D medicale.',
  },
  {
    q: 'Offrite il mock-up diagnostico?',
    a: 'Sì. Realizziamo mock-up diagnostici che permettono al dentista di mostrare al paziente il risultato atteso prima di iniziare il trattamento.',
  },
  {
    q: 'Come richiedo un preventivo?',
    a: 'Scrivici a effe2snc@gmail.com o su WhatsApp con i dettagli del caso: ti rispondiamo con un preventivo chiaro, prezzi e tempi inclusi.',
  },
]

function FaqToggleIcon({ isOpen }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-logo-light text-primary">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-primary" aria-hidden>
        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <motion.g
          style={{ transformOrigin: '12px 12px', transformBox: 'fill-box' }}
          initial={false}
          animate={{ scaleY: isOpen ? 0 : 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>
      </svg>
    </span>
  )
}

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 pl-6 pr-8 text-left"
      >
        <span className="min-w-0 flex-1 pr-8 font-semibold text-primary-dark sm:pr-10">{q}</span>
        <FaqToggleIcon isOpen={isOpen} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-5 pl-6 pr-10 text-sm leading-relaxed text-muted sm:pr-14">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="py-28 bg-white">
      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="section-label">
            FAQ
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-primary-dark"
          >
            Domande frequenti
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted max-w-lg mx-auto text-sm"
          >
            Le risposte alle domande che ci vengono poste più spesso.<br className="hidden sm:block" /> Non trovi quella che cerchi? Scrivici, ti rispondiamo noi.
          </motion.p>
        </div>

        <div className="mx-auto max-w-4xl space-y-3">
          {faqs.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
