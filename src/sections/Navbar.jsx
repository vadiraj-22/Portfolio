import React, { useState } from 'react'
import { navLinks } from '../constants/index.js'

const Navbar = () => {
    const [isOpen, setisOpen] = useState(false)

    const NavItems = () => {
        return (
            <ul className="nav-ul">
                {navLinks.map(({ id, href, name }) => (
                    <li key={id} className='nav-li'>
                        <a href={href} className='nav-li_a' onClick={() => { }}>
                            {name}
                        </a>
                    </li>
                ))}
            </ul>
        )
    }

    const toggleMenu = () => setisOpen((prevIsOpen) => !prevIsOpen);
    return (
        <header className='fixed top-6 left-20 right-20 rounded-full z-20 bg-[rgba(60,60,65,0.5)] backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center py-4 mx-auto c-space'>
                    <a href="/" className='text-white font-logo text-xl sm:text-2xl hover:text-orange-400 transition-colors flex items-center'> 
                        Vadiraj Joshi - Portfolio
                    </a>
                    <button onClick={toggleMenu} className='text-neutral-400 hover:text-white focus:outline-none sm:hidden flex' >
                        <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" className='w-6 h-6' />
                    </button>

                    <nav className='sm:flex hidden '>
                        <NavItems />
                    </nav>
                </div>
            </div>
            <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <nav className='p-5'>
                    <NavItems />
                </nav>
            </div>
        </header>
    )
}

export default Navbar