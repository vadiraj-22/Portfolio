import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import HackerRoom from '../components/HackerRoom'
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
                <p className='sm:text-2xl text-2xl font-medium text-white text-center font-generalsans'>Hi, I am Vadiraj <span className='waving-hand'>✋</span> </p>
                <p className='hero_tag text-gray_gradient'> Building Websites and Tools</p>
            </div>

            <div className='w-full h-full absolute inset-0'>
                {/* <Leva /> */}
                <Canvas className='w-full h-full '>
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 20]} />

                        <HeroCamera isMobile={isMobile}>
                            <HackerRoom
                                scale={sizes.deskScale}
                                position={sizes.deskPosition}
                                rotation={[0, 3.2, 0]}
                            />
                        </HeroCamera>


                        <group>
                            <Target position={sizes.targetPosition} />
                            <ReactLogo position={sizes.reactLogoPosition} />
                            <Cube position={sizes.cubePosition} />
                            <Rings position={sizes.ringPosition} />

                        </group>

                        <ambientLight intensity={1} />
                        <directionalLight position={[10, 10, 10]} intensity={0.5} />
                    </Suspense>
                </Canvas>
                <div className='absolute bottom-7 left-0 right-0 w-full z-10 c-space'>
                    <a href="#about" className='w-fit'>
                       <Button name ="Lets work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96 " />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Hero