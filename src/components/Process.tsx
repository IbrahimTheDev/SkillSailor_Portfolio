import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
      }}
      className="relative flex gap-8 sm:gap-12"
    >
      {/* Vertical line and dot */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
          className="w-3 h-3 rounded-full border border-ocean/50 bg-deep flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-ocean" />
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: index * 0.15 + 0.3,
            }}
            className="w-px bg-gradient-to-b from-ocean/30 to-ocean/5 flex-1"
          />
        )}
      </div>

      {/* Content */}
      <div className={`pb-16 sm:pb-20 ${isLast ? 'pb-0' : ''}`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ocean/50 block mb-3">
          Phase {step.number}
        </span>
        <h3 className="text-2xl sm:text-3xl font-sans font-medium text-off-white mb-3">
          {step.title}
        </h3>
        <p className="text-sm sm:text-base text-slate leading-relaxed max-w-md">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" className="relative py-32 sm:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ocean/60 block mb-4">
              How we work
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-off-white mb-6">
              Our Process
            </h2>
            <p className="text-base text-slate leading-relaxed max-w-md">
              Every voyage follows a proven course. Four phases that take you
              from uncertainty to launch with precision.
            </p>
          </motion.div>

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
