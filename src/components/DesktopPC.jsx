import { useGLTF, useVideoTexture } from '@react-three/drei';
import { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { myProjects } from '../constants';

const defaultPlaylist = [
    'https://res.cloudinary.com/dchtvtkhi/video/upload/v1786899016/mainPC_nlvdkx.mp4',
    ...myProjects.map((p) => p.texture).filter(Boolean),
];

const DesktopPC = ({ playlist = defaultPlaylist, ...props }) => {
    const { nodes, scene } = useGLTF('/models/desktop_pc/scene.gltf');
    const groupRef = useRef();

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentTexturePath = playlist[currentIndex] || playlist[0];

    const rootObject = useMemo(() => {
        return nodes.Scene || nodes.Sketchfab_Scene || nodes.Sketchfab_model || nodes.RootNode || scene;
    }, [nodes, scene]);

    const safeVideoUrl = useMemo(() => encodeURI(currentTexturePath), [currentTexturePath]);

    // Video texture for main hero computer display
    const txt = useVideoTexture(safeVideoUrl, {
        unsuspend: 'canplay',
        muted: true,
        loop: false,
        start: true,
    });

    // Play video at 2x speed and continuously cycle through project demos
    useEffect(() => {
        if (!txt) return;

        const videoEl = txt.image;
        if (videoEl) {
            videoEl.playbackRate = 2.0; // 2x playback speed

            const handleEnded = () => {
                setCurrentIndex((prev) => {
                    if (playlist.length <= 1) return 0;
                    let randomIndex = Math.floor(Math.random() * playlist.length);
                    while (randomIndex === prev) {
                        randomIndex = Math.floor(Math.random() * playlist.length);
                    }
                    return randomIndex;
                });
            };

            videoEl.addEventListener('ended', handleEnded);

            // Ensure video plays at 2x speed
            videoEl.play().catch(() => {});

            return () => {
                videoEl.removeEventListener('ended', handleEnded);
            };
        }
    }, [txt, playlist]);

    useEffect(() => {
        if (txt) {
            txt.flipY = false;
            txt.center.set(0.5, 0.5);
            txt.rotation = 0;
            txt.repeat.set(1, -1);
            txt.colorSpace = THREE.SRGBColorSpace;
            txt.minFilter = THREE.LinearFilter;
            txt.magFilter = THREE.LinearFilter;
            txt.generateMipmaps = false;
            txt.anisotropy = 16;
            txt.needsUpdate = true;
        }
    }, [txt]);

    useEffect(() => {
        if (rootObject && txt) {
            rootObject.traverse((child) => {
                if (child.isMesh) {
                    if (
                        child.name.includes('MY SCREEN') ||
                        child.name.includes('SCREEN') ||
                        child.material?.name === 'Material.074_30'
                    ) {
                        if (child.material && child.material.isMaterial) {
                            child.material.dispose();
                        }
                        child.material = new THREE.MeshBasicMaterial({
                            map: txt,
                            toneMapped: false,
                        });
                    }
                }
            });
        }
    }, [rootObject, txt]);

    if (!rootObject) return null;

    return (
        <group {...props} dispose={null} ref={groupRef}>
            {/* REALISTIC AMBIENT SETUP BACKLIGHTING (WALL GLOW BEHIND MONITOR) */}
            {/* Central blue wall backlight glow behind monitor */}
            <pointLight
                position={[0, 3.5, -2.5]}
                intensity={4.5}
                color="#3b82f6"
                distance={16}
                decay={1.5}
            />
            {/* Left side purple wall backlight glow */}
            <pointLight
                position={[-3.5, 3.2, -2.5]}
                intensity={3.5}
                color="#8b5cf6"
                distance={14}
                decay={1.5}
            />
            {/* Right side cyan wall backlight glow */}
            <pointLight
                position={[3.5, 3.2, -2.5]}
                intensity={3.5}
                color="#06b6d4"
                distance={14}
                decay={1.5}
            />
            {/* Top-back rim backlight highlighting monitor bezel contours */}
            <directionalLight
                position={[0, 6, -4]}
                intensity={1.8}
                color="#93c5fd"
            />

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
                color="#4a90e2"
                target-position={[-1, 0, 0]}
            />
            
            {/* CPU case lighting from above-right */}
            <spotLight
                position={[3, 6, 2]}
                angle={0.6}
                penumbra={0.3}
                intensity={1.5}
                color="#e24a90"
                target-position={[1, 0, 0]}
            />
            
            {/* Monitor screen forward glow onto keyboard/desk */}
            <pointLight
                position={[0, 2.5, 2]}
                intensity={1.5}
                color="#38bdf8"
                distance={7}
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

            <group scale={[1, 1, 1]} rotation={[Math.PI / 36, -Math.PI / 2, 0]}>
                <primitive object={rootObject} />
            </group>
        </group>
    );
};

useGLTF.preload('/models/desktop_pc/scene.gltf');
export default DesktopPC;