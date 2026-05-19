import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight text-balance"
        >
          Pronto a collaborare con noi?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-slate-500 text-lg max-w-xl mx-auto"
        >
          Unisciti ai professionisti che hanno già scelto EFFE2. Registrazione gratuita, nessun vincolo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <motion.a
            href="mailto:effe2snc@gmail.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white rounded-2xl font-semibold text-lg hover:bg-green-800 transition-colors"
          >
            Contattaci ora
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-6 pt-2"
        >
          <a href="#" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Blog</a>
          <span className="text-slate-200">|</span>
          <a href="#" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">FAQ</a>
        </motion.div>
      </div>
    </section>
  )
}
