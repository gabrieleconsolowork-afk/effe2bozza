import { motion } from 'framer-motion'
import { Monitor, Truck, Users, Eye, MessageCircle, MapPin, Shield, Award } from 'lucide-react'

const features = [
  { icon: Monitor, title: 'Da qualsiasi device', desc: 'Ordina dal computer, tablet o telefono. La piattaforma si adatta al tuo dispositivo.' },
  { icon: Truck, title: 'Consegna rapida', desc: 'Tempi di lavorazione ridotti grazie al workflow digitale. Lavorazione in 1–2 giorni lavorativi.' },
  { icon: Users, title: 'Odontotecnici esperti', desc: 'Un team qualificato e specializzato in protesi dentale CAD/CAM e full arch in zirconia.' },
  { icon: Eye, title: 'Tutto tracciabile', desc: 'Segui lo stato del tuo ordine in tempo reale, dalla conferma alla spedizione.' },
  { icon: MessageCircle, title: 'Supporto diretto', desc: 'Comunica direttamente con il team tramite il portale. Nessun call center, nessuna attesa.' },
  { icon: MapPin, title: 'Spedizione tracciabile', desc: 'Spedizione con corriere espresso e tracking in tempo reale. Consegna sicura e puntuale.' },
  { icon: Shield, title: 'Sicuro e conforme', desc: 'Conforme GDPR, dati su server europei. Nessun cookie di profilazione, massima trasparenza.' },
  { icon: Award, title: 'Qualità garantita', desc: 'Ogni manufatto è controllato prima della spedizione. Standard elevati su ogni singolo lavoro, sempre.' },
]

export default function Features() {
  return (
    <section id="servizi" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header — editorial style */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="space-y-3">
          <span className="inline-block px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full uppercase tracking-wider">
            Perché scegliere EFFE2
          </span>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">
              Tutto ciò che serve,<br className="hidden sm:block" /> in un unico posto
            </h2>
          </div>
          <p className="text-slate-500 max-w-xs text-sm leading-relaxed md:text-right">
            Dall'ordine alla consegna, ogni fase del lavoro è gestita con precisione e trasparenza.
          </p>
        </div>

        {/* 2-column list layout — NOT the 4-col card grid of Dentra */}
        <div className="grid sm:grid-cols-2 gap-0 border border-slate-200 rounded-2xl overflow-hidden">
          {features.map((f, i) => {
            const Icon = f.icon
            const isLastRow = i >= features.length - 2
            const isRightCol = i % 2 === 1
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={[
                  'flex items-start gap-4 p-6',
                  !isLastRow ? 'border-b border-slate-200' : '',
                  !isRightCol ? 'sm:border-r sm:border-slate-200' : '',
                  'hover:bg-slate-50 transition-colors',
                ].join(' ')}
              >
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={17} className="text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1 text-sm">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
