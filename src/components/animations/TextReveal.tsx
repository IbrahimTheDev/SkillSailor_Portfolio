import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  type?: 'words' | 'chars'
  staggerDelay?: number
}

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  type = 'words',
  staggerDelay = 0.03,
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const items = type === 'words' ? children.split(' ') : children.split('')

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: {
      y: '100%',
      opacity: 0,
      rotateX: -90,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={controls}
      className={`inline-block ${className}`}
      style={{ perspective: '1000px' }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ perspective: '400px' }}
        >
          <motion.span
            variants={child}
            className="inline-block"
            style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
          >
            {item}
            {type === 'words' && i < items.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
