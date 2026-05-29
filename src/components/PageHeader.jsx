import { motion } from 'framer-motion'

export default function PageHeader({ badge, title, subtitle }) {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden bg-white">
      {/* Geometric background — diagonal grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#1d1d1b 1px, transparent 1px), linear-gradient(90deg, #1d1d1b 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-logo-light rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center space-y-5">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1.5 bg-logo-light text-effe-dark text-xs font-semibold rounded-full uppercase tracking-wider"
          >
            {badge}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-primary-dark leading-[1.15] tracking-tight text-balance"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
