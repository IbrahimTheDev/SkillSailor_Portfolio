import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SplitTextLineProps {
  children: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export default function SplitTextLine({
  children,
  className = '',
  delay = 0,
  as: Component = 'span',
}: SplitTextLineProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const lines = children.split('\n')

  return (
    <Component ref={ref} className={`block ${className}`}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '110%', skewY: 7 }}
            animate={isInView ? { y: '0%', skewY: 0 } : { y: '110%', skewY: 7 }}
            transition={{
              duration: 1,
              ease: [0.19, 1, 0.22, 1],
              delay: delay + lineIndex * 0.1,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  )
}
