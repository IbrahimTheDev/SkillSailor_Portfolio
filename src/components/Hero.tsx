import { motion } from 'framer-motion'
import { useRef } from 'react'
import ParticleSphere from './ParticleSphere'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  const stats = [
    { value: '50+', label: ['Projects', 'Delivered'] },
    { value: '100%', label: ['Client', 'Satisfaction'] },
    { value: '24/7', label: ['Support', 'Available'] },
  ]

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Background watermark text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[18vw] font-bold tracking-[0.1em] text-white/[0.02] whitespace-nowrap select-none">
          SKILLSAILOR
        </span>
      </div>

      {/* Light beam glow effect on left */}
      <div className="absolute top-0 left-0 w-[600px] h-[800px] pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[600px] bg-gradient-to-br from-blue-500/40 via-indigo-500/20 to-transparent blur-[120px] transform -rotate-12 -translate-x-20" />
        <div className="absolute top-10 left-0 w-[150px] h-[500px] bg-gradient-to-b from-cyan-400/50 via-blue-500/30 to-transparent blur-[80px] transform -rotate-[20deg]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Center content area */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="relative">
              {/* Particle Sphere - Centered */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                  className="w-[500px] h-[500px] lg:w-[600px] lg:h-[600px]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <ParticleSphere />
                </motion.div>
              </div>

              {/* Text content - overlaying sphere */}
              <div className="relative z-10 py-32 lg:py-40 text-center">
                {/* Main headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.15] mb-16"
                >
                  <span className="text-white">Building </span>
                  <span className="text-indigo-400 italic font-light">Digital</span>
                  <br />
                  <span className="text-indigo-400 italic font-light">Solutions </span>
                  <span className="text-white">That Matter</span>
                </motion.h1>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Left - Description and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-md"
            >
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                We empower organizations with AI that turns complex challenges 
                into real-world outcomes.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-full transition-all duration-300"
              >
                Start Your Project
              </a>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-end gap-8 lg:gap-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-semibold text-white">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider leading-tight">
                    {stat.label.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
