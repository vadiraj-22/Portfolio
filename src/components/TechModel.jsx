import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * TechModel – a floating stylised smartphone/device shape
 * built entirely from Three.js primitives (no external .gltf).
 * Replaces the Target archery model in the Hero scene.
 */
const TechModel = (props) => {
    const groupRef = useRef();
    const screenRef = useRef();
    const glowRef = useRef();

    // Floating animation
    useGSAP(() => {
        if (groupRef.current) {
            gsap.to(groupRef.current.position, {
                y: `+=${0.6}`,
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: 'power2.inOut',
            });
            gsap.to(groupRef.current.rotation, {
                y: `+=${Math.PI * 2}`,
                duration: 12,
                repeat: -1,
                ease: 'none',
            });
        }
    });

    // Pulsating screen glow
    useFrame(({ clock }) => {
        if (glowRef.current) {
            glowRef.current.intensity = 0.6 + Math.sin(clock.elapsedTime * 2) * 0.3;
        }
    });

    return (
        <group ref={groupRef} {...props} dispose={null}>
            {/* Screen glow light */}
            <pointLight
                ref={glowRef}
                position={[0, 0, 0.6]}
                intensity={0.8}
                color="#00d4ff"
                distance={4}
                decay={2}
            />

            {/* ── Phone body ── */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.9, 1.7, 0.12]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.9}
                    roughness={0.15}
                />
            </mesh>

            {/* ── Screen bezel ── */}
            <mesh position={[0, 0, 0.063]}>
                <boxGeometry args={[0.78, 1.45, 0.01]} />
                <meshStandardMaterial color="#111133" metalness={0.3} roughness={0.8} />
            </mesh>

            {/* ── Screen (emissive glow) ── */}
            <mesh ref={screenRef} position={[0, 0.05, 0.068]}>
                <boxGeometry args={[0.72, 1.2, 0.005]} />
                <meshStandardMaterial
                    color="#001133"
                    emissive="#0077ff"
                    emissiveIntensity={0.6}
                    metalness={0.1}
                    roughness={0.5}
                />
            </mesh>

            {/* ── Home button indicator ── */}
            <mesh position={[0, -0.75, 0.068]}>
                <cylinderGeometry args={[0.06, 0.06, 0.01, 32]} />
                <meshStandardMaterial
                    color="#222244"
                    emissive="#4488ff"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* ── Front camera dot ── */}
            <mesh position={[0, 0.75, 0.068]}>
                <cylinderGeometry args={[0.025, 0.025, 0.01, 32]} />
                <meshStandardMaterial color="#000011" emissive="#001133" emissiveIntensity={0.3} />
            </mesh>

            {/* ── Side button (power) ── */}
            <mesh position={[0.455, 0.2, 0]}>
                <boxGeometry args={[0.02, 0.18, 0.06]} />
                <meshStandardMaterial color="#2a2a4a" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* ── Volume buttons ── */}
            <mesh position={[-0.455, 0.3, 0]}>
                <boxGeometry args={[0.02, 0.12, 0.05]} />
                <meshStandardMaterial color="#2a2a4a" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.455, 0.12, 0]}>
                <boxGeometry args={[0.02, 0.12, 0.05]} />
                <meshStandardMaterial color="#2a2a4a" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* ── Floating code lines on screen (decorative) ── */}
            {[0.35, 0.2, 0.05, -0.1, -0.25, -0.4].map((y, i) => (
                <mesh key={i} position={[-0.1 + (i % 2) * 0.05, y, 0.074]}>
                    <boxGeometry args={[0.25 + (i % 3) * 0.1, 0.025, 0.002]} />
                    <meshStandardMaterial
                        color={['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'][i]}
                        emissive={['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'][i]}
                        emissiveIntensity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default TechModel;
