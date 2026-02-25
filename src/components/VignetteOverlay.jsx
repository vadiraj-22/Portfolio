import { useRef } from 'react';
import * as THREE from 'three';

const VignetteOverlay = ({ position = [0, 0, -20] }) => {
  const meshRef = useRef();

  // Create a large plane with gradient material
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      
      // Create vignette effect
      float vignette = smoothstep(0.8, 0.3, dist);
      
      // Stronger fade at edges
      float leftEdge = smoothstep(0.0, 0.25, vUv.x);
      float rightEdge = smoothstep(1.0, 0.75, vUv.x);
      float topEdge = smoothstep(0.0, 0.4, vUv.y);
      
      float edgeFade = leftEdge * rightEdge * topEdge;
      
      float alpha = 1.0 - (vignette * edgeFade);
      
      gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  });

  return (
    <mesh ref={meshRef} position={position} material={material}>
      <planeGeometry args={[150, 100]} />
    </mesh>
  );
};

export default VignetteOverlay;
