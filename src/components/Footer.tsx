import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MagneticButton, MarqueeText } from './animations'

const links = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Voyages', href: '#voyages' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'Twitter', href: '#', icon: 'X' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'Dribbble', href: '#', icon: 'Dr' },
]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <footer className="relative border-t border-white/[0.04] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-gradient-radial from-ocean/[0.04] to-transparent rounded-full blur-[80px]" />
      </div>

      {/* Top marquee */}
      <div className="border-b border-white/[0.03] py-5">
        <MarqueeText
          text="SkillSailor • AI Agency • Design Studio • Full-Stack Development"
          className="text-xl sm:text-2xl font-sans font-medium text-white/[0.03]"
          speed={35}
        />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <MagneticButton href="#" className="inline-flex items-center gap-3 mb-6 group" strength={0.3}>
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-full border border-ocean/40 flex items-center justify-center group-hover:border-ocean transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-ocean" />
              </motion.div>
              <span className="font-sans text-base font-medium tracking-wide text-off-white group-hover:text-white transition-colors">
                SkillSailor
              </span>
            </MagneticButton>
            <p className="text-base text-slate leading-relaxed max-w-sm">
              Navigating enterprises through complex digital waters with
              custom AI agents and high-end design.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants}>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ocean/40 block mb-5">
              Navigation
            </span>
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <MagneticButton
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate hover:text-ocean transition-colors duration-300 w-fit"
                  strength={0.15}
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    {link.label}
                  </motion.span>
                </MagneticButton>
              ))}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ocean/40 block mb-5">
              Connect
            </span>
            <div className="flex gap-3">
              {socials.map((link) => (
                <MagneticButton
                  key={link.label}
                  href={link.href}
                  className="w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center text-slate hover:border-ocean/40 hover:text-ocean hover:bg-ocean/5 transition-all duration-300"
                  strength={0.3}
                >
                  <span className="text-xs font-mono">{link.icon}</span>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t border-white/[0.04]"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate/40">
            &copy; {new Date().getFullYear()} SkillSailor. All rights reserved.
          </span>
          <motion.span 
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-ocean/30"
          >
            Designed with precision
          </motion.span>
        </motion.div>
      </motion.div>
    </footer>
  )
}
