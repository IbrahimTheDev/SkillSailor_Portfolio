import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { RevealOnScroll, SplitTextLine, MagneticButton } from './animations'

const testimonials = [
  {
    quote:
      'SkillSailor transformed our operations with AI agents that actually understand our business. The results were immediate and measurable.',
    name: 'Sarah Chen',
    role: 'CTO, Meridian Finance',
    company: 'Meridian',
  },
  {
    quote:
      'Their design sensibility is unmatched. They built us a platform that our clients actually love to use — and that is rare in enterprise software.',
    name: 'James Rodriguez',
    role: 'VP Product, OceanTrack',
    company: 'OceanTrack',
  },
  {
    quote:
      'From strategy to execution, the SkillSailor team operates at a level we have not seen from other agencies. Simply world-class.',
    name: 'Aisha Patel',
    role: 'CEO, NeuraCom',
    company: 'NeuraCom',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const next = () => {
    setDirection(1)
    setActive((prev) => (prev + 1) % testimonials.length)
  }
  const prev = () => {
    setDirection(-1)
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.02] rounded-full"
        />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-radial from-ocean/[0.04] to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <RevealOnScroll animation="fadeUp" className="mb-16 sm:mb-20">
          <div ref={ref}>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-ocean/60 block mb-4"
            >
              Testimonials
            </motion.span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-semibold tracking-tight text-off-white">
              <SplitTextLine>Words from Shore</SplitTextLine>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="relative max-w-5xl">
          {/* Large quote mark */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute -top-8 -left-4 text-ocean/[0.08] text-[200px] font-serif leading-none pointer-events-none select-none"
          >
            &ldquo;
          </motion.div>

          {/* Quote */}
          <div className="min-h-[280px] sm:min-h-[320px] relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4 },
                }}
                className="absolute inset-0"
              >
                <p className="text-xl sm:text-2xl lg:text-4xl font-sans font-light text-off-white leading-relaxed mb-12">
                  {testimonials[active].quote}
                </p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-5"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-ocean/20 to-ocean/5 border border-ocean/20 flex items-center justify-center"
                  >
                    <span className="font-mono text-sm text-ocean font-medium">
                      {testimonials[active].name.charAt(0)}
                    </span>
                  </motion.div>
                  <div>
                    <p className="text-base sm:text-lg font-medium text-off-white mb-1">
                      {testimonials[active].name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
                      {testimonials[active].role}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-14 flex items-center gap-5"
          >
            <MagneticButton
              onClick={prev}
              className="w-14 h-14 rounded-full border border-white/[0.08] flex items-center justify-center hover:border-ocean/40 hover:bg-ocean/5 transition-all duration-500 group"
            >
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate group-hover:text-ocean transition-colors"
                whileHover={{ x: -2 }}
              >
                <line x1="14" y1="9" x2="4" y2="9" />
                <polyline points="8,5 4,9 8,13" />
              </motion.svg>
            </MagneticButton>
            <MagneticButton
              onClick={next}
              className="w-14 h-14 rounded-full border border-white/[0.08] flex items-center justify-center hover:border-ocean/40 hover:bg-ocean/5 transition-all duration-500 group"
            >
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate group-hover:text-ocean transition-colors"
                whileHover={{ x: 2 }}
              >
                <line x1="4" y1="9" x2="14" y2="9" />
                <polyline points="10,5 14,9 10,13" />
              </motion.svg>
            </MagneticButton>

            {/* Progress dots */}
            <div className="ml-6 flex gap-3">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > active ? 1 : -1)
                    setActive(i)
                  }}
                  data-cursor="pointer"
                  whileHover={{ scale: 1.2 }}
                  className="relative"
                >
                  <div className={`h-1 rounded-full transition-all duration-500 ${
                    i === active
                      ? 'w-10 bg-ocean'
                      : 'w-5 bg-white/10 hover:bg-white/20'
                  }`} />
                  {i === active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-full bg-ocean/30 blur-md"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <span className="ml-auto font-mono text-[11px] text-slate/50 tabular-nums">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-ocean"
              >
                {String(active + 1).padStart(2, '0')}
              </motion.span>
              {' / '}
              {String(testimonials.length).padStart(2, '0')}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
