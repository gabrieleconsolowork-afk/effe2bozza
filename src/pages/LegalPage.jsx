import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'

export default function LegalPage({ badge, title, subtitle, updated, sections }) {
  return (
    <>
      <PageHeader badge={badge} title={title} subtitle={subtitle} />

      <section className="py-20 bg-white">
        <div className="site-container">
          {updated && (
            <p className="text-xs text-slate-400 mb-10">Ultimo aggiornamento: {updated}</p>
          )}
          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={s.heading}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              >
                <h2 className="text-lg font-bold text-primary-dark mb-3">{s.heading}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="text-sm text-muted leading-relaxed mb-3">{p}</p>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted">
              Per qualsiasi richiesta scrivici a{' '}
              <a href="mailto:effe2snc@gmail.com" className="text-primary font-medium hover:text-effe-dark transition-colors">
                effe2snc@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
