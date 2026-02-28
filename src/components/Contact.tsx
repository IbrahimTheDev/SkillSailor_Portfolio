import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <section id="contact" className="relative py-32 sm:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ocean/60 block mb-4">
              Start a voyage
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-off-white mb-6">
              Let&apos;s Build<br />
              Something Great
            </h2>
            <p className="text-base text-slate leading-relaxed max-w-md mb-12">
              Ready to navigate uncharted waters? Tell us about your project
              and we&apos;ll chart the course together.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/[0.06] flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-ocean/50"
                  >
                    <rect x="2" y="4" width="12" height="9" rx="1" />
                    <polyline points="2,4 8,9 14,4" />
                  </svg>
                </div>
                <span className="font-mono text-xs text-slate">
                  hello@skillsailor.com
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/[0.06] flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-ocean/50"
                  >
                    <circle cx="8" cy="8" r="6" />
                    <line x1="8" y1="2" x2="8" y2="8" />
                    <line x1="8" y1="8" x2="12" y2="8" />
                  </svg>
                </div>
                <span className="font-mono text-xs text-slate">
                  Response within 24hrs
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6"
            >
              {[
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { name: 'company', label: 'Company', type: 'text', placeholder: 'Company name' },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate/60 block mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    className={`w-full bg-transparent border-b py-3 text-sm text-off-white placeholder-slate/30 outline-none transition-all duration-500 ${
                      focused === field.name
                        ? 'border-ocean/50'
                        : 'border-white/[0.06]'
                    }`}
                  />
                </div>
              ))}

              <div className="relative">
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate/60 block mb-2">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className={`w-full bg-transparent border-b py-3 text-sm text-off-white placeholder-slate/30 outline-none resize-none transition-all duration-500 ${
                    focused === 'message'
                      ? 'border-ocean/50'
                      : 'border-white/[0.06]'
                  }`}
                />
              </div>

              <motion.button
                type="submit"
                data-cursor="pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative mt-8 w-full sm:w-auto px-10 py-4 rounded-full font-mono text-xs uppercase tracking-[0.15em] text-deep bg-ocean hover:brightness-110 transition-all duration-500 overflow-hidden group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-ocean/50 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <span className="relative z-10">Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
