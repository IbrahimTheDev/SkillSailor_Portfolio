import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import CaseStudies from './components/CaseStudies'
import TrustedBy from './components/TrustedBy'
import Footer from './components/Footer'

function App() {
  useLenis()

  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0a]">
        <Hero />
        <Services />
        <CaseStudies />
        <TrustedBy />
      </main>
      <Footer />
    </>
  )
}

export default App
