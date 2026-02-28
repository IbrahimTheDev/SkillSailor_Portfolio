import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 })
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsMoving(true)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setIsMoving(false), 150)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - (isHovering ? 28 : 12),
          y: position.y - (isHovering ? 28 : 12),
          width: isHovering ? 56 : 24,
          height: isHovering ? 56 : 24,
          scale: isMoving ? 1 : [1, 1.2, 1],
        }}
        transition={{
          x: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
          y: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
          width: { type: 'spring', stiffness: 300, damping: 20 },
          height: { type: 'spring', stiffness: 300, damping: 20 },
          scale: isMoving
            ? { duration: 0.15 }
            : { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-colors duration-300 ${
            isHovering
              ? 'border-ocean bg-ocean/10 backdrop-blur-sm'
              : 'border-off-white/80'
          }`}
        />
      </motion.div>
    </AnimatePresence>
  )
}
