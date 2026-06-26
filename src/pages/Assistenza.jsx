import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { siteContact } from '../data/siteContact'

const channels = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    desc: 'Il modo più veloce per inviarci file e ricevere aggiornamenti.',
    action: 'Scrivici su WhatsApp',
    href: siteContact.whatsAppUrl,
  },
  {
    icon: Mail,
    title: 'Email',
    desc: 'Per preventivi, conferme e documentazione scritta.',
    action: 'effe2snc@gmail.com',
    href: 'mailto:effe2snc@gmail.com',
  },
  {
    icon: Phone,
    title: 'Telefono',
    desc: 'Parla direttamente con chi segue il tuo ordine.',
    action: siteContact.phoneDisplay,
    href: siteContact.phoneTel,
  },
]

export default function Assistenza() {
  return (
    <>
      <PageHeader
        badge="Centro assistenza"
        title="Siamo qui per aiutarti"
        subtitle="Hai bisogno di supporto su un ordine o vuoi maggiori informazioni? Scegli il canale che preferisci, dall’altra parte ci siamo noi."
      />

      <section className="py-20 bg-white">
        <div className="site-container">
          <div className="grid md:grid-cols-3 gap-6">
            {channels.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.a
                  key={c.title}
                  href={c.href}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group cursor-pointer rounded-2xl border border-border p-6 bg-white flex flex-col"
                >
                  <div className="w-10 h-10 bg-logo-light rounded-xl flex items-center justify-center mb-4">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-primary-dark mb-1">{c.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{c.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-auto">
                    {c.action}
                    <ArrowRight size={14} className="btn-arrow-icon" />
                  </span>
                </motion.a>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 rounded-2xl border border-border p-6 bg-surface-muted flex items-start gap-4"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-border shrink-0">
              <MapPin size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-dark mb-1">Dove siamo</h3>
              <p className="text-sm text-muted leading-relaxed">
                Viale Cadore 56/G, 32014 Ponte nelle Alpi (BL)<br />
                Lunedì – Venerdì, 8:30 – 18:00
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
