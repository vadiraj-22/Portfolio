import React from 'react'
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

const App = () => {
  useSmoothScroll()

  return (
    <>
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
    </>
  )
}

export default App
