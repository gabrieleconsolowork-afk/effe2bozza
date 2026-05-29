import './index.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import ChiSiamo from './pages/ChiSiamo'
import Servizi from './pages/Servizi'
import Lavori from './pages/Lavori'
import Blog from './pages/Blog'
import Assistenza from './pages/Assistenza'
import Carriere from './pages/Carriere'
import Contattaci from './pages/Contattaci'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Condizioni from './pages/Condizioni'

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/lavori" element={<Lavori />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/assistenza" element={<Assistenza />} />
          <Route path="/carriere" element={<Carriere />} />
          <Route path="/contattaci" element={<Contattaci />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/condizioni" element={<Condizioni />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
