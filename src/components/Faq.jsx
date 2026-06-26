import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

function ItemReveal({ index, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

import { faqs } from '../data/faqs'

function FaqToggleIcon({ isOpen }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-logo-light text-primary">
      <ChevronDown
        size={16}
        strokeWidth={2.5}
        className={`transition-transform duration-300 ease-[cubic-bezier(0.33,0.86,0.55,1)] ${isOpen ? 'rotate-180' : ''}`}
        aria-hidden
      />
    </span>
  )
}

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full cursor-pointer rounded-2xl border border-border bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
    >
      <div className="flex items-center justify-between gap-4 py-5 pl-6 pr-8">
        <span className="min-w-0 flex-1 pr-4 font-semibold text-primary-dark sm:pr-6">{q}</span>
        <FaqToggleIcon isOpen={isOpen} />
      </div>
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
    </button>
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
            <ItemReveal key={f.q} index={i}>
              <FaqItem
                q={f.q}
                a={f.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            </ItemReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
