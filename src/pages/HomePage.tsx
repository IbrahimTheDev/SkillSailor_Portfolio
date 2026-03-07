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

    // Set initial position — GSAP owns all transforms, no Tailwind translate
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
      // Calculate the target left position (center of services left column)
      const getTargetLeft = () => {
        const vw = window.innerWidth
        const maxW = Math.min(1400, vw)
        const containerLeft = (vw - maxW) / 2
        const padding = 48
        const gridWidth = maxW - padding * 2
        return containerLeft + padding + (gridWidth * 4 / 12) / 2
      }

      // Timeline: move sphere from hero center → services left column
      const moveTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: 'center center',
          endTrigger: servicesEl,
          end: 'top 30%',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      })
      moveTl.to(sphere, {
        left: () => getTargetLeft(),
        top: '50%',
        ease: 'none',
      })

      // Timeline: fade out after services section ends
      const fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesEl,
          start: 'bottom 80%',
          end: 'bottom 30%',
          scrub: 1,
        },
      })
      fadeTl.to(sphere, {
        opacity: 0,
        scale: 0.7,
        ease: 'none',
      })
    })

    mm.add('(max-width: 1023px)', () => {
      // Mobile/Tablet: fade out when scrolling past hero
      const fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: 'bottom center',
          end: 'bottom top',
          scrub: 1,
        },
      })
      fadeTl.to(sphere, {
        opacity: 0,
        scale: 0.8,
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
        className="fixed z-[2] pointer-events-none w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]"
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
