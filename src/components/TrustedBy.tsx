import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const clients = [
  { name: "LOWE'S", style: "font-bold text-xl md:text-2xl tracking-tight" },
  { name: "Cognizant", style: "font-normal text-xl md:text-2xl" },
  { name: "Trimble", style: "font-semibold text-xl md:text-2xl" },
  { name: "e2open", style: "font-bold text-xl md:text-2xl" },
  { name: "TOYOTA", style: "font-bold text-lg md:text-xl tracking-widest" },
  { name: "OWASP", style: "font-bold text-lg md:text-xl" },
]

export default function TrustedBy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-[#0a0a0a]">
      {/* Earth arc glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] md:h-[400px] pointer-events-none overflow-hidden">
        <div 
          className="absolute bottom-[-200px] md:bottom-[-300px] left-1/2 -translate-x-1/2 w-[150%] md:w-[120%] aspect-square rounded-full"
          style={{
            background: 'linear-gradient(to top, rgba(79, 70, 229, 0.15) 0%, transparent 40%)',
            boxShadow: 'inset 0 0 100px rgba(79, 70, 229, 0.3)',
          }}
        />
        <div 
          className="absolute bottom-[-200px] md:bottom-[-300px] left-1/2 -translate-x-1/2 w-[150%] md:w-[120%] aspect-square rounded-full border-t-2 border-indigo-500/40"
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-normal text-white mb-4"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-400 text-sm"
          >
            Powering Innovation for Companies Worldwide
          </motion.p>
        </div>

        {/* Logos on curved path */}
        <div className="relative h-[150px] md:h-[200px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-end justify-between w-full max-w-4xl px-4">
              {clients.map((client, index) => {
                // Calculate arc offset - middle items are lower
                const middle = (clients.length - 1) / 2
                const distanceFromMiddle = Math.abs(index - middle)
                const arcOffset = Math.pow(distanceFromMiddle, 1.5) * 20

                return (
                  <motion.div
                    key={client.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                    style={{ transform: `translateY(${arcOffset}px)` }}
                  >
                    <span className={`${client.style} whitespace-nowrap`}>
                      {client.name}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
