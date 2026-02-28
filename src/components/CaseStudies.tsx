import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

const caseStudies = [
  {
    title: 'Meridian AI Platform',
    industry: 'FinTech',
    result: '40% Efficiency Increase',
    description:
      'Custom AI agents that automated compliance workflows for a leading financial institution.',
    image:
      'linear-gradient(135deg, #0a1628 0%, #0d2847 50%, #0a1628 100%)',
    color: '#1a4b8c',
  },
  {
    title: 'Oceanic Dashboard',
    industry: 'Maritime Logistics',
    result: '3x Faster Decisions',
    description:
      'Real-time vessel tracking and predictive analytics platform for global shipping operations.',
    image:
      'linear-gradient(135deg, #0a2818 0%, #0d4728 50%, #0a2818 100%)',
    color: '#1a8c4b',
  },
  {
    title: 'Neural Commerce',
    industry: 'E-Commerce',
    result: '85% Conversion Lift',
    description:
      'AI-powered personalization engine that transforms browsing behavior into purchases.',
    image:
      'linear-gradient(135deg, #1a0a28 0%, #2d0d47 50%, #1a0a28 100%)',
    color: '#6b1a8c',
  },
  {
    title: 'Sentinel Security',
    industry: 'Cybersecurity',
    result: '99.7% Threat Detection',
    description:
      'Enterprise-grade AI monitoring system that identifies and neutralizes threats in real-time.',
    image:
      'linear-gradient(135deg, #281a0a 0%, #472d0d 50%, #281a0a 100%)',
    color: '#8c6b1a',
  },
]

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[0]
  index: number
}) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05])
  const inView = useInView(cardRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
      }}
      style={{ scale }}
      data-cursor="pointer"
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.04] hover:border-white/[0.08] transition-all duration-700">
        {/* Image area */}
        <motion.div
          style={{ scale: imageScale }}
          className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{ background: study.image }}
          />
          {/* Floating elements inside cards */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="w-[200px] h-[200px] border border-white/20 rounded-full"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="w-[300px] h-[300px] border border-white/10 rounded-full"
            />
          </div>

          {/* Result badge */}
          <div className="absolute top-6 right-6 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-full">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ocean">
              {study.result}
            </span>
          </div>
        </motion.div>

        {/* Info area */}
        <div className="p-8 sm:p-10 bg-deep-100/80">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ocean/60">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="w-4 h-px bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
              {study.industry}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-sans font-medium text-off-white mb-3 group-hover:text-white transition-colors duration-300">
            {study.title}
          </h3>

          <p className="text-sm text-slate leading-relaxed max-w-lg">
            {study.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-ocean/50 group-hover:text-ocean transition-all duration-500">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              View case study
            </span>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <line x1="0" y1="7" x2="12" y2="7" />
              <polyline points="8,3 12,7 8,11" />
            </motion.svg>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CaseStudies() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="voyages" className="relative py-32 sm:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ocean/60 block mb-4">
              Our work
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-off-white">
              Selected Voyages
            </h2>
          </div>
          <p className="text-sm text-slate max-w-sm">
            Each project is a journey. Here are the destinations we've reached
            with our partners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.title} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
