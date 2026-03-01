import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ParticleSphere from '../components/ParticleSphere'

const services = [
  {
    id: '01',
    title: 'Product Design',
    description: 'End-to-end product design from research and UX flows to polished UI systems and developer-ready handoff.',
    features: [
      'User Research & Strategy',
      'UX Flows & Wireframes',
      'UI Systems & Prototypes',
      'Design Ops & Dev Handoff',
      'Design System Creation',
      'Usability Testing',
    ],
  },
  {
    id: '02',
    title: 'Development',
    description: 'Full-stack engineering from cloud infrastructure to pixel-perfect frontends built for scale and performance.',
    features: [
      'Frontend Development (React, Vue, Next.js)',
      'Backend Systems (Node.js, Python)',
      'Cloud Infrastructure (AWS, GCP)',
      'API Development & Integration',
      'Database Design & Optimization',
      'DevOps & CI/CD',
    ],
  },
  {
    id: '03',
    title: 'AI Solutions',
    description: 'Custom AI agents and automation that transform complex challenges into competitive advantages.',
    features: [
      'AI Agents & Chatbots',
      'Machine Learning Models',
      'Natural Language Processing',
      'Computer Vision Solutions',
      'Data Analytics & Insights',
      'Process Automation',
    ],
  },
  {
    id: '04',
    title: 'GTM Strategy',
    description: 'Go-to-market strategies that position your product for maximum impact and sustainable growth.',
    features: [
      'Market Research & Analysis',
      'Brand Strategy & Positioning',
      'Launch Planning & Execution',
      'Growth Marketing',
      'Content Strategy',
      'Performance Marketing',
    ],
  },
]

export default function ServicesPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-normal text-white mb-6">Our Services</h1>
            <p className="text-gray-400 text-lg max-w-xl">
              We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="h-[300px] lg:h-[400px]"
          >
            <ParticleSphere />
          </motion.div>
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-8 md:p-12 rounded-3xl bg-[#12121a] border border-white/5 hover:border-indigo-500/30 transition-all duration-500">
                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-1">
                    <span className="text-3xl font-light text-gray-600">{service.id}</span>
                  </div>
                  <div className="lg:col-span-4">
                    <h2 className="text-3xl text-white mb-4 group-hover:text-indigo-400 transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed">{service.description}</p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6">Ready to transform your digital presence?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white transition-colors"
          >
            <span>Start Your Project</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
