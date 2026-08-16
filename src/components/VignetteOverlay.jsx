import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

const VignetteOverlay = ({ position = [0, 0, -20] }) => {
  const meshRef = useRef();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          float vignette = smoothstep(0.8, 0.3, dist);
          float leftEdge = smoothstep(0.0, 0.25, vUv.x);
          float rightEdge = smoothstep(1.0, 0.75, vUv.x);
          float topEdge = smoothstep(0.0, 0.4, vUv.y);
          float edgeFade = leftEdge * rightEdge * topEdge;
          float alpha = 1.0 - (vignette * edgeFade);
          gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  return (
    <mesh ref={meshRef} position={position} material={material}>
      <planeGeometry args={[150, 100]} />
    </mesh>
  );
};

export default VignetteOverlay;
