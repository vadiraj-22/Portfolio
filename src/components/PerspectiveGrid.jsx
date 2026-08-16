import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

const PerspectiveGrid = ({ 
  size = 50, 
  divisions = 50, 
  color1 = '#ffffff', 
  color2 = '#000000',
  position = [0, -5, 0]
}) => {
  const gridRef = useRef();

  // Create custom grid with perspective effect (memoized to avoid re-creation on every render)
  const { geometry, material } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const mat = new THREE.LineBasicMaterial({ 
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

    for (let i = 0; i <= divisions; i++) {
      const z = -halfSize + (i * step);
      const distanceRatio = (z + halfSize) / size;
      const depthFade = 1.0 - (distanceRatio * 0.5);
      
      vertices.push(-halfSize, 0, z);
      vertices.push(halfSize, 0, z);
      
      const useWhite = i % 2 === 0;
      const lineColor = useWhite ? color1Obj : color2Obj;
      const leftEdgeFade = 0.6;
      const rightEdgeFade = 0.6;
      
      colors.push(lineColor.r * depthFade * leftEdgeFade, lineColor.g * depthFade * leftEdgeFade, lineColor.b * depthFade * leftEdgeFade);
      colors.push(lineColor.r * depthFade * rightEdgeFade, lineColor.g * depthFade * rightEdgeFade, lineColor.b * depthFade * rightEdgeFade);
    }

    for (let i = 0; i <= divisions; i++) {
      const x = -halfSize + (i * step);
      const normalizedX = x / halfSize;
      const edgeDistance = Math.abs(normalizedX);
      const fadeStart = 0.7;
      const edgeFadeAmount = edgeDistance > fadeStart 
        ? 1.0 - ((edgeDistance - fadeStart) / (1.0 - fadeStart)) 
        : 1.0;
      const edgeFade = Math.pow(edgeFadeAmount, 1.5);
      
      const frontAlpha = 1.0 * edgeFade;
      const backAlpha = 0.5 * edgeFade;
      
      vertices.push(x, 0, -halfSize);
      vertices.push(x, 0, halfSize);
      
      const useWhite = i % 2 === 0;
      const lineColor = useWhite ? color1Obj : color2Obj;
      
      colors.push(lineColor.r * frontAlpha, lineColor.g * frontAlpha, lineColor.b * frontAlpha);
      colors.push(lineColor.r * backAlpha, lineColor.g * backAlpha, lineColor.b * backAlpha);
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return { geometry: geom, material: mat };
  }, [size, divisions, color1, color2]);

  // Clean up WebGL resources when component unmounts
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

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
