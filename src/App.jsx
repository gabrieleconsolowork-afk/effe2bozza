import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Partners from './components/Partners'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Communication from './components/Communication'
import SmileDesign from './components/SmileDesign'
import Laboratory from './components/Laboratory'
import ForWho from './components/ForWho'
import Portal from './components/Portal'
import Privacy from './components/Privacy'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Partners />
        <HowItWorks />
        <Features />
        <Communication />
        <SmileDesign />
        <Laboratory />
        <ForWho />
        <Portal />
        <Privacy />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
