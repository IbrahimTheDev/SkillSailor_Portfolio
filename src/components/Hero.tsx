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
        <span className="text-[20vw] md:text-[18vw] font-bold tracking-[0.1em] text-white/[0.02] whitespace-nowrap select-none">
          SKILLSAILOR
        </span>
      </div>

      {/* Light beam glow effect on left */}
      <div className="absolute top-0 left-0 w-[300px] md:w-[600px] h-[500px] md:h-[800px] pointer-events-none">
        <div className="absolute top-0 left-0 w-[200px] md:w-[400px] h-[400px] md:h-[600px] bg-gradient-to-br from-blue-500/40 via-indigo-500/20 to-transparent blur-[80px] md:blur-[120px] transform -rotate-12 -translate-x-10 md:-translate-x-20" />
        <div className="absolute top-10 left-0 w-[80px] md:w-[150px] h-[300px] md:h-[500px] bg-gradient-to-b from-cyan-400/50 via-blue-500/30 to-transparent blur-[50px] md:blur-[80px] transform -rotate-[20deg]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col pt-20">
        {/* Center content area */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="relative">
              {/* Particle Sphere - Centered */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]">
                  <ParticleSphere />
                </div>
              </div>

              {/* Text content - overlaying sphere */}
              <div className="relative z-10 py-24 sm:py-28 md:py-32 lg:py-40 text-center">
                {/* Main headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.2] mb-8 sm:mb-12 md:mb-16"
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
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pb-6 sm:pb-8 md:pb-10">
          <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
            {/* Left - Description and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-md"
            >
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                We empower organizations with AI that turns complex challenges 
                into real-world outcomes.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-medium rounded-full transition-all duration-300"
              >
                Start Your Project
              </a>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-end gap-6 sm:gap-8 lg:gap-12 overflow-x-auto pb-2"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-baseline gap-1.5 sm:gap-2 flex-shrink-0">
                  <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
                    {stat.value}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider leading-tight">
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
