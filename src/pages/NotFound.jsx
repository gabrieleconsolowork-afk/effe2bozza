import { motion } from 'framer-motion'
import { ArrowRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center bg-white">
      <div className="site-container py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-widest text-primary mb-4"
        >
          Errore 404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl lg:text-5xl font-bold text-primary-dark leading-tight tracking-tight text-balance"
        >
          Pagina non trovata
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted text-lg leading-relaxed max-w-lg mx-auto mt-5"
        >
          Il link che hai seguito non esiste o non è più disponibile. Torna alla home o contattaci se hai bisogno di aiuto.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 min-h-[3.25rem] px-7 py-4 text-sm font-semibold rounded-full bg-primary text-white hover:bg-effe-dark transition-colors"
          >
            <Home size={16} />
            Torna alla home
          </Link>
          <Link
            to="/contattaci"
            className="inline-flex items-center gap-2 min-h-[3.25rem] px-7 py-4 text-sm font-medium rounded-full border border-border text-primary-dark hover:border-primary/30 transition-colors"
          >
            Contattaci
            <ArrowRight size={15} className="btn-arrow-icon" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
