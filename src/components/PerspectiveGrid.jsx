import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PerspectiveGrid = ({ 
  size = 50, 
  divisions = 50, 
  color1 = '#ffffff', 
  color2 = '#000000',
  fadeDistance = 30,
  position = [0, -5, 0]
}) => {
  const gridRef = useRef();

  // Create custom grid with perspective effect
  const createPerspectiveGrid = () => {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({ 
      vertexColors: true,
      transparent: true,
      opacity: 0.35
    });

    const vertices = [];
    const colors = [];
    const halfSize = size / 2;
    const step = size / divisions;

    const color1Obj = new THREE.Color(color1);
    const color2Obj = new THREE.Color(color2);

    // Create grid lines parallel to X axis (horizontal lines going left-right)
    for (let i = 0; i <= divisions; i++) {
      const z = -halfSize + (i * step);
      
      // Fade lines as they go back (toward top of screen)
      const distanceRatio = (z + halfSize) / size; // 0 at front, 1 at back
      const depthFade = 1.0 - (distanceRatio * 0.5); // Fade from 1.0 to 0.5
      
      vertices.push(-halfSize, 0, z);
      vertices.push(halfSize, 0, z);
      
      const useWhite = i % 2 === 0;
      const lineColor = useWhite ? color1Obj : color2Obj;
      
      // Apply edge fading to left and right - increased visibility
      const leftEdgeFade = 0.6; // Increased from 0.2
      const rightEdgeFade = 0.6; // Increased from 0.2
      
      colors.push(lineColor.r * depthFade * leftEdgeFade, lineColor.g * depthFade * leftEdgeFade, lineColor.b * depthFade * leftEdgeFade);
      colors.push(lineColor.r * depthFade * rightEdgeFade, lineColor.g * depthFade * rightEdgeFade, lineColor.b * depthFade * rightEdgeFade);
    }

    // Create grid lines parallel to Z axis (lines converging to vanishing point at top)
    for (let i = 0; i <= divisions; i++) {
      const x = -halfSize + (i * step);
      
      // Calculate left-right edge fading based on screen position
      const normalizedX = x / halfSize; // -1 at left edge, 1 at right edge
      const edgeDistance = Math.abs(normalizedX); // 0 at center, 1 at edges
      
      // Smooth fade at edges using smoothstep-like function
      const fadeStart = 0.7; // Start fading later (was 0.6)
      const edgeFadeAmount = edgeDistance > fadeStart 
        ? 1.0 - ((edgeDistance - fadeStart) / (1.0 - fadeStart)) 
        : 1.0;
      const edgeFade = Math.pow(edgeFadeAmount, 1.5); // Less aggressive fade
      
      // Front (bottom of screen, more visible)
      const frontAlpha = 1.0 * edgeFade;
      // Back (top of screen, converging point, less visible)
      const backAlpha = 0.5 * edgeFade; // Increased from 0.4
      
      vertices.push(x, 0, -halfSize); // Front
      vertices.push(x, 0, halfSize);  // Back
      
      const useWhite = i % 2 === 0;
      const lineColor = useWhite ? color1Obj : color2Obj;
      
      // Fade from front to back and at left/right edges
      colors.push(lineColor.r * frontAlpha, lineColor.g * frontAlpha, lineColor.b * frontAlpha);
      colors.push(lineColor.r * backAlpha, lineColor.g * backAlpha, lineColor.b * backAlpha);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return { geometry, material };
  };

  const { geometry, material } = createPerspectiveGrid();

  return (
    <lineSegments 
      ref={gridRef} 
      geometry={geometry} 
      material={material}
      position={position}
      rotation={[0.35, 0, 0]}
    />
  );
};

export default PerspectiveGrid;
