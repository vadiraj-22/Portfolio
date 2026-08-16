import React from 'react'

const Footer = () => {
    return (
        <footer className='c-space pt-7 pb-3 border-t border-white/20 flex justify-between items-center flex-wrap gap-5'>
            <div className='text-white-500 flex mx-auto gap-3 text-sm'>
                <p>Terms &amp; Conditions</p>
                <p>|</p>
                <p>Privacy Policy</p>
            </div>
            <div className='flex mx-auto gap-3'>
                <a href="https://github.com/vadiraj-22" target="_blank" rel="noopener noreferrer" className='social-icon' aria-label="Vadiraj Joshi on GitHub">
                    <img src="/assets/github.svg" alt="GitHub icon" loading="lazy" className='w-1/2 h-1/2' />
                </a>

                <a href="https://linkedin.com/in/vadiraj-joshi220504" target="_blank" rel="noopener noreferrer" className='social-icon' aria-label="Vadiraj Joshi on LinkedIn">
                    <img src="/assets/linkedin.svg" alt="LinkedIn icon" loading="lazy" className='w-1/2 h-1/2' />
                </a>

                <a href="https://leetcode.com/u/Vadiraj_22/" target="_blank" rel="noopener noreferrer" className='social-icon' aria-label="Vadiraj Joshi on LeetCode">
                    <img src="/assets/leetcode.svg" alt="LeetCode icon" loading="lazy" className='w-1/2 h-1/2' />
                </a>
            </div>
            <p className='text-white-500 mx-auto text-sm'>© {new Date().getFullYear()} Vadiraj Joshi. All rights reserved.</p>
        </footer>
    )
}

export default Footer