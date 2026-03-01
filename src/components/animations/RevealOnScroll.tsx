import { useRef, type ReactNode } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'clipReveal' | 'rotate'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  animation?: AnimationType
  delay?: number
  duration?: number
  once?: boolean
}

const animations: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  fadeDown: {
    hidden: { y: -60, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  fadeLeft: {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  fadeRight: {
    hidden: { x: 60, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  scale: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  clipReveal: {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { clipPath: 'inset(0% 0 0 0)' },
  },
  rotate: {
    hidden: { rotateX: -15, opacity: 0, y: 30 },
    visible: { rotateX: 0, opacity: 1, y: 0 },
  },
}

export default function RevealOnScroll({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      variants={animations[animation]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className={className}
      style={animation === 'rotate' ? { perspective: '1000px' } : undefined}
    >
      {children}
    </motion.div>
  )
}
