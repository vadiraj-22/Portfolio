/*
Desktop PC 3D Model Component
Replaces the HackerRoom model with a desktop PC
*/

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';

const DesktopPC = (props) => {
    const { nodes } = useGLTF('/models/desktop_pc/scene.gltf');
    const groupRef = useRef();

    return (
        <group {...props} dispose={null} ref={groupRef}>
            {/* Main overhead lighting for the entire PC setup */}
            <spotLight
                position={[0, 8, 0]}
                angle={0.8}
                penumbra={0.5}
                intensity={2}
                castShadow
                shadow-mapSize={[1024, 1024]}
                color="#ffffff"
            />
            
            {/* CPU case lighting from above-left */}
            <spotLight
                position={[-3, 6, 2]}
                angle={0.6}
                penumbra={0.3}
                intensity={1.5}
                castShadow
                color="#4a90e2"
                target-position={[-1, 0, 0]}
            />
            
            {/* CPU case lighting from above-right */}
            <spotLight
                position={[3, 6, 2]}
                angle={0.6}
                penumbra={0.3}
                intensity={1.5}
                castShadow
                color="#e24a90"
                target-position={[1, 0, 0]}
            />
            
            {/* Monitor screen glow */}
            <pointLight
                position={[0, 3, 3]}
                intensity={0.8}
                color="#00ffff"
                distance={8}
                decay={2}
            />
            
            {/* Keyboard area lighting */}
            <spotLight
                position={[0, 4, 4]}
                angle={0.4}
                penumbra={0.2}
                intensity={1}
                color="#ffffff"
            />
            
            {/* CPU internal RGB lighting effect */}
            <pointLight
                position={[-1, 2, 0]}
                intensity={0.6}
                color="#ff6b6b"
                distance={3}
                decay={1}
            />
            
            <pointLight
                position={[1, 2, 0]}
                intensity={0.6}
                color="#4ecdc4"
                distance={3}
                decay={1}
            />

            <group scale={[0.01, 0.01, 0.01]} rotation={[Math.PI / 36, -Math.PI / 2, 0]}>
                <primitive object={nodes.Scene || nodes.RootNode || nodes.Sketchfab_Scene} />
            </group>
        </group>
    );
}

useGLTF.preload('/models/desktop_pc/scene.gltf');
export default DesktopPC;