import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      className={item.span}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="pointer"
        className="relative group h-full p-8 sm:p-10 rounded-2xl border border-white/[0.04] bg-deep-100/50 hover:border-ocean/20 transition-all duration-700 overflow-hidden"
      >
        {/* Glow on hover that follows mouse */}
        {isHovered && (
          <div
            className="absolute w-[300px] h-[300px] rounded-full bg-ocean/[0.06] blur-[80px] pointer-events-none transition-opacity duration-500"
            style={{
              left: mousePos.x - 150,
              top: mousePos.y - 150,
            }}
          />
        )}

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ocean/60">
              {item.label}
            </span>
            <div className="text-ocean/40 group-hover:text-ocean/70 transition-colors duration-500">
              {item.icon}
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-sans font-medium text-off-white mb-4 group-hover:text-white transition-colors duration-500">
            {item.title}
          </h3>

          <p className="text-sm sm:text-base text-slate leading-relaxed max-w-md">
            {item.description}
          </p>

          <div className="mt-8 flex items-center gap-2 text-ocean/0 group-hover:text-ocean/70 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Learn more
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="0" y1="7" x2="12" y2="7" />
              <polyline points="8,3 12,7 8,11" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Capabilities() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="capabilities" className="relative py-32 sm:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ocean/60 block mb-4">
            What we do
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-off-white">
            Capabilities
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {capabilities.map((item, i) => (
            <BentoCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
