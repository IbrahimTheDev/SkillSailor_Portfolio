import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const team = [
  { name: 'Ibrahim', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { name: 'Sarah Chen', role: 'Design Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { name: 'Alex Kumar', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { name: 'Maya Johnson', role: 'Product Manager', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
]

const values = [
  { title: 'Innovation First', description: 'We push boundaries and embrace new technologies to deliver cutting-edge solutions.' },
  { title: 'User-Centric', description: 'Every decision we make starts with understanding and empathizing with users.' },
  { title: 'Quality Obsessed', description: 'We\'re committed to excellence in every pixel, line of code, and interaction.' },
  { title: 'Transparent', description: 'Open communication and honest feedback drive our relationships.' },
]

export default function CompanyPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-normal text-white mb-6">About Us</h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            We're a team of designers, developers, and strategists passionate about building digital experiences that matter. 
            Founded in 2020, we've helped 50+ companies transform their digital presence.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '30+', label: 'Happy Clients' },
            { value: '5+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-light text-white mb-2">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <h2 className="text-3xl text-white mb-10">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-2xl bg-[#12121a] border border-white/5"
              >
                <h3 className="text-xl text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-24"
        >
          <h2 className="text-3xl text-white mb-10">Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-[#12121a]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-white text-lg">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center py-16 px-8 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/5"
        >
          <h2 className="text-3xl md:text-4xl text-white mb-4">Want to join our team?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We're always looking for talented individuals who share our passion for building exceptional digital experiences.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
          >
            <span>Get in Touch</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
