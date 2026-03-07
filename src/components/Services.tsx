import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: '01',
    title: 'Product Design',
    description: 'End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.',
    services: ['User Research & Strategy', 'UX Flows & Wireframes', 'UI Systems & Prototypes', 'Design Ops & Dev Handoff'],
  },
  {
    id: '02',
    title: 'Development',
    description: 'Full-stack engineering from cloud infrastructure to pixel-perfect frontends built for scale.',
    services: ['Frontend Development', 'Backend Systems', 'Cloud Infrastructure', 'API Development'],
  },
  {
    id: '03',
    title: 'AI Solutions',
    description: 'Custom AI agents and automation that transform complex challenges into advantages.',
    services: ['AI Agents', 'ML Models', 'Data Analytics', 'Automation'],
  },
  {
    id: '04',
    title: 'GTM Strategy',
    description: 'Go-to-market strategies that position your product for maximum impact.',
    services: ['Market Research', 'Brand Strategy', 'Launch Planning', 'Growth'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * (services.length - 1)}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.min(
          services.length - 1,
          Math.floor(self.progress * services.length)
        )
        setActiveIndex(idx)
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Spacer for scroll-animated sphere */}
          <div className="hidden lg:block lg:col-span-4" />

          {/* Right - Services */}
          <div className="lg:col-span-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
              <h2 className="text-4xl md:text-5xl font-normal text-white">
                Our Services
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.
              </p>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className={`relative rounded-2xl overflow-hidden transition-colors duration-500 ${
                    activeIndex === index 
                      ? 'bg-indigo-600 sm:col-span-2 lg:col-span-2 row-span-2' 
                      : 'bg-[#12121a] hover:bg-[#16161f]'
                  }`}
                  style={{ minHeight: activeIndex === index ? '320px' : '180px' }}
                >
                  {/* Background particles for inactive cards */}
                  {activeIndex !== index && (
                    <div className="absolute bottom-0 right-0 w-24 h-24 opacity-30">
                      <div className="absolute inset-0 bg-gradient-radial from-indigo-500/20 to-transparent rounded-full" />
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/40 rounded-full"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                          }}
                          animate={{ opacity: [0.2, 0.6, 0.2] }}
                          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="relative z-10 p-5 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      {activeIndex !== index && (
                        <span className="text-2xl font-light text-gray-500">{service.id}</span>
                      )}
                      <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center ml-auto">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]">
                          <path d="M1 11L11 1M11 1H3M11 1V9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>

                    {activeIndex === index ? (
                      <>
                        <h3 className="text-xl font-medium text-white mb-3">{service.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-6">{service.description}</p>
                        
                        <div className="mt-auto grid grid-cols-2 gap-6">
                          <div>
                            <span className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Services</span>
                            <ul className="space-y-1">
                              {service.services.map((s, i) => (
                                <li key={i} className="text-white/80 text-xs">{s}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Tools</span>
                            <div className="flex flex-wrap gap-1.5">
                              {[1,2,3,4,5,6].map((_, i) => (
                                <div key={i} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                                  <div className="w-3 h-3 rounded bg-white/30" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="mt-auto">
                        <h3 className="text-lg font-medium text-white">{service.title}</h3>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
