import React, { useState, useEffect } from 'react'
import { navLinks } from '../constants/index.js'

const Navbar = () => {
    const [isOpen, setisOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Collapse navbar when scrolled down more than 50px on mobile only
            if (window.innerWidth < 640) {
                setIsScrolled(window.scrollY > 50)
            }
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    /**
     * Intercept anchor clicks and hand them off to Lenis so the scroll is
     * smooth and the section lands just below the navbar with breathing room.
     * Falls back to native scrollIntoView if Lenis isn't ready yet.
     */
    const handleNavClick = (e, href) => {
        e.preventDefault()
        setisOpen(false)

        // href is like "#about" — strip the "#"
        const targetId = href.replace('#', '')
        const target = document.getElementById(targetId)
        if (!target) return

        // Measure the actual rendered navbar height dynamically.
        // The desktop header is hidden on mobile so we pick whichever is visible.
        const desktopHeader = document.querySelector('header.hidden.sm\\:block')
        const mobileHeader  = document.querySelector('header.sm\\:hidden')
        const activeHeader  = window.innerWidth >= 640 ? desktopHeader : mobileHeader
        const navbarBottom  = activeHeader
            ? activeHeader.getBoundingClientRect().bottom
            : 96  // safe fallback

        // Extra breathing room below the navbar (px)
        const gap = 24

        // Lenis offset is relative to the element's top edge.
        // Negative = scroll stops that many px BEFORE the element,
        // so the element appears that many px below the viewport top.
        const offset = -(navbarBottom + gap)

        const lenis = window.__lenis
        if (lenis) {
            lenis.scrollTo(target, {
                offset,
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
        } else {
            // Fallback — account for navbar manually
            const top = target.getBoundingClientRect().top + window.scrollY - navbarBottom - gap
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    const NavItems = () => {
        return (
            <ul className="nav-ul">
                {navLinks.map(({ id, href, name }) => (
                    <li key={id} className='nav-li'>
                        <a
                            href={href}
                            className='nav-li_a'
                            onClick={(e) => handleNavClick(e, href)}
                        >
                            {name}
                        </a>
                    </li>
                ))}
            </ul>
        )
    }

    const toggleMenu = () => setisOpen((prevIsOpen) => !prevIsOpen);
    
    return (
        <>
            {/* Desktop and tablet navbar - always full width */}
            <header 
                className='hidden sm:block fixed top-6 left-20 right-20 rounded-full z-50 bg-[rgba(60,60,65,0.9)] shadow-2xl overflow-hidden'
                style={{ backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }}
            >
                <div className='max-w-7xl mx-auto'>
                    <div className='flex justify-between items-center py-4 mx-auto c-space'>
                        <a href="/" className='text-white font-logo text-xl sm:text-2xl hover:text-orange-400 transition-colors flex items-center gap-3 group'> 
                            <img 
                                src="/assets/logo.png" 
                                alt="Vadiraj Joshi Logo" 
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-orange-500/60 shadow-md shadow-orange-500/20 group-hover:border-orange-400 group-hover:scale-105 transition-all duration-300 object-cover" 
                            />
                            <span>Vadiraj Joshi - Portfolio</span>
                        </a>
                        <nav className='flex'>
                            <NavItems />
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile navbar - collapses on scroll */}
            <header 
                className={`sm:hidden fixed top-6 z-50 bg-[rgba(60,60,65,0.9)] shadow-2xl transition-all duration-300 ${
                    isScrolled 
                        ? 'left-auto right-4 rounded-full w-14 h-14 flex items-center justify-center' 
                        : 'left-4 right-4 rounded-full overflow-hidden'
                }`}
                style={{ backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }}
            >
                {!isScrolled && (
                    <div className='max-w-7xl mx-auto'>
                        <div className='flex items-center justify-between py-4 mx-auto c-space'>
                            <a 
                                href="/" 
                                className='text-white font-logo text-xl hover:text-orange-400 transition-colors flex items-center gap-2.5'
                            > 
                                <img 
                                    src="/assets/logo.png" 
                                    alt="Vadiraj Joshi Logo" 
                                    className="w-7 h-7 rounded-full border border-orange-500/60 shadow-sm shadow-orange-500/20 object-cover flex-shrink-0" 
                                />
                                <span>Vadiraj Joshi - Portfolio</span>
                            </a>
                            <button 
                                onClick={toggleMenu} 
                                className='text-neutral-400 hover:text-white focus:outline-none flex' 
                            >
                                <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" className='w-6 h-6' />
                            </button>
                        </div>
                    </div>
                )}
                
                {isScrolled && (
                    <button 
                        onClick={toggleMenu} 
                        className='text-neutral-400 hover:text-white focus:outline-none flex' 
                    >
                        <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" className='w-6 h-6' />
                    </button>
                )}
            </header>
            
            {/* Floating menu window for mobile only */}
            <div 
                className={`fixed z-40 sm:hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                } ${
                    isScrolled ? 'top-24 right-4' : 'top-24 left-4 right-4'
                }`}
            >
                <div 
                    className='bg-[rgba(30,30,35,0.98)] rounded-2xl shadow-2xl border border-white/10 overflow-hidden'
                    style={{ backdropFilter: 'blur(60px)', WebkitBackdropFilter: 'blur(60px)' }}
                >
                    <nav className='p-5'>
                        <NavItems />
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar