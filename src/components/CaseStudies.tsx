import { motion, useScroll, useTransform, useInView, MotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { RevealOnScroll, SplitTextLine } from './animations'

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
  progress,
}: {
  study: (typeof caseStudies)[0]
  index: number
  progress: MotionValue<number>
}) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const inView = useInView(cardRef, { once: true, margin: '-100px' })
  
  const springConfig = { stiffness: 100, damping: 30 }
  const rotateY = useSpring(useTransform(progress, [0, 1], [-5, 5]), springConfig)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        ease: [0.19, 1, 0.22, 1],
        delay: index * 0.15,
      }}
      style={{ rotateY: index % 2 === 0 ? rotateY : undefined }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="pointer"
      className="group flex-shrink-0 w-[85vw] md:w-[600px] lg:w-[700px]"
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.04] hover:border-ocean/20 transition-all duration-700 h-full bg-deep-100/50">
        {/* Image area with parallax */}
        <div className="relative h-[350px] sm:h-[400px] lg:h-[450px] overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-0"
            style={{ background: study.image }}
          />
          
          {/* Dynamic gradient overlay */}
          <motion.div
            animate={{ opacity: isHovered ? 0.6 : 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent"
          />
          
          {/* Floating elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{
                rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
                scale: { duration: 0.6 },
              }}
              className="w-[180px] h-[180px] border border-white/10 rounded-full opacity-30"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: isHovered ? 1.3 : 1,
              }}
              transition={{
                rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
                scale: { duration: 0.6 },
              }}
              className="absolute w-[260px] h-[260px] border border-white/5 rounded-full opacity-20"
            />
          </div>

          {/* Result badge with animation */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-6 right-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2.5 bg-black/50 backdrop-blur-xl border border-white/[0.1] rounded-full"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ocean">
                {study.result}
              </span>
            </motion.div>
          </motion.div>

          {/* Index number */}
          <div className="absolute bottom-6 left-6 font-mono text-[80px] font-bold text-white/[0.03] leading-none">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Info area with staggered reveal */}
        <div className="p-8 sm:p-10 relative">
          <motion.div 
            className="flex items-center gap-4 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ocean/70">
              {String(index + 1).padStart(2, '0')}
            </span>
            <motion.span 
              animate={{ scaleX: isHovered ? 1.5 : 1 }}
              className="w-6 h-px bg-ocean/30 origin-left"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
              {study.industry}
            </span>
          </motion.div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-off-white mb-4 group-hover:text-white transition-colors duration-300">
            <SplitTextLine delay={0.2 + index * 0.1}>{study.title}</SplitTextLine>
          </h3>

          <p className="text-sm sm:text-base text-slate leading-relaxed max-w-lg mb-6">
            {study.description}
          </p>

          <motion.div 
            className="flex items-center gap-3 text-ocean/50 group-hover:text-ocean transition-all duration-500"
            whileHover={{ x: 5 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              View case study
            </span>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <line x1="0" y1="10" x2="16" y2="10" />
              <polyline points="11,5 16,10 11,15" />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth
      const clientWidth = containerRef.current.clientWidth
      setContainerWidth(scrollWidth - clientWidth)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0.1, 0.9], [0, -containerWidth])
  const progressBar = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section ref={sectionRef} id="voyages" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <RevealOnScroll animation="fadeUp" className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div ref={headerRef}>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-ocean/60 block mb-4"
              >
                Our work
              </motion.span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-semibold tracking-tight text-off-white">
                <SplitTextLine>Selected Voyages</SplitTextLine>
              </h2>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3">
              <p className="text-sm text-slate max-w-sm">
                Each project is a journey. Here are the destinations we've reached
                with our partners.
              </p>
              {/* Progress bar */}
              <div className="w-32 h-px bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-ocean rounded-full"
                  style={{ width: progressBar }}
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Horizontal scroll container */}
        <motion.div
          ref={containerRef}
          style={{ x }}
          className="flex gap-8 pl-6 lg:pl-12 pr-[20vw]"
        >
          {caseStudies.map((study, i) => (
            <CaseStudyCard 
              key={study.title} 
              study={study} 
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Navigation hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4"
        >
          <motion.div
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2 text-slate/40"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
              <line x1="12" y1="8" x2="4" y2="8" />
              <polyline points="7,4 3,8 7,12" />
            </svg>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
              Scroll to explore
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
              <line x1="4" y1="8" x2="12" y2="8" />
              <polyline points="9,4 13,8 9,12" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
