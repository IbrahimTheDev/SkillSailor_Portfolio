import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const projects = [
  {
    id: 1,
    title: 'Clinix AI',
    category: 'Healthcare',
    tags: ['AI', 'Healthcare', 'SaaS'],
    description: 'AI-powered healthcare platform revolutionizing patient care with intelligent diagnostics and automation.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    year: '2024',
  },
  {
    id: 2,
    title: 'Synergies4',
    category: 'Fintech',
    tags: ['Fintech', 'Dashboard', 'Analytics'],
    description: 'Financial analytics platform providing real-time insights and predictive modeling for enterprises.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    year: '2024',
  },
  {
    id: 3,
    title: 'Curehire',
    category: 'HR Tech',
    tags: ['HR', 'Recruitment', 'AI'],
    description: 'Smart recruitment platform using AI to match candidates with their perfect roles.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    year: '2023',
  },
  {
    id: 4,
    title: 'OWASP Foundation',
    category: 'Security',
    tags: ['Security', 'Open Source', 'Community'],
    description: 'Redesigning the digital presence for the world\'s leading application security organization.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    year: '2023',
  },
  {
    id: 5,
    title: 'Feature',
    category: 'SaaS',
    tags: ['SaaS', 'Product', 'Design'],
    description: 'Feature flagging platform enabling teams to ship with confidence and control.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    year: '2023',
  },
  {
    id: 6,
    title: 'DataFlow',
    category: 'Data',
    tags: ['Data', 'Analytics', 'Enterprise'],
    description: 'Enterprise data pipeline solution for seamless data orchestration and visualization.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop',
    year: '2024',
  },
]

export default function WorkPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-normal text-white mb-6">Our Work</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore our portfolio of digital products, brands, and experiences that have helped businesses transform and grow.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#12121a] border border-white/5 hover:border-white/10 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 text-sm">{project.category}</span>
                    <span className="text-gray-500 text-sm">{project.year}</span>
                  </div>
                  <h3 className="text-2xl text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-white/5 text-gray-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6">Have a project in mind?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white transition-colors"
          >
            <span>Start Your Project</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
