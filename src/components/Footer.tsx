import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return { hours, minutes, seconds }
  }

  const { hours, minutes, seconds } = formatTime(time)
  const period = time.getHours() >= 12 ? 'PM' : 'AM'

  const services = ['Product Design', 'Development', 'GTM Strategy', 'Healthcare Apps', 'AI Development', 'IoT Development']
  const atom = ['Atom Enterprise', 'Atom Agentic', 'Atom IntentIQ', 'Compare Atom']
  const demos = ['Voice Agents', 'Generative UI', 'Sentiment AI']
  const resources = ['Clinix AI', 'Synergies4', 'Curehire', 'Feature', 'OWASP', 'Contact']

  return (
    <footer ref={ref} className="relative bg-[#0a0a0a] pt-16 pb-8">
      {/* CTA Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-12"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(99, 102, 241, 0.05) 100%)',
          }}
        >
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-purple-500/20 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] bg-indigo-500/20 blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-normal text-white mb-2">
              We turn bold ideas into
            </h2>
            <h2 className="text-2xl md:text-4xl font-normal mb-8">
              <span className="text-white">powerful </span>
              <span className="text-indigo-400 italic">digital</span>
              <span className="text-white"> realities.</span>
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white text-sm transition-all duration-300"
            >
              <span>Let's work together</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Contact Info */}
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <a href="mailto:hello@skillsailor.com" className="text-white hover:text-gray-300 transition-colors block mb-2">
                hello@skillsailor.com
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm underline underline-offset-4">
                LinkedIn ↗
              </a>
              <div className="mt-8">
                <p className="text-gray-500 text-sm">Based in India</p>
                <p className="text-gray-600 text-xs">Serving clients globally</p>
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Atom */}
          <div>
            <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2">
              {atom.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Demos */}
          <div>
            <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-4">Demos</h4>
            <ul className="space-y-2">
              {demos.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Live Clock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-end gap-2"
        >
          <span className="text-6xl md:text-8xl font-light text-white tracking-tight">
            {hours}
          </span>
          <span className="text-6xl md:text-8xl font-light text-white tracking-tight">
            :
          </span>
          <span className="text-6xl md:text-8xl font-light text-white tracking-tight">
            {minutes}
          </span>
          <span className="text-6xl md:text-8xl font-light text-white tracking-tight">
            :
          </span>
          <span className="text-6xl md:text-8xl font-light text-white tracking-tight">
            {seconds}
          </span>
          <span className="text-xl md:text-2xl text-gray-400 mb-3 ml-2">
            {period}
          </span>
        </motion.div>
      </div>
    </footer>
  )
}
