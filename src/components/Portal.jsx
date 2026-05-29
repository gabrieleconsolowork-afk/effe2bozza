import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight } from 'lucide-react'

const bullets = [
  'Storico ordini completo',
  'Tracking in tempo reale',
  'Comunicazione diretta',
  'Upload file semplificato',
  'Fatturazione automatica',
  'Notifiche WhatsApp e email automatiche',
]

const orders = [
  { code: 'CAM-2026-0042', date: '28 feb', status: 'Confermato', color: 'bg-logo-light text-primary' },
  { code: 'CAM-2026-0041', date: '25 feb', status: 'In lavorazione', color: 'bg-logo-light text-effe-medium' },
  { code: 'CAM-2026-0040', date: '20 feb', status: 'Spedito', color: 'bg-logo-light text-effe-dark' },
  { code: 'CAM-2026-0039', date: '15 feb', status: 'Consegnato', color: 'bg-logo-light text-primary' },
]

export default function Portal() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full uppercase tracking-wider"
            >
              Il portale
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold text-primary-dark leading-tight"
            >
              Il portale EFFE2: in arrivo
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-slate-500 leading-relaxed"
            >
              Stiamo costruendo uno spazio digitale dove potrai gestire ordini, comunicare con il team e seguire ogni lavorazione in tempo reale. Per ora ci trovi su WhatsApp e email, stessa velocità, stesso team.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  {b}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: orders mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <span className="w-3 h-3 rounded-full bg-red-300" />
                <span className="w-3 h-3 rounded-full bg-yellow-300" />
                <span className="w-3 h-3 rounded-full bg-effe-medium" />
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-slate-700 mb-4">I tuoi ordini</p>
                <div className="divide-y divide-slate-100">
                  {orders.map((o, i) => (
                    <motion.div
                      key={o.code}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-slate-700">{o.code}</span>
                        <span className="text-xs text-slate-400">{o.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${o.color}`}>
                          {o.status}
                        </span>
                        <ChevronRight size={14} className="text-slate-300" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
