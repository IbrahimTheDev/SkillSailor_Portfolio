import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import CompanyPage from './pages/CompanyPage'
import ServicesPage from './pages/ServicesPage'
import AtomAIPage from './pages/AtomAIPage'
import ContactPage from './pages/ContactPage'

function AppContent() {
  useLenis()

  return (
    <>
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
