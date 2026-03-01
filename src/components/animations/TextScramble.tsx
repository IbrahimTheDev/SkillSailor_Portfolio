import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface TextScrambleProps {
  children: string
  className?: string
  duration?: number
  trigger?: 'hover' | 'inView' | 'always'
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export default function TextScramble({
  children,
  className = '',
  duration = 1000,
  trigger = 'hover',
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children)
  const [isScrambling, setIsScrambling] = useState(false)

  const scramble = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)
    
    const original = children
    const length = original.length
    let iteration = 0
    const totalIterations = length * 3

    const interval = setInterval(() => {
      setDisplayText(
        original
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration / 3) {
              return original[index]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      iteration += 1

      if (iteration >= totalIterations) {
        clearInterval(interval)
        setDisplayText(original)
        setIsScrambling(false)
      }
    }, duration / totalIterations)

    return () => clearInterval(interval)
  }, [children, duration, isScrambling])

  useEffect(() => {
    if (trigger === 'always') {
      const timeout = setTimeout(scramble, 500)
      return () => clearTimeout(timeout)
    }
  }, [trigger, scramble])

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      scramble()
    }
  }

  return (
    <motion.span
      className={`inline-block font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </motion.span>
  )
}
