import { motion } from 'framer-motion'
import { MapPin, Clock, ArrowRight, Heart, GraduationCap, Users } from 'lucide-react'
import PageHeader from '../components/PageHeader'

const positions = [
  {
    role: 'Odontotecnico CAD/CAM',
    type: 'Full-time',
    place: 'Ponte nelle Alpi (BL)',
    desc: 'Cerchiamo un odontotecnico con esperienza in progettazione e fresatura digitale per ampliare il team.',
  },
  {
    role: 'Ceramista',
    type: 'Full-time',
    place: 'Ponte nelle Alpi (BL)',
    desc: 'Stratificazione e ceramizzazione di manufatti estetici. Precisione e cura del dettaglio fondamentali.',
  },
  {
    role: 'Tirocinio / Stage',
    type: 'Tirocinio',
    place: 'Ponte nelle Alpi (BL)',
    desc: 'Percorso formativo in laboratorio per neodiplomati odontotecnici motivati a crescere.',
  },
]

const perks = [
  { icon: GraduationCap, title: 'Formazione continua', desc: 'Corsi e aggiornamento su tecnologie e materiali.' },
  { icon: Heart, title: 'Ambiente sereno', desc: 'Team piccolo, comunicazione diretta, niente burocrazia.' },
  { icon: Users, title: 'Lavoro di squadra', desc: 'Ogni manufatto è il risultato del contributo di tutti.' },
]

export default function Carriere() {
  return (
    <>
      <PageHeader
        badge="Carriere"
        title="Lavora con noi"
        subtitle="Siamo un laboratorio che cresce. Se ami il tuo mestiere e cerchi un posto dove farlo bene, parliamone."
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {perks.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center space-y-3"
                >
                  <div className="w-12 h-12 mx-auto bg-logo-light rounded-2xl flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-primary-dark">{p.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              )
            })}
          </div>

          <h2 className="text-2xl font-bold text-primary-dark mb-6">Posizioni aperte</h2>
          <div className="space-y-4">
            {positions.map((pos, i) => (
              <motion.div
                key={pos.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-slate-200 p-6 bg-white flex flex-col md:flex-row md:items-center gap-4 md:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-primary-dark mb-2">{pos.role}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3 max-w-xl">{pos.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1"><Clock size={13} /> {pos.type}</span>
                    <span className="inline-flex items-center gap-1"><MapPin size={13} /> {pos.place}</span>
                  </div>
                </div>
                <a
                  href="mailto:effe2snc@gmail.com?subject=Candidatura"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-medium hover:bg-effe-dark transition-colors shrink-0"
                >
                  Candidati
                  <ArrowRight size={15} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
