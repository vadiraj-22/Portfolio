import { useRef } from 'react';
import { Float, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/**
 * NodeLogo — uses the actual Node.js logo PNG as a texture
 * on a simple flat plane that naturally faces the camera.
 */
const NodeLogo = (props) => {
    const texture = useTexture('/assets/nodejs.png');
    const glowRef = useRef();
    const meshRef = useRef();

    // Pulsating glow + gentle Y spin
    useFrame(({ clock }) => {
        if (glowRef.current)
            glowRef.current.intensity = 0.6 + Math.sin(clock.elapsedTime * 2) * 0.3;
        if (meshRef.current)
            meshRef.current.rotation.y += 0.006;
    });

    return (
        <Float floatIntensity={1.5} speed={2} rotationIntensity={0}>
            <group {...props} dispose={null}>
                {/* Soft green glow behind the logo */}
                <pointLight
                    ref={glowRef}
                    position={[0, 0, 1]}
                    intensity={0.9}
                    color="#68a063"
                    distance={5}
                    decay={2}
                />

                <group ref={meshRef}>
                    {/* Slight depth backing plane */}
                    <mesh position={[0, 0, -0.05]}>
                        <planeGeometry args={[2.6, 2.6]} />
                        <meshStandardMaterial
                            color="#1a1a1a"
                            transparent
                            opacity={0.2}
                        />
                    </mesh>

                    {/* Logo texture plane — faces +Z (camera) naturally */}
                    <mesh>
                        <planeGeometry args={[2.5, 2.5]} />
                        <meshStandardMaterial
                            map={texture}
                            transparent
                            alphaTest={0.05}
                            toneMapped={false}
                        />
                    </mesh>
                </group>
            </group>
        </Float>
    );
};

export default NodeLogo;
