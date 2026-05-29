import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

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

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold text-primary-dark">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-full bg-logo-light flex items-center justify-center text-primary">
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </span>
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
            <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">{a}</p>
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
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full uppercase tracking-wider">
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
            className="text-slate-500 max-w-lg mx-auto text-sm"
          >
            Le risposte alle domande che ci vengono poste più spesso.<br className="hidden sm:block" /> Non trovi quella che cerchi? Scrivici, ti rispondiamo noi.
          </motion.p>
        </div>

        <div className="space-y-3">
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
