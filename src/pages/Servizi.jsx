import { motion } from 'framer-motion'
import { Crown, Layers, Sparkles, Wrench, ScanFace, Stethoscope, ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Laboratory from '../components/Laboratory'
import { aboutImages } from '../data/siteImages'

const services = [
  {
    icon: Crown,
    title: 'Corone e ponti in zirconia',
    desc: 'Protesi fissa monolitica o stratificata, progettata in CAD e fresata a 5 assi partendo dalla tua scansione intraorale o dal modello digitalizzato. Scegliamo la zirconia in base al caso: alta traslucenza per i settori estetici, alta resistenza per i posteriori e i ponti estesi.',
    points: [
      'Zirconie Shofu, Biodynamic, Bredent, Whitepeaks e ZirkonZahn',
      'Monolitica, micro-stratificata o full estetica',
      'Adattamento marginale verificato digitalmente',
    ],
  },
  {
    icon: Layers,
    title: 'Full arch e protesi su impianti',
    desc: 'Riabilitazioni complete avvitate (tipo Toronto) e protesi su impianti progettate e realizzate interamente in laboratorio. Gestiamo l’intero flusso, dalla barra fresata alla finitura estetica, con verifica della passività e dell’occlusione.',
    points: [
      'Strutture in zirconia o titanio fresate in house',
      'Avvitate o cementate, secondo il piano protesico',
      'Compatibili con le principali connessioni implantari',
    ],
  },
  {
    icon: Sparkles,
    title: 'Estetica e faccette',
    desc: 'Faccette in ceramica e restauri estetici realizzati con microstratificazione e colorazioni dedicate, per integrare il manufatto con i denti naturali. Lavoriamo su forma, texture e cromia partendo dalle foto e dalle indicazioni dello studio.',
    points: [
      'Ceramiche CZR/Noritake, Ivoclar e Reox alta resistenza',
      'Microstratificazione e caratterizzazioni Miyo',
      'Colorazioni Shofu Super Colors',
    ],
  },
  {
    icon: Wrench,
    title: 'Provvisori fresati',
    desc: 'Provvisori a lunga durata fresati dal pieno e rifiniti esclusivamente a mano. Una superficie lucidata correttamente riduce l’accumulo di placca e permette di validare estetica e funzione prima del definitivo.',
    points: [
      'Fresati dal disco, non stampati',
      'Lucidatura a mano, senza lacche',
      'Ideali come guida per il restauro definitivo',
    ],
  },
  {
    icon: ScanFace,
    title: 'Mock-up diagnostico',
    desc: 'Progettazione digitale del sorriso che permette al dentista di mostrare al paziente il risultato atteso prima di iniziare. Consegniamo il mock-up da provare in bocca e le immagini del confronto prima/dopo per facilitare l’accettazione del piano di cura.',
    points: [
      'Wax-up digitale e mock-up da provare in studio',
      'Confronto prima/dopo per il paziente',
      'Base condivisa per pianificare il trattamento',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Chirurgia guidata',
    desc: 'Pianificazione implantare e dime chirurgiche realizzate in collaborazione con lo studio, a partire da CBCT e scansione. La dima guida il posizionamento dell’impianto in modo prevedibile, riducendo i tempi e gli imprevisti in sala.',
    points: [
      'Matching CBCT + scansione intraorale',
      'Dime a supporto dentale, mucoso o misto',
      'Provvisorio immediato quando indicato',
    ],
  },
]

export default function Servizi() {
  return (
    <>
      <PageHeader
        badge="Servizi"
        title="Cosa realizziamo"
        subtitle="Dalla protesi fissa al mock-up diagnostico: un laboratorio completo, con workflow digitale e finitura artigianale."
      />

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                  className="rounded-2xl border border-slate-200 p-7 bg-white flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-logo-light rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary-dark">{s.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{s.desc}</p>
                  <ul className="space-y-2 mt-auto">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <Check size={16} className="text-primary shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Laboratory header="centered" theme="light" sectionId={null} className="py-20 bg-white" />

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
              <h2 className="text-3xl font-bold text-primary-dark leading-tight">Hai un caso da realizzare?</h2>
              <p className="text-slate-500 leading-relaxed max-w-md mx-auto">Inviaci la scansione: ti rispondiamo con tempi<br className="hidden sm:block" /> e preventivo chiari.</p>
              <Link
                to="/contattaci"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-effe-dark transition-colors"
              >
                Richiedi un preventivo
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
