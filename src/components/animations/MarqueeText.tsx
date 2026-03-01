import { motion } from 'framer-motion'

interface MarqueeTextProps {
  text: string
  className?: string
  speed?: number
  direction?: 'left' | 'right'
  separator?: string
}

export default function MarqueeText({
  text,
  className = '',
  speed = 30,
  direction = 'left',
  separator = ' — ',
}: MarqueeTextProps) {
  const fullText = `${text}${separator}`.repeat(6)
  
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        className="inline-flex"
      >
        <span className="inline-block">{fullText}</span>
        <span className="inline-block">{fullText}</span>
      </motion.div>
    </div>
  )
}
