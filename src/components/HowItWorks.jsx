import { motion } from 'framer-motion'
import { MessageCircle, Users, Truck } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: MessageCircle,
    title: 'Ci contatti',
    desc: 'Mandaci la scansione STL o le immagini direttamente via WhatsApp o email. Nessun software da installare, nessuna burocrazia.',
    color: 'bg-logo-light',
    iconColor: 'text-effe-dark',
    border: 'border-logo-lime/40',
  },
  {
    number: '2',
    icon: Users,
    title: 'Il team lavora',
    desc: 'Davide e il team prendono in carico il tuo ordine. Comunichiamo direttamente, sai sempre a che punto siamo.',
    color: 'bg-logo-light/60',
    iconColor: 'text-primary',
    border: 'border-effe-medium/30',
  },
  {
    number: '3',
    icon: Truck,
    title: 'Ricevi il lavoro',
    desc: 'Lavorazione completata e spedita con corriere espresso tracciabile. Consegna nei tempi concordati, sempre.',
    color: 'bg-logo-light',
    iconColor: 'text-effe-medium',
    border: 'border-logo-lime/50',
  },
]

// Animated order tracking card
function OrderCard() {
  const statuses = ['In attesa', 'Confermato', 'In lavorazione', 'Spedito', 'Consegnato']
  const active = 3
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden max-w-md mx-auto"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 border-b border-slate-100">
        <span className="w-3 h-3 rounded-full bg-red-300" />
        <span className="w-3 h-3 rounded-full bg-yellow-300" />
        <span className="w-3 h-3 rounded-full bg-effe-medium" />
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm font-semibold text-slate-700">CAM-2026-0042</span>
          <span className="px-2 py-0.5 bg-logo-light text-primary text-xs rounded-full font-medium border border-logo-lime/40">
            Spedito
          </span>
        </div>

        {/* Status stepper */}
        <div className="flex items-start gap-0">
          {statuses.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div className={`flex-1 h-0.5 ${i <= active ? 'bg-primary' : 'bg-slate-200'}`} />
                )}
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  i < active ? 'bg-primary border-primary' :
                  i === active ? 'bg-white border-primary ring-4 ring-logo-light' :
                  'bg-white border-slate-200'
                }`}>
                  {i < active && <span className="w-2 h-2 bg-white rounded-full" />}
                  {i === active && <span className="w-1.5 h-1.5 bg-primary rounded-full" />}
                </div>
                {i < statuses.length - 1 && (
                  <div className={`flex-1 h-0.5 ${i < active ? 'bg-primary' : 'bg-slate-200'}`} />
                )}
              </div>
              <span className={`text-[10px] text-center leading-tight ${i <= active ? 'text-primary font-medium' : 'text-slate-400'}`}>
                {s}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3 border border-slate-100">
          <div className="w-8 h-8 bg-logo-light rounded-lg flex items-center justify-center text-sm">🚚</div>
          <div>
            <p className="text-xs font-semibold text-slate-700">BRT Express</p>
            <p className="text-xs text-slate-400">Tracking: 1234567890</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section id="come-funziona" className="pt-56 pb-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full uppercase tracking-wider">
            Come funziona
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-primary-dark"
          >
            Tre passi, zero complicazioni
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 max-w-lg mx-auto text-sm"
          >
            Dal primo contatto alla consegna del lavoro finito.<br className="hidden sm:block" /> Semplice, veloce, trasparente.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="text-center space-y-4"
              >
                <div className="relative inline-block">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto border ${step.border}`}>
                    <Icon size={26} className={step.iconColor} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-logo-lime text-primary-dark text-xs font-bold rounded-md flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-primary-dark">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Order card */}
        <OrderCard />
      </div>
    </section>
  )
}
