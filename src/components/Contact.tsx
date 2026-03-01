import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { RevealOnScroll, SplitTextLine, MagneticButton, MarqueeText } from './animations'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [focused, setFocused] = useState<string | null>(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const inputVariants = {
    rest: { scale: 1 },
    focus: { scale: 1.02 },
  }

  return (
    <section id="contact" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-ocean/[0.06] to-transparent rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/2 right-0 w-[600px] h-[600px] border border-ocean/[0.03] rounded-full"
        />
      </div>

      {/* Top marquee */}
      <div className="absolute top-0 left-0 right-0 border-b border-white/[0.03] py-4 overflow-hidden">
        <MarqueeText
          text="Let's Build Something Amazing Together"
          className="text-[10px] font-mono uppercase tracking-[0.4em] text-ocean/30"
          speed={50}
          direction="right"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <RevealOnScroll animation="fadeUp">
            <div ref={ref}>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-ocean/60 block mb-4"
              >
                Start a voyage
              </motion.span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-semibold tracking-tight text-off-white mb-6">
                <SplitTextLine>Let's Build</SplitTextLine>
                <span className="block"><SplitTextLine delay={0.1}>Something Great</SplitTextLine></span>
              </h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-base sm:text-lg text-slate leading-relaxed max-w-md mb-12"
              >
                Ready to navigate uncharted waters? Tell us about your project
                and we'll chart the course together.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                {[
                  { icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="2" y="4" width="14" height="10" rx="1" />
                      <polyline points="2,4 9,10 16,4" />
                    </svg>
                  ), text: 'hello@skillsailor.com', label: 'Email' },
                  { icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="9" cy="9" r="7" />
                      <line x1="9" y1="2" x2="9" y2="9" />
                      <line x1="9" y1="9" x2="14" y2="9" />
                    </svg>
                  ), text: 'Response within 24hrs', label: 'Response Time' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-5 group"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-ocean/30 transition-colors duration-300"
                    >
                      <span className="text-ocean/60 group-hover:text-ocean transition-colors">
                        {item.icon}
                      </span>
                    </motion.div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate/50 block mb-1">
                        {item.label}
                      </span>
                      <span className="font-mono text-sm text-slate group-hover:text-off-white transition-colors">
                        {item.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-8"
            >
              {[
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { name: 'company', label: 'Company', type: 'text', placeholder: 'Company name' },
              ].map((field) => (
                <motion.div 
                  key={field.name} 
                  className="relative group"
                  variants={inputVariants}
                  animate={focused === field.name ? 'focus' : 'rest'}
                  transition={{ duration: 0.2 }}
                >
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate/60 block mb-3 group-focus-within:text-ocean/80 transition-colors">
                    {field.label}
                  </label>
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: focused === field.name ? 4 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formState[field.name as keyof typeof formState]}
                      onChange={(e) => setFormState({ ...formState, [field.name]: e.target.value })}
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-transparent border-b-2 py-4 text-base text-off-white placeholder-slate/30 outline-none transition-all duration-500 ${
                        focused === field.name
                          ? 'border-ocean/60 pl-2'
                          : 'border-white/[0.08] hover:border-white/[0.15]'
                      }`}
                    />
                  </motion.div>
                  {/* Active line indicator */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focused === field.name ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-ocean origin-left"
                  />
                </motion.div>
              ))}

              <motion.div 
                className="relative group"
                variants={inputVariants}
                animate={focused === 'message' ? 'focus' : 'rest'}
              >
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate/60 block mb-3 group-focus-within:text-ocean/80 transition-colors">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className={`w-full bg-transparent border-b-2 py-4 text-base text-off-white placeholder-slate/30 outline-none resize-none transition-all duration-500 ${
                    focused === 'message'
                      ? 'border-ocean/60 pl-2'
                      : 'border-white/[0.08] hover:border-white/[0.15]'
                  }`}
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focused === 'message' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-ocean origin-left"
                />
              </motion.div>

              <MagneticButton
                className="relative mt-10 w-full sm:w-auto px-12 py-5 rounded-full font-mono text-xs uppercase tracking-[0.15em] text-deep bg-ocean overflow-hidden group"
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-ocean/50 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <span className="relative z-10 font-medium">Send Message</span>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
