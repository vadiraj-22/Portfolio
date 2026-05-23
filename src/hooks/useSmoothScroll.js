import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initialises Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync.
 * The instance is also stored on window.__lenis so other components (e.g. Navbar)
 * can call lenis.scrollTo() for programmatic smooth navigation.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,          // scroll duration multiplier (higher = slower/smoother)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    })

    // Expose instance globally so Navbar (and any other component) can use scrollTo
    window.__lenis = lenis

    // Keep GSAP ScrollTrigger positions in sync with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis via GSAP's ticker so they share the same rAF loop
    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      window.__lenis = null
      gsap.ticker.remove(onTick)
    }
  }, [])
}
