import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const caseStudies = [
  {
    id: '01',
    title: 'Clinix AI',
    tags: ['Web Design', 'App Design', 'AI Development', 'GTM'],
    image: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: '02',
    title: 'Synergies4',
    tags: ['App Design', 'AI Development'],
    image: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 50%, #1a1a2e 100%)',
  },
  {
    id: '03',
    title: 'Curehire',
    tags: ['Web Design', 'Development'],
    image: 'linear-gradient(135deg, #0a2818 0%, #0d4728 50%, #0a2818 100%)',
  },
  {
    id: '04',
    title: 'OWASP Foundation',
    tags: ['Web Design', 'Development'],
    image: 'linear-gradient(135deg, #1a1a2e 0%, #1e3a5f 50%, #1a1a2e 100%)',
  },
  {
    id: '05',
    title: 'Feature',
    tags: ['App Design', 'GTM'],
    image: 'linear-gradient(135deg, #2d1b1b 0%, #4a2c2c 50%, #2d1b1b 100%)',
  },
]

export default function CaseStudies() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState(3)

  return (
    <section id="case-studies" className="relative py-24 md:py-32 bg-[#0a0a0a]">
      <div ref={ref} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left - Title and List */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-normal text-white mb-12"
            >
              Case Studies
            </motion.h2>

            {/* Case Study List */}
            <div className="space-y-0">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`group py-5 border-b border-white/10 cursor-pointer transition-all duration-300 ${
                    hoveredIndex === index ? 'bg-white/5 -mx-4 px-4' : ''
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-6 flex-wrap md:flex-nowrap">
                    <span className="text-gray-500 text-sm font-mono w-6">{study.id}</span>
                    <h3 className={`text-base md:text-lg font-medium transition-colors duration-300 min-w-[120px] ${
                      hoveredIndex === index ? 'text-white' : 'text-gray-400'
                    }`}>
                      {study.title}
                    </h3>
                    <div className="flex items-center gap-2 md:ml-auto flex-wrap">
                      {study.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full border transition-all duration-300 whitespace-nowrap ${
                            hoveredIndex === index 
                              ? 'border-white/20 text-white/80' 
                              : 'border-white/10 text-gray-500'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Description and Preview */}
          <div className="lg:pl-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 text-sm leading-relaxed mb-12 max-w-sm lg:ml-auto lg:text-right"
            >
              Proven results, measurable impact—explore the transformations we've delivered.
            </motion.p>

            {/* Preview Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, rotateY: -15 }}
                animate={{ opacity: 1, rotateY: -8 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: caseStudies[hoveredIndex]?.image,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Laptop mockup */}
                <div className="absolute inset-4 rounded-lg bg-[#1a1a2e] border border-white/10 overflow-hidden">
                  <div className="absolute inset-0 p-4">
                    <div className="h-full rounded bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white/60 text-sm mb-2">
                          {caseStudies[hoveredIndex]?.title}
                        </div>
                        <div className="text-white/30 text-xs">
                          Project Preview
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#0f0f1a] border-t border-white/5" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
