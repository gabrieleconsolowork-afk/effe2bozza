import './index.css'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import SmoothScroll from './components/SmoothScroll'
import Home from './pages/Home'
import ChiSiamo from './pages/ChiSiamo'
import Servizi from './pages/Servizi'
import Lavori from './pages/Lavori'
import Assistenza from './pages/Assistenza'
import Contattaci from './pages/Contattaci'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Condizioni from './pages/Condizioni'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import Seo from './components/Seo'
import { AnimatePresence, motion } from 'framer-motion'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 18,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(4px)',
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/lavori" element={<Lavori />} />
          <Route path="/assistenza" element={<Assistenza />} />
          <Route path="/contattaci" element={<Contattaci />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/condizioni" element={<Condizioni />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <>
        <Seo />
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-clip">
      <Seo />
      <SmoothScroll />
      <ScrollManager />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  )
}
