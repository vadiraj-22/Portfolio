import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { myProjects } from '../constants';

const defaultPlaylist = [
    'https://res.cloudinary.com/dchtvtkhi/video/upload/v1786899016/mainPC_nlvdkx.mp4',
    ...myProjects.map((p) => p.texture).filter(Boolean),
];

/**
 * Creates and configures a video element for texture use.
 * Returns the video element ready for Three.js VideoTexture.
 */
const createVideoElement = (src) => {
    const video = document.createElement('video');
    video.src = src;
    video.crossOrigin = 'anonymous';
    video.loop = false;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    return video;
};

/**
 * Creates a properly configured THREE.VideoTexture
 */
const createVideoTexture = (video) => {
    const texture = new THREE.VideoTexture(video);
    texture.flipY = false;
    texture.center.set(0.5, 0.5);
    texture.rotation = 0;
    texture.repeat.set(1, -1);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
};

const DesktopPC = ({ playlist = defaultPlaylist, ...props }) => {
    const { nodes, scene } = useGLTF('/models/desktop_pc/scene.gltf');
    const groupRef = useRef();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTexture, setActiveTexture] = useState(null);

    // Refs for video pool management
    const currentVideoRef = useRef(null);
    const nextVideoRef = useRef(null);
    const textureRef = useRef(null);
    const screenMaterialRef = useRef(null);

    const rootObject = useMemo(() => {
        return nodes.Scene || nodes.Sketchfab_Scene || nodes.Sketchfab_model || nodes.RootNode || scene;
    }, [nodes, scene]);

    // Get next random index (different from current)
    const getNextIndex = useCallback((current) => {
        if (playlist.length <= 1) return 0;
        let next = Math.floor(Math.random() * playlist.length);
        while (next === current) {
            next = Math.floor(Math.random() * playlist.length);
        }
        return next;
    }, [playlist.length]);

    // Pre-buffer the next video
    const preBufferNext = useCallback((currentIdx) => {
        const nextIdx = getNextIndex(currentIdx);
        const nextSrc = encodeURI(playlist[nextIdx]);

        // Clean up old next video
        if (nextVideoRef.current) {
            nextVideoRef.current.pause();
            nextVideoRef.current.src = '';
            nextVideoRef.current.load();
        }

        const nextVideo = createVideoElement(nextSrc);
        nextVideo._playlistIndex = nextIdx;
        nextVideo.load();
        nextVideoRef.current = nextVideo;
    }, [playlist, getNextIndex]);

    // Initialize first video
    useEffect(() => {
        const src = encodeURI(playlist[currentIndex]);
        const video = createVideoElement(src);

        const onCanPlay = () => {
            video.playbackRate = 2.0;
            const texture = createVideoTexture(video);
            textureRef.current = texture;
            setActiveTexture(texture);
            video.play().catch(() => {});

            // Pre-buffer the next video
            preBufferNext(currentIndex);
        };

        const onEnded = () => {
            // Swap to pre-buffered next video instantly
            if (nextVideoRef.current) {
                const nextVideo = nextVideoRef.current;
                const nextIdx = nextVideo._playlistIndex;

                // Clean up current
                if (currentVideoRef.current) {
                    currentVideoRef.current.pause();
                    currentVideoRef.current.src = '';
                    currentVideoRef.current.load();
                }

                // Make next become current
                currentVideoRef.current = nextVideo;
                nextVideoRef.current = null;

                nextVideo.playbackRate = 2.0;
                const newTexture = createVideoTexture(nextVideo);

                // Dispose old texture
                if (textureRef.current) {
                    textureRef.current.dispose();
                }
                textureRef.current = newTexture;
                setActiveTexture(newTexture);
                setCurrentIndex(nextIdx);

                nextVideo.play().catch(() => {});

                // Set up ended listener for the new current video
                nextVideo.addEventListener('ended', onEnded);

                // Pre-buffer the next one
                preBufferNext(nextIdx);
            }
        };

        video.addEventListener('canplay', onCanPlay, { once: true });
        video.addEventListener('ended', onEnded);
        currentVideoRef.current = video;
        video.load();

        return () => {
            video.removeEventListener('canplay', onCanPlay);
            video.removeEventListener('ended', onEnded);
            video.pause();
            video.src = '';
            video.load();

            if (nextVideoRef.current) {
                nextVideoRef.current.pause();
                nextVideoRef.current.src = '';
                nextVideoRef.current.load();
            }

            if (textureRef.current) {
                textureRef.current.dispose();
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    // Apply texture to screen mesh
    useEffect(() => {
        if (rootObject && activeTexture) {
            rootObject.traverse((child) => {
                if (child.isMesh) {
                    if (
                        child.name.includes('MY SCREEN') ||
                        child.name.includes('SCREEN') ||
                        child.material?.name === 'Material.074_30'
                    ) {
                        if (screenMaterialRef.current) {
                            screenMaterialRef.current.dispose();
                        }
                        const mat = new THREE.MeshBasicMaterial({
                            map: activeTexture,
                            toneMapped: false,
                        });
                        child.material = mat;
                        screenMaterialRef.current = mat;
                    }
                }
            });
        }
    }, [rootObject, activeTexture]);

    // Keep texture updating each frame
    useFrame(() => {
        if (textureRef.current && currentVideoRef.current && !currentVideoRef.current.paused) {
            textureRef.current.needsUpdate = true;
        }
    });

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