import { motion } from 'framer-motion'
import { Heart, Gem, Clock, MessageCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { aboutImages } from '../data/siteImages'

const values = [
  { icon: Heart, title: 'Cura artigianale', desc: 'Ogni manufatto è seguito a mano, con l’attenzione di chi ama il proprio mestiere.' },
  { icon: Gem, title: 'Qualità costante', desc: 'Materiali certificati e controllo su ogni singolo lavoro, prima della spedizione.' },
  { icon: Clock, title: 'Tempi rispettati', desc: 'Workflow digitale e organizzazione precisa per consegnare quando promesso.' },
  { icon: MessageCircle, title: 'Comunicazione diretta', desc: 'Parli con chi lavora il tuo caso, non con un centralino.' },
]

const stats = [
  { value: '26', label: 'Anni di attività' },
  { value: '1998', label: 'Anno di fondazione' },
  { value: '6', label: 'Professionisti' },
  { value: '100%', label: 'Lavori controllati' },
]

export default function ChiSiamo() {
  return (
    <>
      <PageHeader
        badge="Chi siamo"
        title="Un laboratorio, non un fornitore"
        subtitle="Dal 1998 realizziamo protesi dentali a Ponte nelle Alpi, unendo tecnologia digitale e finitura artigianale. Dietro ogni lavoro c’è un team che risponde."
      />

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/3] rounded-3xl overflow-hidden"
          >
            <img
              src={aboutImages.story}
              alt="Interno del laboratorio EFFE2"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <h2 className="text-3xl font-bold text-primary-dark leading-tight">La nostra storia</h2>
            <p className="text-slate-500 leading-relaxed">
              EFFE2 nasce nel 1998 dalla passione per l’odontotecnica. In oltre vent’anni siamo cresciuti
              abbracciando il flusso digitale CAD/CAM, senza mai perdere il valore del lavoro fatto a mano.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Oggi serviamo studi dentistici in tutto il Veneto, con un approccio diretto: poche persone,
              molta competenza, e la convinzione che un buon laboratorio si riconosca dalla costanza.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-primary-dark">{s.value}</p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl font-bold text-primary-dark">In cosa crediamo</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm">I valori che guidano il nostro lavoro, ogni giorno.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-slate-200 p-6 bg-white"
                >
                  <div className="w-10 h-10 bg-logo-light rounded-xl flex items-center justify-center mb-4">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-primary-dark mb-1.5">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold text-primary-dark leading-tight">Vuoi conoscerci meglio?</h2>
              <p className="text-slate-500 leading-relaxed max-w-md mx-auto">Raccontaci di cosa hai bisogno: troviamo insieme la soluzione giusta.</p>
              <Link
                to="/contattaci"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-effe-dark transition-colors"
              >
                Contattaci
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 aspect-[5/2] rounded-3xl overflow-hidden"
          >
            <img
              src={aboutImages.cta}
              alt="Laboratorio EFFE2"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}
