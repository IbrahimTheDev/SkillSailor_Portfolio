import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero'
import Services from '../components/Services'
import CaseStudies from '../components/CaseStudies'
import TrustedBy from '../components/TrustedBy'
import ParticleSphere from '../components/ParticleSphere'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const sphereRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sphere = sphereRef.current
    const heroEl = heroRef.current
    const servicesEl = servicesRef.current
    if (!sphere || !heroEl || !servicesEl) return

    // GSAP owns all transforms
    gsap.set(sphere, {
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
      scale: 1,
    })

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const getTargetLeft = () => {
        const vw = window.innerWidth
        const maxW = Math.min(1400, vw)
        const containerLeft = (vw - maxW) / 2
        const padding = 48
        const gridWidth = maxW - padding * 2
        return containerLeft + padding + (gridWidth * 4 / 12) / 2
      }

      // Single timeline: hero center → shrink/dim during transit → land at services left
      const moveTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: 'center center',
          endTrigger: servicesEl,
          end: 'top 20%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Phase 1 (0-40%): fade down + shrink while passing through hero bottom
      moveTl.to(sphere, {
        opacity: 0.3,
        scale: 0.65,
        left: () => getTargetLeft(),
        top: '50%',
        ease: 'none',
        duration: 0.4,
      })
      // Phase 2 (40-100%): fade back in at services position
      moveTl.to(sphere, {
        opacity: 0.85,
        scale: 0.75,
        ease: 'none',
        duration: 0.6,
      })

      // Fade out after services end
      gsap.to(sphere, {
        scrollTrigger: {
          trigger: servicesEl,
          start: 'bottom 80%',
          end: 'bottom 30%',
          scrub: 1,
        },
        opacity: 0,
        scale: 0.5,
        ease: 'none',
      })
    })

    mm.add('(max-width: 1023px)', () => {
      gsap.to(sphere, {
        scrollTrigger: {
          trigger: heroEl,
          start: 'bottom center',
          end: 'bottom top',
          scrub: 1,
        },
        opacity: 0,
        scale: 0.7,
        ease: 'none',
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <>
      {/* Single scroll-animated particle sphere */}
      <div
        ref={sphereRef}
        className="fixed z-[1] pointer-events-none w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]"
        style={{ left: '50%', top: '50%' }}
      >
        <ParticleSphere />
      </div>
      <div ref={heroRef}>
        <Hero />
      </div>
      <div ref={servicesRef}>
        <Services />
      </div>
      <CaseStudies />
      <TrustedBy />
    </>
  )
}
