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
            {/* Natural workstation ambient setup lighting */}
            {/* Soft bias light behind monitor */}
            <pointLight
                position={[0, 3.5, -2.5]}
                intensity={1.8}
                color="#f8fafc"
                distance={12}
                decay={1.8}
            />
            {/* Top-back rim light to softly outline monitor bezel */}
            <directionalLight
                position={[0, 6, -3]}
                intensity={0.8}
                color="#e2e8f0"
            />

            {/* Overhead natural soft desk downlight */}
            <spotLight
                position={[0, 7, 1]}
                angle={0.8}
                penumbra={0.6}
                intensity={1.2}
                castShadow
                shadow-mapSize={[1024, 1024]}
                color="#ffffff"
            />
            
            {/* Monitor screen subtle forward illumination onto keyboard/desk */}
            <pointLight
                position={[0, 2.2, 1.8]}
                intensity={0.8}
                color="#f1f5f9"
                distance={6}
                decay={2}
            />
            
            {/* Subtle natural internal PC illumination */}
            <pointLight
                position={[-1, 2, 0]}
                intensity={0.4}
                color="#e2e8f0"
                distance={3}
                decay={1.5}
            />

            <group scale={[1, 1, 1]} rotation={[Math.PI / 36, -Math.PI / 2, 0]}>
                <primitive object={rootObject} />
            </group>
        </group>
    );
};

useGLTF.preload('/models/desktop_pc/scene.gltf');
export default DesktopPC;