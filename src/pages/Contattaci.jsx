import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { siteConfig } from '../data/siteConfig'
import { submitContact } from '../api/admin'

const channels = [
  { icon: MessageCircle, title: 'WhatsApp', value: 'Scrivici un messaggio', href: siteConfig.whatsAppUrl },
  { icon: Mail, title: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, title: 'Telefono', value: siteConfig.phone, href: siteConfig.phoneTel },
]

export default function Contattaci() {
  const [form, setForm] = useState({ nome: '', email: '', messaggio: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSent(false)
    setSubmitting(true)
    try {
      await submitContact(form)
      setSent(true)
      setForm({ nome: '', email: '', messaggio: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        badge="Contatti"
        title="Parliamo del tuo prossimo lavoro"
        subtitle="Laboratorio odontotecnico a Ponte nelle Alpi (BL). Inviaci una scansione, chiedi un preventivo o contattaci per collaborare da Belluno e tutto il territorio nazionale."
      />

      <section className="py-20 bg-white">
        <div className="site-container">
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
                    className="flex items-center gap-4 rounded-2xl border border-border p-5 bg-white hover:border-logo-lime/60 transition-colors"
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
                className="rounded-2xl border border-border p-5 bg-surface-muted space-y-3"
              >
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted leading-relaxed">
                    {siteConfig.address.street}<br />
                    {siteConfig.address.postalCode} {siteConfig.address.locality} ({siteConfig.address.province})
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted leading-relaxed">
                    Lunedì – Venerdì<br />8:30 – 18:00
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: form + conferma invio */}
            <div className="space-y-4">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-3xl border border-border p-8 bg-white space-y-5"
              >
                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <div>
                <label className="block text-sm font-medium text-primary-dark mb-1.5">Nome</label>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  placeholder="Il tuo nome o studio"
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm text-primary-dark placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-logo-light transition-colors"
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
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm text-primary-dark placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-logo-light transition-colors"
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
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm text-primary-dark placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-logo-light transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex cursor-pointer items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-effe-dark transition-colors disabled:opacity-60"
              >
                {submitting ? 'Invio in corso…' : 'Invia messaggio'}
                <ArrowRight size={15} className="btn-arrow-icon" />
              </button>
              </motion.form>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3 rounded-2xl border border-logo-lime/50 bg-logo-light/40 px-5 py-4"
                  >
                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-primary-dark leading-relaxed">
                      Messaggio inviato. Ti risponderemo al più presto.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
