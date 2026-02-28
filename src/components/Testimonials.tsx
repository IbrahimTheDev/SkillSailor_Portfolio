import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const next = () => setActive((prev) => (prev + 1) % testimonials.length)
  const prev = () =>
    setActive(
      (p) => (p - 1 + testimonials.length) % testimonials.length
    )

  return (
    <section className="relative py-32 sm:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ocean/60 block mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-off-white">
            Words from Shore
          </h2>
        </motion.div>

        <div className="relative max-w-4xl">
          {/* Quote */}
          <div className="min-h-[200px] sm:min-h-[240px]">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-ocean/20 text-6xl font-serif leading-none mb-6">
                &ldquo;
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-sans font-light text-off-white leading-relaxed mb-10">
                {testimonials[active].quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-deep-300 border border-white/[0.06] flex items-center justify-center">
                  <span className="font-mono text-[10px] text-ocean">
                    {testimonials[active].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-off-white">
                    {testimonials[active].name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
                    {testimonials[active].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex items-center gap-4">
            <button
              onClick={prev}
              data-cursor="pointer"
              className="w-12 h-12 rounded-full border border-white/[0.06] flex items-center justify-center hover:border-ocean/30 hover:bg-ocean/5 transition-all duration-300"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate"
              >
                <line x1="12" y1="8" x2="4" y2="8" />
                <polyline points="7,4 3,8 7,12" />
              </svg>
            </button>
            <button
              onClick={next}
              data-cursor="pointer"
              className="w-12 h-12 rounded-full border border-white/[0.06] flex items-center justify-center hover:border-ocean/30 hover:bg-ocean/5 transition-all duration-300"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate"
              >
                <line x1="4" y1="8" x2="12" y2="8" />
                <polyline points="9,4 13,8 9,12" />
              </svg>
            </button>

            <div className="ml-4 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  data-cursor="pointer"
                  className={`h-px transition-all duration-500 ${
                    i === active
                      ? 'w-8 bg-ocean'
                      : 'w-4 bg-white/10 hover:bg-white/20'
                  }`}
                />
              ))}
            </div>

            <span className="ml-auto font-mono text-[10px] text-slate/40">
              {String(active + 1).padStart(2, '0')} /{' '}
              {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
