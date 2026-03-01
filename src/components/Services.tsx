import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import ParticleSphere from './ParticleSphere'

const services = [
  {
    id: '01',
    title: 'Product Design',
    description: 'End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.',
    services: ['User Research & Strategy', 'UX Flows & Wireframes', 'UI Systems & Prototypes', 'Design Ops & Dev Handoff'],
    active: true,
  },
  {
    id: '02',
    title: 'Development',
    description: 'Full-stack engineering from cloud infrastructure to pixel-perfect frontends built for scale.',
    services: ['Frontend Development', 'Backend Systems', 'Cloud Infrastructure', 'API Development'],
    active: false,
  },
  {
    id: '03',
    title: 'AI Solutions',
    description: 'Custom AI agents and automation that transform complex challenges into advantages.',
    services: ['AI Agents', 'ML Models', 'Data Analytics', 'Automation'],
    active: false,
  },
  {
    id: '04',
    title: 'GTM Strategy',
    description: 'Go-to-market strategies that position your product for maximum impact.',
    services: ['Market Research', 'Brand Strategy', 'Launch Planning', 'Growth'],
    active: false,
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left - Particle Sphere */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="lg:col-span-4 relative h-[300px] sm:h-[400px] lg:h-[500px]"
          >
            <ParticleSphere />
          </motion.div>

          {/* Right - Services */}
          <div className="lg:col-span-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-normal text-white"
              >
                Our Services
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-gray-400 text-sm leading-relaxed max-w-xs"
              >
                We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.
              </motion.p>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setActiveIndex(index)}
                  className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 ${
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
