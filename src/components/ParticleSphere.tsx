import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Point3D {
  x: number
  y: number
  z: number
  originalX: number
  originalY: number
  originalZ: number
}

export default function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Point3D[]>([])
  const orbitingParticlesRef = useRef<Point3D[]>([])
  const animationRef = useRef<number | null>(null)
  const rotationRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Create sphere points
    const radius = 180
    const particles: Point3D[] = []
    const orbitingParticles: Point3D[] = []
    
    // Fibonacci sphere for even distribution
    const numPoints = 800
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    
    for (let i = 0; i < numPoints; i++) {
      const theta = 2 * Math.PI * i / goldenRatio
      const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints)
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      particles.push({ x, y, z, originalX: x, originalY: y, originalZ: z })
    }

    // Create orbiting particles
    const numOrbiting = 300
    for (let i = 0; i < numOrbiting; i++) {
      const orbitRadius = radius + 30 + Math.random() * 80
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      const x = orbitRadius * Math.sin(phi) * Math.cos(theta)
      const y = orbitRadius * Math.sin(phi) * Math.sin(theta)
      const z = orbitRadius * Math.cos(phi)
      
      orbitingParticles.push({ x, y, z, originalX: x, originalY: y, originalZ: z })
    }

    particlesRef.current = particles
    orbitingParticlesRef.current = orbitingParticles

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Rotate point around Y axis
    const rotateY = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        x: point.x * cos - point.z * sin,
        y: point.y,
        z: point.x * sin + point.z * cos,
      }
    }

    // Rotate point around X axis
    const rotateX = (point: { x: number; y: number; z: number }, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        x: point.x,
        y: point.y * cos - point.z * sin,
        z: point.y * sin + point.z * cos,
      }
    }

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Update rotation based on mouse
      rotationRef.current.y += 0.003 + mouseRef.current.x * 0.01
      rotationRef.current.x = mouseRef.current.y * 0.3

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Draw main sphere fill
      const gradient = ctx.createRadialGradient(
        centerX - 30, centerY - 30, 0,
        centerX, centerY, radius
      )
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)')
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.2)')
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)')
      
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Sort and draw particles
      const allPoints: { x: number; y: number; z: number; size: number; opacity: number; isOrbiting: boolean }[] = []

      // Add sphere particles
      particlesRef.current.forEach((particle) => {
        let rotated = rotateY(particle, rotationRef.current.y)
        rotated = rotateX(rotated, rotationRef.current.x)
        
        const scale = (rotated.z + radius * 2) / (radius * 3)
        const opacity = Math.max(0.1, Math.min(1, scale))
        
        allPoints.push({
          x: centerX + rotated.x,
          y: centerY + rotated.y,
          z: rotated.z,
          size: 1.5 * scale,
          opacity: opacity * 0.6,
          isOrbiting: false,
        })
      })

      // Add orbiting particles
      orbitingParticlesRef.current.forEach((particle, i) => {
        // Add some wobble to orbiting particles
        const wobble = Math.sin(Date.now() * 0.001 + i * 0.1) * 5
        const modifiedParticle = {
          ...particle,
          x: particle.x + wobble,
          y: particle.y + Math.cos(Date.now() * 0.0015 + i * 0.1) * 3,
          z: particle.z,
        }
        
        let rotated = rotateY(modifiedParticle, rotationRef.current.y)
        rotated = rotateX(rotated, rotationRef.current.x)
        
        const scale = (rotated.z + radius * 2.5) / (radius * 4)
        const opacity = Math.max(0.1, Math.min(1, scale))
        
        allPoints.push({
          x: centerX + rotated.x,
          y: centerY + rotated.y,
          z: rotated.z,
          size: 1.2 * scale,
          opacity: opacity * 0.4,
          isOrbiting: true,
        })
      })

      // Sort by z for depth
      allPoints.sort((a, b) => a.z - b.z)

      // Draw all points
      allPoints.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        if (point.isOrbiting) {
          ctx.fillStyle = `rgba(255, 255, 255, ${point.opacity})`
        } else {
          ctx.fillStyle = `rgba(200, 210, 255, ${point.opacity})`
        }
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
      className="relative w-full h-full"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  )
}
