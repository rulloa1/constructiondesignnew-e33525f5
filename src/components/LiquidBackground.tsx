import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BlobProps {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}

const Blob = ({ position, color, scale, speed }: BlobProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  // Create custom geometry for organic blob shape
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 4);
    const positions = geo.attributes.position;
    
    // Add noise to vertices for organic shape
    for (let i = 0; i < positions.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positions, i);
      
      // Add randomness to create blob shape
      const noise = Math.sin(i * 0.5) * Math.cos(i * 0.3) * 0.2;
      vertex.normalize().multiplyScalar(1 + noise);
      
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    positions.needsUpdate = true;
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    time.current += delta * speed;
    
    // Organic floating motion
    meshRef.current.position.y = position[1] + Math.sin(time.current) * 0.5;
    meshRef.current.position.x = position[0] + Math.cos(time.current * 0.5) * 0.3;
    
    // Morphing effect
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
    
    // Pulsing scale
    const pulseScale = 1 + Math.sin(time.current * 2) * 0.1;
    meshRef.current.scale.setScalar(scale * pulseScale);
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshPhongMaterial
        color={color}
        transparent
        opacity={0.15}
        shininess={100}
        emissive={color}
        emissiveIntensity={0.05}
      />
    </mesh>
  );
};

export const LiquidBackground = () => {
  // Generate multiple blobs with different properties
  const blobs = useMemo(() => [
    { position: [-3, 0, -5] as [number, number, number], color: '#C8A062', scale: 2.5, speed: 0.3 },
    { position: [3, 2, -8] as [number, number, number], color: '#8B0000', scale: 3, speed: 0.25 },
    { position: [0, -2, -6] as [number, number, number], color: '#4A5568', scale: 2.2, speed: 0.35 },
    { position: [-2, 3, -10] as [number, number, number], color: '#C8A062', scale: 2.8, speed: 0.28 },
    { position: [4, -1, -7] as [number, number, number], color: '#6B8CAE', scale: 2.4, speed: 0.32 },
    { position: [-4, -3, -9] as [number, number, number], color: '#8B0000', scale: 2.6, speed: 0.27 },
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#C8A062" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8B0000" />
        <pointLight position={[0, 10, -10]} intensity={0.2} color="#6B8CAE" />
        
        {blobs.map((blob, i) => (
          <Blob key={i} {...blob} />
        ))}
        
        {/* Additional atmospheric fog effect */}
        <fog attach="fog" args={['#1a1f2e', 5, 20]} />
      </Canvas>
    </div>
  );
};
