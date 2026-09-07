import React, { Suspense, useState } from 'react'
import { myProjects } from '../constants'
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import CanvasLoader from '../components/CanvasLoader';
import DemoComputer from '../components/DemoComputer';
import { useInView } from '../hooks/useInView';


const projectCount = myProjects.length;

const Projects = () => {
    const [containerRef, isInView] = useInView()
    const [selectedProjectindex, setselectedProjectindex] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const currentProject = myProjects[selectedProjectindex];

    const handleNavigation = (direction) => {
        setselectedProjectindex((prevIndex) => {
            if (direction === 'previous') {
                return prevIndex === 0 ? projectCount - 1 : prevIndex - 1
            } else {
                return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
            }
        })
        setIsExpanded(false) // Reset expansion when changing projects
    }

    const getCombinedText = () => {
        const combinedText = `${currentProject.desc} ${currentProject.subdesc}`;
        const words = combinedText.split(' ');

        if (isExpanded) {
            return combinedText;
        }

        if (words.length <= 40) {
            return combinedText;
        }

        return words.slice(0, 40).join(' ') + '...';
    }

    const shouldShowReadMore = () => {
        const combinedText = `${currentProject.desc} ${currentProject.subdesc}`;
        return combinedText.split(' ').length > 40;
    }

    return (
        <section id="projects" className='c-space my-20'>
            <div className="mb-12">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Featured Work</p>
                <h2 className='head-text'>My Projects</h2>
            </div>

            <div className='grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full'>
                <div className='portfolio-card flex flex-col justify-between sm:p-10 relative py-10 px-5 overflow-hidden'>
                    <div className='absolute top-0 right-0 pointer-events-none opacity-80'>
                        <img src={currentProject.spotlight} alt={`${currentProject.title} spotlight background`} loading="lazy" className='w-full h-96 object-cover rounded-2xl' />
                    </div>
                    <div className='p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-xl relative z-10' style={currentProject.logoStyle}>
                        <img src={currentProject.logo} alt={`${currentProject.title} logo`} loading="lazy" className='w-10 h-10 shadow-sm' />
                    </div>
                    <div className='flex flex-col gap-4 text-white-600 my-5 relative z-10'>
                        <h3 className='text-white text-2xl font-semibold animatedText'>{currentProject.title}</h3>
                        <p className='animatedText leading-relaxed'>
                            {getCombinedText()}
                        </p>
                        {shouldShowReadMore() && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className='text-amber-400/90 cursor-pointer underline hover:text-amber-300 transition-colors text-left w-fit text-sm font-medium'
                                aria-label={isExpanded ? 'Collapse description' : 'Expand description'}
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </button>
                        )}
                    </div>
                    <div className='flex gap-5 flex-wrap justify-between items-center relative z-10 pt-4 border-t border-white/5'>
                        <div className='flex items-center gap-3'>
                            {currentProject.tags.map((tag, index) => (
                                <div key={index} className='tech-logo'>
                                    <img src={tag.path} alt={`${tag.name} icon`} loading="lazy" />
                                </div>
                            ))}
                        </div>
                        <a 
                            className='flex gap-2 items-center cursor-pointer text-white-600 hover:text-amber-400 transition-colors' 
                            href={currentProject.href} 
                            target='_blank' 
                            rel='noopener noreferrer'
                            aria-label={`Check live site for ${currentProject.title}`}
                        >
                            <p className="text-sm font-medium">Check live site</p>
                            <img src="/assets/arrow-up.png" alt="external link arrow" className='w-3 h-3' />
                        </a>
                    </div>
                    <div className='flex justify-between items-center mt-7 relative z-10'>
                        <button 
                            className='arrow-btn' 
                            onClick={() => handleNavigation('previous')}
                            aria-label="Previous Project"
                        >
                            <img src="/assets/left-arrow.png" alt="previous project arrow" className='w-4 h-4' />
                        </button>
                        <button 
                            className='arrow-btn' 
                            onClick={() => handleNavigation('next')}
                            aria-label="Next Project"
                        >
                            <img src="/assets/right-arrow.png" alt="next project arrow" className='w-4 h-4' />
                        </button>
                    </div>
                </div>
                <div ref={containerRef} className='portfolio-card h-96 md:h-full relative hidden lg:block overflow-hidden'>
                    <Canvas frameloop={isInView ? 'always' : 'never'} dpr={[1, 1.5]}>
                        <ambientLight intensity={Math.PI} />
                        <directionalLight position={[10, 10, 5]} />
                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                                    <DemoComputer texture={currentProject.texture} />
                                </group>
                            </Suspense>
                        </Center>
                        <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
                    </Canvas>
                    <div className='absolute bottom-4 left-0 right-0 flex justify-center'>
                        <lord-icon
                            src="https://cdn.lordicon.com/evxithfv.json"
                            trigger="loop"
                            colors="primary:#ffffff,secondary:#f59e0b"
                            style={{ width: '40px', height: '40px' }}>
                        </lord-icon>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects