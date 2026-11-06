import React, { useState, useEffect } from 'react';
import { navLinks } from '../constants/index.js';

const NavbarGlass = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 640) {
                setIsScrolled(window.scrollY > 50);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // Lock body scroll and pause Lenis while mobile menu is open
    useEffect(() => {
        const lenis = window.__lenis;
        if (isOpen) {
            if (lenis && typeof lenis.stop === 'function') lenis.stop();
            document.body.style.overflow = 'hidden';
        } else {
            if (lenis && typeof lenis.start === 'function') lenis.start();
            document.body.style.overflow = '';
        }

        return () => {
            if (lenis && typeof lenis.start === 'function') lenis.start();
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);

        // Resume smooth scroll if stopped
        const lenis = window.__lenis;
        if (lenis && typeof lenis.start === 'function') {
            lenis.start();
        }
        document.body.style.overflow = '';

        const targetId = href.replace('#', '');
        const target = document.getElementById(targetId);
        if (!target) return;

        // Get the actual navbar height dynamically
        const desktopHeader = document.querySelector('header.hidden.sm\\:block');
        const mobileHeader  = document.querySelector('header.sm\\:hidden');
        const activeHeader  = window.innerWidth >= 640 ? desktopHeader : mobileHeader;
        
        // Get actual navbar height + some breathing room
        let navbarHeight = 0;
        if (activeHeader) {
            navbarHeight = activeHeader.getBoundingClientRect().height;
        }
        
        // Add extra spacing: navbar top position + navbar height + gap
        const topOffset = window.innerWidth >= 640 ? 24 : 16; // top-6 (24px) for desktop, top-4 (16px) for mobile
        const breathingRoom = 32; // Extra space below navbar
        const totalOffset = -(topOffset + navbarHeight + breathingRoom);

        if (lenis) {
            lenis.scrollTo(target, {
                offset: totalOffset,
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            const top = target.getBoundingClientRect().top + window.scrollY + totalOffset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    const NavItems = ({ isMobileMenu = false }) => {
        return (
            <ul className={`flex ${isMobileMenu ? 'flex-col gap-1 w-full' : 'flex-col items-center gap-2 sm:flex-row sm:gap-2'} relative z-20`}>
                {navLinks.map(({ id, href, name }) => (
                    <li key={id} className={isMobileMenu ? 'w-full' : 'w-full sm:w-auto'}>
                        <a
                            href={href}
                            className={`block font-medium rounded-2xl transition-all duration-300 text-center ${
                                isMobileMenu
                                    ? 'text-base text-white/90 hover:text-black hover:bg-gradient-to-r hover:from-amber-300 hover:to-orange-400 py-3 px-4 active:scale-[0.98]'
                                    : 'text-sm sm:text-base px-4 py-2.5 text-white/90 hover:text-black hover:bg-gradient-to-r hover:from-amber-300 hover:to-orange-400 hover:shadow-md hover:shadow-orange-500/25'
                            }`}
                            onClick={(e) => handleNavClick(e, href)}
                        >
                            {name}
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

    return (
        <>
            {/* Desktop and tablet navbar with dark glass effect */}
            <header 
                className='hidden sm:block fixed top-6 left-4 right-4 lg:left-20 lg:right-20 z-50 overflow-hidden transition-all duration-500 rounded-[2rem] hover:rounded-[2.5rem] group'
                style={{
                    background: 'rgba(13, 14, 20, 0.75)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                {/* Glass specular top highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                {/* Content */}
                <div className='relative z-30 max-w-7xl mx-auto'>
                    <div className='flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6 lg:px-10'>
                        <a 
                            href="/" 
                            className='text-white font-logo text-lg sm:text-xl lg:text-2xl hover:text-orange-400 transition-colors flex items-center gap-3 drop-shadow-lg group'
                        > 
                            <img 
                                src="/assets/vadiraj.jpg" 
                                alt="Vadiraj Joshi" 
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-orange-500/60 shadow-md shadow-orange-500/20 group-hover:border-orange-400 group-hover:scale-105 transition-all duration-300 object-cover" 
                            />
                            <span>Vadiraj Joshi - Portfolio</span>
                        </a>
                        <nav className='flex' aria-label="Desktop Navigation">
                            <NavItems isMobileMenu={false} />
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile backdrop scrim - dims content underneath and closes menu on tap */}
            <div 
                className={`fixed inset-0 z-40 sm:hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile navbar header */}
            <header 
                className={`sm:hidden fixed top-4 z-50 transition-all duration-300 ease-out overflow-hidden ${
                    isScrolled 
                        ? 'left-auto right-4 rounded-full w-14 h-14 flex items-center justify-center' 
                        : 'left-4 right-4 rounded-[2rem]'
                }`}
                style={{
                    background: 'rgba(15, 16, 22, 0.88)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
            >
                {/* Content */}
                {!isScrolled && (
                    <div className='relative z-30 w-full'>
                        <div className='flex items-center justify-between py-3 px-4'>
                            <a 
                                href="/" 
                                className='text-white font-logo text-base hover:text-orange-400 transition-colors flex items-center gap-2.5 drop-shadow-lg truncate max-w-[70%]'
                            > 
                                <img 
                                    src="/assets/vadiraj.jpg" 
                                    alt="Vadiraj Joshi" 
                                    className="w-7 h-7 rounded-full border border-orange-500/60 shadow-sm shadow-orange-500/20 object-cover flex-shrink-0" 
                                />
                                <span className="truncate">Vadiraj Joshi</span>
                            </a>
                            <button 
                                onClick={toggleMenu} 
                                className='text-neutral-200 hover:text-white focus:outline-none flex relative z-30 flex-shrink-0 p-1 rounded-full transition-transform active:scale-90' 
                                aria-label="Toggle mobile navigation menu"
                                aria-expanded={isOpen}
                            >
                                <img 
                                    src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"} 
                                    alt="toggle menu" 
                                    className={`w-6 h-6 drop-shadow-lg transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} 
                                />
                            </button>
                        </div>
                    </div>
                )}
                
                {isScrolled && (
                    <button 
                        onClick={toggleMenu} 
                        className='text-neutral-200 hover:text-white focus:outline-none flex relative z-30 w-full h-full items-center justify-center transition-transform active:scale-90' 
                        aria-label="Toggle mobile navigation menu"
                        aria-expanded={isOpen}
                    >
                        <img 
                            src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"} 
                            alt="toggle menu" 
                            className={`w-6 h-6 drop-shadow-lg transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} 
                        />
                    </button>
                )}
            </header>
            
            {/* Floating menu window for mobile with smooth glass effect */}
            <div 
                className={`fixed z-50 sm:hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen 
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                        : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'
                } ${
                    isScrolled ? 'top-20 right-4 w-64' : 'top-[4.5rem] left-4 right-4'
                }`}
            >
                <div 
                    className='rounded-[2rem] overflow-hidden relative'
                    style={{
                        background: 'rgba(13, 14, 20, 0.94)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                    }}
                >
                    {/* Top specular reflection line for liquid glass feel */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                    {/* Subtle internal gradient glow */}
                    <div 
                        className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-orange-500/10 blur-2xl rounded-full pointer-events-none"
                    />

                    {/* Content */}
                    <nav className='p-3.5 relative z-30'>
                        <NavItems isMobileMenu={true} />
                    </nav>
                </div>
            </div>
        </>
    );
};

export default NavbarGlass;