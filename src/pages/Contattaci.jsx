import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'

const channels = [
  { icon: MessageCircle, title: 'WhatsApp', value: 'Scrivici un messaggio', href: 'https://wa.me/390000000000' },
  { icon: Mail, title: 'Email', value: 'effe2snc@gmail.com', href: 'mailto:effe2snc@gmail.com' },
  { icon: Phone, title: 'Telefono', value: '+39 000 000 0000', href: 'tel:+390000000000' },
]

export default function Contattaci() {
  const [form, setForm] = useState({ nome: '', email: '', messaggio: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Richiesta da ${form.nome || 'sito EFFE2'}`)
    const body = encodeURIComponent(`${form.messaggio}\n\n${form.nome}\n${form.email}`)
    window.location.href = `mailto:effe2snc@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <>
      <PageHeader
        badge="Contatti"
        title="Parliamo del tuo prossimo lavoro"
        subtitle="Inviaci una scansione, chiedi un preventivo o semplicemente facci una domanda. Dall’altra parte ci siamo noi, non un sistema automatico."
      />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left: contact info */}
            <div className="space-y-4">
              {channels.map((c, i) => {
                const Icon = c.icon
                return (
                  <motion.a
                    key={c.title}
                    href={c.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 bg-white hover:border-logo-lime/60 transition-colors"
                  >
                    <div className="w-11 h-11 bg-logo-light rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={19} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider">{c.title}</p>
                      <p className="text-sm text-primary-dark font-medium">{c.value}</p>
                    </div>
                  </motion.a>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="rounded-2xl border border-slate-200 p-5 bg-slate-50 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Viale Cadore 56/G<br />32014 Ponte nelle Alpi (BL)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Lunedì – Venerdì<br />8:30 – 18:00
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border border-slate-200 p-8 bg-white space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-1.5">Nome</label>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  placeholder="Il tuo nome o studio"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary-dark placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-logo-light transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-1.5">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="nome@studio.it"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary-dark placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-logo-light transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-1.5">Messaggio</label>
                <textarea
                  name="messaggio"
                  value={form.messaggio}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Raccontaci di cosa hai bisogno…"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary-dark placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-logo-light transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-effe-dark transition-colors"
              >
                Invia messaggio
                <ArrowRight size={15} />
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  )
}
