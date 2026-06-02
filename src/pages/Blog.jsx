import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { blogImages } from '../data/siteImages'

const posts = [
  {
    title: 'Zirconia monolitica vs stratificata: quando usarle',
    cat: 'Materiali',
    date: '12 mag 2026',
    excerpt: 'Estetica, resistenza e indicazioni cliniche a confronto per scegliere la soluzione migliore caso per caso.',
  },
  {
    title: 'Flusso digitale: dalla scansione alla consegna',
    cat: 'Workflow',
    date: '28 apr 2026',
    excerpt: 'Come un workflow CAD/CAM ben strutturato riduce i tempi e aumenta la precisione del manufatto.',
  },
  {
    title: 'Mock-up diagnostico: perché conviene al paziente',
    cat: 'Smile design',
    date: '15 apr 2026',
    excerpt: "Mostrare il risultato atteso prima del trattamento migliora la comunicazione e l'accettazione del piano.",
  },
  {
    title: 'Provvisori fresati e lucidati a mano',
    cat: 'Tecnica',
    date: '2 apr 2026',
    excerpt: "Il valore della finitura artigianale anche nell'era della produzione digitale.",
  },
  {
    title: 'Stampa 3D medicale: resine e certificazioni',
    cat: 'Materiali',
    date: '20 mar 2026',
    excerpt: 'Una panoramica sulle resine 385nm e 405nm certificate per la permanenza intraorale.',
  },
  {
    title: 'Chirurgia guidata: il ruolo del laboratorio',
    cat: 'Implantologia',
    date: '8 mar 2026',
    excerpt: 'Pianificazione e dime chirurgiche: come collaboriamo con lo studio per un risultato prevedibile.',
  },
]

export default function Blog() {
  return (
    <>
      <PageHeader
        badge="Blog"
        title="Approfondimenti dal laboratorio"
        subtitle="Tecnica, materiali e workflow digitale raccontati da chi lavora ogni giorno in laboratorio."
      />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white flex flex-col group"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={blogImages[p.title]}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className="font-semibold text-primary uppercase tracking-wider">{p.cat}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400">{p.date}</span>
                  </div>
                  <h3 className="font-semibold text-primary-dark mb-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{p.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-auto">
                    Leggi l'articolo
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
