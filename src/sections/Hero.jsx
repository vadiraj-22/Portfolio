import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import DesktopPC from '../components/DesktopPC'
import CanvasLoader from '../components/CanvasLoader'
import { useMediaQuery } from 'react-responsive'
import { calculateSizes } from '../constants'
import HeroCamera from '../components/HeroCamera'
import Button from '../components/Button'
import PerspectiveGrid from '../components/PerspectiveGrid'
import VignetteOverlay from '../components/VignetteOverlay'
import { useInView } from '../hooks/useInView'

const Hero = () => {
    const [heroRef, isInView] = useInView()
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ maxWidth: 768, minWidth: 1024 });

    const sizes = calculateSizes(isSmall, isMobile, isTablet)

    return (
        <section ref={heroRef} id="home" className='min-h-screen w-full flex flex-col relative' aria-label="Hero Section">
            <div className='mx-auto sm:mt-36 mt-32 c-space gap-3 w-full relative z-20'>
                <h1 className='sm:text-2xl text-2xl font-medium text-white text-center font-generalsans'>
                    Hi, I'm <span className="font-bold">Vadiraj Joshi</span> <span className='waving-hand'>✋</span>
                    <span className="sr-only"> - Welcome to my Developer Portfolio</span>
                </h1>
                <p className='hero_tag text-gray_gradient '>
                    Full-Stack Developer — MERN &amp; AI-Powered Web Apps
                </p>
            </div>

            <div className='w-full h-full absolute inset-0'>
                {/* <Leva /> */}
                <Canvas className='w-full h-full' frameloop={isInView ? 'always' : 'never'} dpr={[1, 1.5]}>
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 20]} />

                        {/* Vignette Overlay - Behind everything */}
                        <VignetteOverlay position={[0, 0, -25]} />

                        {/* Infinite Natural Perspective Grid placed safely below the PC model */}
                        <PerspectiveGrid 
                            position={[0, -7.5, 0]}
                            cellColor="#363a4d"
                            sectionColor="#5a607a"
                            fadeDistance={70}
                            fadeStrength={1.0}
                        />

                        <HeroCamera isMobile={isMobile}>
                            <DesktopPC
                                scale={sizes.deskScale}
                                position={sizes.deskPosition}
                                rotation={[0.03, 0, 0]}
                            />
                        </HeroCamera>

                        {/* Natural ambient studio lighting (no artificial tint) */}
                        <ambientLight intensity={0.75} color="#ffffff" />

                        {/* Natural hemisphere light: clean daylight from above, soft dark bounce from ground */}
                        <hemisphereLight
                            skyColor="#ffffff"
                            groundColor="#18181b"
                            intensity={0.5}
                        />

                        {/* Primary key light: Natural top-right daylight */}
                        <directionalLight
                            position={[6, 12, 8]}
                            intensity={1.1}
                            color="#ffffff"
                            castShadow
                            shadow-mapSize={[1024, 1024]}
                            shadow-camera-far={50}
                        />

                        {/* Soft front fill light to soften shadows naturally */}
                        <directionalLight
                            position={[-6, 6, 8]}
                            intensity={0.45}
                            color="#f1f5f9"
                        />

                        {/* Subtle top rim light to separate setup from background */}
                        <directionalLight
                            position={[0, 8, -6]}
                            intensity={0.5}
                            color="#cbd5e1"
                        />
                    </Suspense>
                </Canvas>
                
                {/* Left, Right, and Top Edge Vignette Overlays */}
                <div className='absolute inset-0 pointer-events-none'>
                    {/* Left edge fade to black */}
                    <div className='absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-black/90 to-transparent'></div>
                    {/* Right edge fade to black */}
                    <div className='absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-black/90 to-transparent'></div>
                    {/* Top edge fade - gentle subtle blend to preserve 3D screen depth and backlight */}
                    <div className='absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/70 via-black/20 to-transparent'></div>
                </div>
                
                <div className='absolute bottom-7 left-0 right-0 w-full z-10 c-space'>
                    <div className='flex flex-col items-center gap-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/evxithfv.json"
                            trigger="loop"
                            colors="primary:#ffffff,secondary:#f59e0b"
                            style={{ width: '50px', height: '50px' }}>
                        </lord-icon>
                        <a href="#about" className='w-fit'>
                            <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96 " />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero