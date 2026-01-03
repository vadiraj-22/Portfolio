import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useRef, useEffect, useState } from 'react'


const HeroCamera = ({ children, isMobile }) => {
    const groupRef = useRef();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame((state, delta) => {
        // Calculate scroll-based camera movement
        const scrollProgress = Math.min(scrollY / window.innerHeight, 1);
        const cameraY = scrollProgress * 2; // Move camera up as we scroll down
        const cameraZ = 20 - scrollProgress * 2; // Move camera closer as we scroll
        
        easing.damp3(state.camera.position, [0, cameraY, cameraZ], 0.25, delta);

        if (!isMobile) {
            // Enhanced rotation with scroll influence
            const baseRotationY = Math.max(-0.3, Math.min(0.3, -state.pointer.y/2.5));
            const scrollRotationX = scrollProgress * 0.2; // Additional X rotation based on scroll
            const pointerRotationX = -state.pointer.x/2.5;
            
            // Combine scroll and pointer rotations
            const finalRotationY = baseRotationY + scrollRotationX;
            const finalRotationX = pointerRotationX;
            
            easing.dampE(groupRef.current.rotation, [finalRotationY, finalRotationX, 0], 0.25, delta);
        }
    })

    return (
        <group ref={groupRef} scale={isMobile?1:1.2}>{children}</group>
    )
}

export default HeroCamera