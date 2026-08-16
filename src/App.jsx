import React, { useState, useCallback } from 'react'
import NavbarGlass from './sections/NavbarGlass'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Clients from './sections/Clients'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Experience from './sections/Experience'
import TechCursor from '@/components/ui/tech-cursor'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import FuturisticLoader from './components/FuturisticLoader'

const App = () => {
  useSmoothScroll()
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Simulate progress since we no longer use Suspense for initial load tracking
  React.useEffect(() => {
    let frame;
    let currentProgress = 0;
    const step = () => {
      // Fast ramp to 80%, then slow, then jump to 100
      if (currentProgress < 80) {
        currentProgress += Math.random() * 8 + 2;
      } else if (currentProgress < 95) {
        currentProgress += Math.random() * 2 + 0.5;
      } else {
        currentProgress = 100;
      }
      currentProgress = Math.min(currentProgress, 100);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        frame = requestAnimationFrame(step);
      }
    };
    // Start after a small delay so the loader renders first
    const timer = setTimeout(() => {
      frame = requestAnimationFrame(step);
    }, 300);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading && (
        <FuturisticLoader progress={progress} onComplete={handleLoadComplete} />
      )}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <TechCursor />
        <main className='max-w-7xl mx-auto '>
          <NavbarGlass/>
          <Hero/>
          <About/>
          <Projects/>
          {/* <Clients/> */}
          <Experience/>
          <Contact/>
          <Footer />
        </main>
      </div>
    </>
  )
}

export default App
