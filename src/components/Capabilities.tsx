import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { RevealOnScroll, SplitTextLine } from './animations'

const capabilities = [
  {
    title: 'AI Automation',
    description:
      'Custom AI agents that automate complex workflows, reduce operational costs, and scale decision-making across your enterprise.',
    label: '01',
    span: 'col-span-12 md:col-span-7',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="16" cy="16" r="12" />
        <circle cx="16" cy="16" r="4" />
        <line x1="16" y1="4" x2="16" y2="8" />
        <line x1="16" y1="24" x2="16" y2="28" />
        <line x1="4" y1="16" x2="8" y2="16" />
        <line x1="24" y1="16" x2="28" y2="16" />
      </svg>
    ),
  },
  {
    title: 'Enterprise Design',
    description:
      'Premium interfaces that command attention. Design systems built for scale, consistency, and conversion.',
    label: '02',
    span: 'col-span-12 md:col-span-5',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="4" y="4" width="24" height="24" rx="2" />
        <line x1="4" y1="12" x2="28" y2="12" />
        <line x1="12" y1="12" x2="12" y2="28" />
      </svg>
    ),
  },
  {
    title: 'Full-Stack Development',
    description:
      'End-to-end engineering from cloud infrastructure to pixel-perfect frontends. Built for performance and reliability.',
    label: '03',
    span: 'col-span-12 md:col-span-5',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <polyline points="10,8 4,16 10,24" />
        <polyline points="22,8 28,16 22,24" />
        <line x1="18" y1="6" x2="14" y2="26" />
      </svg>
    ),
  },
  {
    title: 'Strategic Consulting',
    description:
      'Navigate digital transformation with clarity. We map the route before building the ship.',
    label: '04',
    span: 'col-span-12 md:col-span-7',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M16 4 L28 28 L4 28 Z" />
        <circle cx="16" cy="20" r="2" />
        <line x1="16" y1="12" x2="16" y2="17" />
      </svg>
    ),
  },
]

function BentoCard({
  item,
  index,
}: {
  item: (typeof capabilities)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for glow effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.9,
        ease: [0.19, 1, 0.22, 1],
        delay: index * 0.12,
      }}
      className={item.span}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="pointer"
        whileHover={{ y: -8, transition: { duration: 0.4 } }}
        className="relative group h-full p-8 sm:p-10 rounded-3xl border border-white/[0.04] bg-gradient-to-br from-deep-100/80 to-deep-200/50 hover:border-ocean/20 transition-all duration-700 overflow-hidden"
      >
        {/* Animated glow that follows mouse */}
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full pointer-events-none transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
            left: springX,
            top: springY,
            x: '-50%',
            y: '-50%',
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.1) 0%, transparent 50%, rgba(0,212,255,0.05) 100%)',
          }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-ocean/60"
            >
              {item.label}
            </motion.span>
            <motion.div 
              animate={{ 
                rotate: isHovered ? 90 : 0,
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="text-ocean/40 group-hover:text-ocean/80 transition-colors duration-500"
            >
              {item.icon}
            </motion.div>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-off-white mb-4 group-hover:text-white transition-colors duration-500">
            <SplitTextLine delay={index * 0.1}>{item.title}</SplitTextLine>
          </h3>

          <p className="text-sm sm:text-base text-slate leading-relaxed max-w-md">
            {item.description}
          </p>

          <motion.div 
            className="mt-8 flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ocean/70">
              Learn more
            </span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-ocean/70"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              <line x1="0" y1="8" x2="12" y2="8" />
              <polyline points="8,4 12,8 8,12" />
            </motion.svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Capabilities() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="capabilities" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] border border-ocean/[0.03] rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] border border-ocean/[0.02] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <RevealOnScroll animation="fadeUp" className="mb-16 sm:mb-24">
          <div ref={ref}>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-ocean/60 block mb-4"
            >
              What we do
            </motion.span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-semibold tracking-tight text-off-white">
              <SplitTextLine>Capabilities</SplitTextLine>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-12 gap-5 sm:gap-6">
          {capabilities.map((item, i) => (
            <BentoCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
