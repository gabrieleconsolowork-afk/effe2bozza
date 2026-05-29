import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/#home' },
  { label: 'Chi siamo', to: '/chi-siamo' },
  { label: 'Servizi', to: '/servizi' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-100' : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/#home" className="flex items-center gap-2.5 font-bold text-lg text-primary-dark">
          <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-black">E2</span>
          <span>EFFE2</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.label} to={l.to}
              className="px-3 py-1.5 text-sm text-slate-600 hover:text-primary rounded-md hover:bg-logo-light/40 transition-colors">
              {l.label}
            </Link>
          ))}
          <Link to="/contattaci"
            className="ml-3 px-4 py-2 text-sm bg-primary-dark text-white rounded-lg hover:bg-primary transition-colors font-medium">
            Contattaci
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-md hover:bg-slate-100"
          onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-primary-dark transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 bg-primary-dark transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-primary-dark transition-all ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link key={l.label} to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md">
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <Link to="/contattaci"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full py-2 text-center text-sm bg-primary-dark text-white rounded-lg font-medium">
                  Contattaci
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
