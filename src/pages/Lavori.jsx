import { motion } from 'framer-motion'
import { ImageIcon, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'

const works = [
  { title: 'Full arch in zirconia', cat: 'Protesi fissa' },
  { title: 'Corona singola anteriore', cat: 'Estetica' },
  { title: 'Ponte 3 elementi', cat: 'Protesi fissa' },
  { title: 'Provvisorio fresato', cat: 'Provvisori' },
  { title: 'Faccette in ceramica', cat: 'Estetica' },
  { title: 'Scheletrato combinato', cat: 'Protesi rimovibile' },
  { title: 'Toronto su impianti', cat: 'Implantologia' },
  { title: 'Intarsi e onlay', cat: 'Conservativa' },
  { title: 'Mock-up diagnostico', cat: 'Smile design' },
]

function PlaceholderImage() {
  return (
    <div className="aspect-[4/3] w-full bg-gradient-to-br from-logo-light to-logo-lime/30 flex items-center justify-center">
      <ImageIcon size={32} className="text-effe-dark/40" />
    </div>
  )
}

export default function Lavori() {
  return (
    <>
      <PageHeader
        badge="Portfolio"
        title="I nostri lavori"
        subtitle="Una selezione di manufatti realizzati nel nostro laboratorio. Le immagini sono dimostrative: stiamo preparando la galleria definitiva."
      />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white group"
              >
                <PlaceholderImage />
                <div className="p-5">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{w.cat}</span>
                  <h3 className="font-semibold text-primary-dark mt-1">{w.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="mailto:effe2snc@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-effe-dark transition-colors"
            >
              Richiedi un preventivo
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
