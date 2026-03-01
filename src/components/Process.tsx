import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { RevealOnScroll, SplitTextLine } from './animations'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We dive deep into your business, understanding the currents of your industry and charting the challenges ahead.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'With a clear map, we plot the optimal route. Architecture, technology stack, and milestones are defined.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Our crew brings the vision to life. Iterative development with weekly check-ins keeps you in command.',
  },
  {
    number: '04',
    title: 'Launch & Scale',
    description:
      'We deploy, monitor, and optimize. Your digital vessel is built to handle any sea.',
  },
]

function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.9,
        ease: [0.19, 1, 0.22, 1],
        delay: index * 0.2,
      }}
      className="relative flex gap-8 sm:gap-12 group"
    >
      {/* Vertical line and dot */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.2 + 0.2,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="relative w-4 h-4 rounded-full border-2 border-ocean/50 bg-deep flex items-center justify-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.4 }}
            className="w-2 h-2 rounded-full bg-ocean"
          />
          {/* Pulse effect */}
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            className="absolute inset-0 rounded-full border border-ocean/30"
          />
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{
              duration: 1,
              ease: [0.19, 1, 0.22, 1],
              delay: index * 0.2 + 0.3,
            }}
            className="w-px bg-gradient-to-b from-ocean/40 via-ocean/20 to-transparent flex-1"
          />
        )}
      </div>

      {/* Content */}
      <div className={`pb-20 sm:pb-24 ${isLast ? 'pb-0' : ''}`}>
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.3 }}
          className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] text-ocean/60 mb-4 px-3 py-1 border border-ocean/20 rounded-full"
        >
          Phase {step.number}
        </motion.span>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-off-white mb-4 group-hover:text-ocean transition-colors duration-500">
          <SplitTextLine delay={index * 0.2 + 0.2}>{step.title}</SplitTextLine>
        </h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
          className="text-sm sm:text-base text-slate leading-relaxed max-w-md"
        >
          {step.description}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section ref={sectionRef} id="process" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Animated background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-radial from-ocean/[0.03] to-transparent rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-gradient-radial from-purple-500/[0.02] to-transparent rounded-full blur-[60px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: header */}
          <RevealOnScroll animation="fadeUp" className="lg:sticky lg:top-32 lg:self-start">
            <div ref={headerRef}>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-ocean/60 block mb-4"
              >
                How we work
              </motion.span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-semibold tracking-tight text-off-white mb-6">
                <SplitTextLine>Our Process</SplitTextLine>
              </h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-base sm:text-lg text-slate leading-relaxed max-w-md"
              >
                Every voyage follows a proven course. Four phases that take you
                from uncertainty to launch with precision.
              </motion.p>

              {/* Progress indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="mt-10 hidden lg:flex items-center gap-3"
              >
                {steps.map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-1 rounded-full bg-white/[0.06] overflow-hidden"
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '0%' }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
                      className="w-full h-full bg-ocean/50"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* Right: steps */}
          <div>
            {steps.map((step, i) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
