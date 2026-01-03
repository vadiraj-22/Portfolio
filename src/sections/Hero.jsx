import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import DesktopPC from '../components/DesktopPC'
import CanvasLoader from '../components/CanvasLoader'
import { useMediaQuery } from 'react-responsive'
import { calculateSizes } from '../constants'
import Target from '../components/Target'
import ReactLogo from '../components/ReactLogo'
import Cube from '../components/Cube'
import Rings from '../components/Rings'
import HeroCamera from '../components/HeroCamera'
import Button from '../components/Button'

const Hero = () => {
    // const x = useControls('HackerRoom', {
    //     positionX: {
    //         value: 2.5,
    //         min: -10,
    //         max: 10
    //     },
    //     positionY: {
    //         value: 2.5,
    //         min: -10,
    //         max: 10
    //     },
    //     positionZ: {
    //         value: 2.5,
    //         min: -10,
    //         max: 10
    //     },
    //     rotationX: {
    //         value: 0,
    //         min: -10,
    //         max: 10
    //     }, rotationY: {
    //         value: 0,
    //         min: -10,
    //         max: 10
    //     }, rotationZ: {
    //         value: 0,
    //         min: -10,
    //         max: 10
    //     },
    //     scale :{
    //         value:1,
    //         min:0.1,
    //         max:10
    //     }
    // })
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ maxWidth: 768, minWidth: 1024 });

    const sizes = calculateSizes(isSmall, isMobile, isTablet)

    return (
        <section className='min-h-screen w-full flex flex-col relative'>
            <div className='mx-auto sm:mt-36 mt-20 c-space gap-3 w-full '>
                <p className='sm:text-3xl text-2xl font-medium  text-white text-center font-generalsans'>Hi, I am Vadiraj Joshi <span className='waving-hand'>✋</span> </p>
                <p className='hero_tag text-gray_gradient '>
                    Full Stack Web Application Developer
                </p>


            </div>

            <div className='w-full h-full absolute inset-0'>
                {/* <Leva /> */}
                <Canvas className='w-full h-full '>
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 20]} />

                        <HeroCamera isMobile={isMobile}>
                            <DesktopPC
                                scale={sizes.deskScale}
                                position={sizes.deskPosition}
                                rotation={[0, 0, 0]}
                            />
                        </HeroCamera>


                        <group>
                            {!isMobile && <Target position={sizes.targetPosition} />}
                            {!isMobile && <ReactLogo position={sizes.reactLogoPosition} />}
                            {!isMobile && <Cube position={sizes.cubePosition} />}
                            {!isMobile && <Rings position={sizes.ringPosition} />}

                        </group>

                        {/* Soft ambient light for overall scene illumination */}
                        <ambientLight intensity={0.6} color="#ffff00" />
                        
                        {/* Top-down white light to illuminate keyboard and CPU */}
                        <directionalLight 
                            position={[0, 15, 5]} 
                            intensity={0.8} 
                            color="#ffffff"
                            castShadow
                            shadow-mapSize={[2048, 2048]}
                            shadow-camera-far={50}
                            shadow-camera-left={-10}
                            shadow-camera-right={10}
                            shadow-camera-top={10}
                            shadow-camera-bottom={-10}
                        />
                        
                        {/* Additional soft top lighting for keyboard area */}
                        <directionalLight 
                            position={[0, 12, 8]} 
                            intensity={0.4} 
                            color="#f8f9fa"
                        />
                        
                        {/* Subtle side lighting for depth */}
                        <directionalLight position={[10, 8, 10]} intensity={0.2} />
                        
                        {/* Environmental hemisphere lighting */}
                        <hemisphereLight 
                            skyColor="#ffffff" 
                            groundColor="#333333" 
                            intensity={0.3} 
                        />
                        
                        {/* Rim lighting for better definition */}
                        <directionalLight 
                            position={[-8, 6, -8]} 
                            intensity={0.15} 
                            color="#4a90e2"
                        />
                        
                        {/* Front lighting to separate CPU from black background */}
                        <directionalLight 
                            position={[0, 5, 15]} 
                            intensity={0.6} 
                            color="#ffffff"
                        />
                        
                        {/* Additional front-angled light for better definition */}
                        <directionalLight 
                            position={[5, 3, 12]} 
                            intensity={0.5} 
                            color="#f0f0f0"
                        />
                        
                        {/* Left front light for CPU separation */}
                        <directionalLight 
                            position={[-8, 4, 10]} 
                            intensity={0.4} 
                            color="#ffffff"
                        />
                        
                        {/* Right front light for balanced illumination */}
                        <directionalLight 
                            position={[8, 4, 10]} 
                            intensity={0.4} 
                            color="#ffffff"
                        />
                    </Suspense>
                </Canvas>
                <div className='absolute bottom-7 left-0 right-0 w-full z-10 c-space'>
                    <div className='flex flex-col items-center gap-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/evxithfv.json"
                            trigger="loop"
                            colors="primary:#ffffff,secondary:#08a88a"
                            style={{ width: '50px', height: '50px' }}>
                        </lord-icon>
                        <a href="#about" className='w-fit'>
                            <Button name="Lets work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96 " />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero