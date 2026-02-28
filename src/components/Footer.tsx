import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const links = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Voyages', href: '#voyages' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <footer className="relative border-t border-white/[0.04]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full border border-ocean/40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-ocean" />
              </div>
              <span className="font-sans text-sm font-medium tracking-wide text-off-white">
                SkillSailor
              </span>
            </div>
            <p className="text-sm text-slate leading-relaxed max-w-sm">
              Navigating enterprises through complex digital waters with
              custom AI agents and high-end design.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate/40 block mb-4">
              Navigation
            </span>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate hover:text-ocean transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate/40 block mb-4">
              Connect
            </span>
            <div className="flex flex-col gap-3">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate hover:text-ocean transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04]">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate/30">
            &copy; {new Date().getFullYear()} SkillSailor. All rights reserved.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate/30">
            Designed with precision
          </span>
        </div>
      </motion.div>
    </footer>
  )
}
