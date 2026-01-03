import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Target = (props) => {
    const targetRef = useRef();

    useGSAP(() => {
        if (targetRef.current) {
            gsap.to(targetRef.current.position, {
                y: "+=0.5",
                duration: 1.5,
                yoyo: true,
                repeat: -1,
                ease: "power2.inOut"
            })
        }
    })

    return (
        <mesh {...props} ref={targetRef}>
            {/* Target stand - using simple geometry as fallback */}
            <group rotation={[0, Math.PI / 5, 0]} scale={2}>
                {/* Base */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
                    <meshStandardMaterial color="#f2f2f2" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Stand */}
                <mesh position={[0, 0.75, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
                    <meshStandardMaterial color="#f2f2f2" metalness={0.6} roughness={0.3} />
                </mesh>
                {/* Target rings */}
                <group position={[0, 1.5, 0]}>
                    <mesh>
                        <ringGeometry args={[0.4, 0.5, 32]} />
                        <meshStandardMaterial color="#ff0000" side={2} />
                    </mesh>
                    <mesh>
                        <ringGeometry args={[0.3, 0.4, 32]} />
                        <meshStandardMaterial color="#ffffff" side={2} />
                    </mesh>
                    <mesh>
                        <ringGeometry args={[0.2, 0.3, 32]} />
                        <meshStandardMaterial color="#ff0000" side={2} />
                    </mesh>
                    <mesh>
                        <circleGeometry args={[0.2, 32]} />
                        <meshStandardMaterial color="#ffffff" side={2} />
                    </mesh>
                </group>
            </group>
        </mesh>
    )
}

export default Target