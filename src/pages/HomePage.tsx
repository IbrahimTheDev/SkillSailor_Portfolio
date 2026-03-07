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

    // Let GSAP manage transforms from the start
    gsap.set(sphere, { xPercent: -50, yPercent: -50 })

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      // Calculate the target left position (center of services left column)
      const getTargetLeft = () => {
        const vw = window.innerWidth
        const maxW = Math.min(1400, vw)
        const containerLeft = (vw - maxW) / 2
        const padding = 48 // lg:px-12
        const gridWidth = maxW - padding * 2
        return containerLeft + padding + (gridWidth * 4 / 12) / 2
      }

      // Move sphere from hero center to services left column
      gsap.to(sphere, {
        scrollTrigger: {
          trigger: heroEl,
          start: 'center center',
          endTrigger: servicesEl,
          end: 'top 30%',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
        left: () => getTargetLeft(),
        top: '45%',
        ease: 'none',
      })

      // Fade out sphere at the end of pinned services section
      gsap.to(sphere, {
        scrollTrigger: {
          trigger: servicesEl,
          start: 'bottom 80%',
          end: 'bottom 40%',
          scrub: 1,
        },
        opacity: 0,
        scale: 0.8,
        ease: 'none',
      })
    })

    mm.add('(max-width: 1023px)', () => {
      // Mobile/Tablet: fade out when scrolling past hero
      gsap.to(sphere, {
        scrollTrigger: {
          trigger: heroEl,
          start: 'bottom center',
          end: 'bottom top',
          scrub: 1,
        },
        opacity: 0,
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
        className="fixed z-[2] pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]"
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
