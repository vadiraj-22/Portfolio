import React, { useState, useEffect } from 'react';
import { navLinks } from '../constants/index.js';
import { GlassFilter } from '../components/ui/liquid-glass.tsx';

const NavbarGlass = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 640) {
                setIsScrolled(window.scrollY > 50);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);

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

        const lenis = window.__lenis;
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

    const NavItems = () => {
        return (
            <ul className="flex flex-col items-center gap-2 sm:flex-row sm:gap-2 relative z-20">
                {navLinks.map(({ id, href, name }) => (
                    <li key={id} className='w-full sm:w-auto'>
                        <a
                            href={href}
                            className='block text-sm sm:text-base font-medium px-4 py-2.5 rounded-2xl transition-all duration-300 text-white/90 hover:text-black hover:bg-white/95 text-center'
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

    // Glass navbar style
    const glassStyle = {
        boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
        transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    };
    
    return (
        <>
            <GlassFilter />
            
            {/* Desktop and tablet navbar with glass effect */}
            <header 
                className='hidden sm:block fixed top-6 left-4 right-4 lg:left-20 lg:right-20 z-50 overflow-hidden transition-all duration-700 rounded-[2rem] hover:rounded-[2.5rem] group'
                style={glassStyle}
            >
                {/* Glass Layers */}
                <div
                    className="absolute inset-0 z-0 overflow-hidden rounded-[2rem] group-hover:rounded-[2.5rem] transition-all duration-700"
                    style={{
                        backdropFilter: "blur(8px)",
                        filter: "url(#glass-distortion)",
                        isolation: "isolate",
                    }}
                />
                <div
                    className="absolute inset-0 z-10 rounded-[2rem] group-hover:rounded-[2.5rem] transition-all duration-700"
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                />
                <div
                    className="absolute inset-0 z-20 rounded-[2rem] group-hover:rounded-[2.5rem] overflow-hidden transition-all duration-700"
                    style={{
                        boxShadow:
                            "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.08), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.08)",
                    }}
                />

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
                            <NavItems />
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile navbar with glass effect */}
            <header 
                className={`sm:hidden fixed top-4 z-50 shadow-2xl transition-all duration-700 overflow-hidden ${
                    isScrolled 
                        ? 'left-auto right-4 rounded-full w-14 h-14 flex items-center justify-center' 
                        : 'left-4 right-4 rounded-[2rem]'
                }`}
                style={glassStyle}
            >
                {/* Glass Layers */}
                <div
                    className={`absolute inset-0 z-0 overflow-hidden ${isScrolled ? 'rounded-full' : 'rounded-[2rem]'}`}
                    style={{
                        backdropFilter: "blur(8px)",
                        filter: isScrolled ? "none" : "url(#glass-distortion)",
                        isolation: "isolate",
                    }}
                />
                <div
                    className={`absolute inset-0 z-10 ${isScrolled ? 'rounded-full' : 'rounded-[2rem]'}`}
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                />
                <div
                    className={`absolute inset-0 z-20 overflow-hidden ${isScrolled ? 'rounded-full' : 'rounded-[2rem]'}`}
                    style={{
                        boxShadow:
                            "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.08), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.08)",
                    }}
                />

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
                                className='text-neutral-200 hover:text-white focus:outline-none flex relative z-30 flex-shrink-0' 
                                aria-label="Toggle mobile navigation menu"
                            >
                                <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle menu" className='w-6 h-6 drop-shadow-lg' />
                            </button>
                        </div>
                    </div>
                )}
                
                {isScrolled && (
                    <button 
                        onClick={toggleMenu} 
                        className='text-neutral-200 hover:text-white focus:outline-none flex relative z-30 w-full h-full items-center justify-center' 
                        aria-label="Toggle mobile navigation menu"
                    >
                        <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle menu" className='w-6 h-6 drop-shadow-lg' />
                    </button>
                )}
            </header>
            
            {/* Floating menu window for mobile with glass effect */}
            <div 
                className={`fixed z-40 sm:hidden transition-all duration-700 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                } ${
                    isScrolled ? 'top-20 right-4 w-64' : 'top-[4.5rem] left-4 right-4'
                }`}
            >
                <div 
                    className='rounded-[2rem] shadow-2xl border border-white/20 overflow-hidden relative'
                    style={glassStyle}
                >
                    {/* Glass Layers */}
                    <div
                        className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]"
                        style={{
                            backdropFilter: "blur(8px)",
                            filter: "url(#glass-distortion)",
                            isolation: "isolate",
                        }}
                    />
                    <div
                        className="absolute inset-0 z-10 rounded-[2rem]"
                        style={{ background: "rgba(255, 255, 255, 0.15)" }}
                    />
                    <div
                        className="absolute inset-0 z-20 rounded-[2rem] overflow-hidden"
                        style={{
                            boxShadow:
                                "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.4), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.4)",
                        }}
                    />

                    {/* Content */}
                    <nav className='p-4 relative z-30'>
                        <NavItems />
                    </nav>
                </div>
            </div>
        </>
    );
};

export default NavbarGlass;
