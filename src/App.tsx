import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import CompanyPage from './pages/CompanyPage'
import ServicesPage from './pages/ServicesPage'
import AtomAIPage from './pages/AtomAIPage'
import ContactPage from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    // Also refresh ScrollTrigger positions after route change
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }, [pathname])
  return null
}

function AppContent() {
  useLenis()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="bg-[#0a0a0a]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/atom-ai" element={<AtomAIPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
