import { motion } from 'framer-motion'
import { Drill, Printer, Gem, Hand, Wind, Home } from 'lucide-react'

const items = [
  {
    icon: Drill,
    title: 'Fresatura 5 assi',
    desc: 'ZirkonZahn M2 e M1, fresatura a secco e a umido. Zirconie Shofu, Biodynamic, Bredent, Whitepeaks e ZirkonZahn.',
    tag: '01',
  },
  {
    icon: Printer,
    title: 'Stampa 3D medicale',
    desc: 'Stampanti Elegoo, Cubic e Zangeza DKEM. Resine 385nm e 405nm certificate per permanenza intraorale.',
    tag: '02',
  },
  {
    icon: Gem,
    title: 'Ceramizzazione',
    desc: 'CZR / Noritake, Ivoclar, Reox alta resistenza, microstratificazione Miyo. Colorazioni Shofu Super Colors.',
    tag: '03',
  },
  {
    icon: Hand,
    title: 'Lucidatura a mano',
    desc: 'Provvisori fresati e lucidati esclusivamente a mano. Niente lacche, niente scorciatoie.',
    tag: '04',
  },
  {
    icon: Wind,
    title: 'Sabbiatura',
    desc: 'Ossido di alluminio a 50 e 25 micron per preparazione superfici e adesione ottimale.',
    tag: '05',
  },
  {
    icon: Home,
    title: 'Tutto in house',
    desc: 'Scanner S600, forni di sinterizzazione, post-processing completo. Dalla scansione alla consegna.',
    tag: '06',
  },
]

export default function Laboratory() {
  return (
    <section id="chi-siamo" className="py-28 bg-effe-darker text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1.5 bg-white/10 text-white/60 text-xs font-semibold rounded-full uppercase tracking-wider">
            Il laboratorio
          </span>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Attrezzature e competenze
            </h2>
          </div>
          <p className="text-white/60 max-w-xs text-sm leading-relaxed md:text-right">
            Workflow completamente digitale con finitura artigianale. Dalla fresatura alla ceramizzazione, tutto sotto lo stesso tetto.
          </p>
        </div>

        {/* Grid — dark cards, no shadow, border only */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white/10 rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                    <Icon size={17} className="text-lime-500" />
                  </div>
                  <span className="text-xs font-mono text-white/40">{item.tag}</span>
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
