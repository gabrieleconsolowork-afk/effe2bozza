import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section id="contattaci" className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl lg:text-5xl font-bold text-primary-dark leading-tight text-balance"
        >
          Pronto a collaborare con noi?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-slate-500 text-lg max-w-xl mx-auto space-y-3"
        >
          <span className="block font-semibold text-slate-700">
            Sei un dentista o un collega odontotecnico?
          </span>
          Ci occupiamo di entrambi. Con la stessa cura, gli stessi tempi, lo stesso team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            to="/contattaci"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-effe-dark transition-colors"
          >
            Scrivici e parliamo
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
