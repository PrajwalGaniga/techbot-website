import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';

// --- THEME COLORS ---
const THEME = {
  primary: "#0ea5e9", // Electric Cyan
  secondary: "#6366f1", // Neon Indigo
  gold: "#FFD700",      // Gold Pins
  darkBody: "#050505",  // Deep Black
  matte: "#111111"      // Matte Grey
};

function ChipPins({ count = 8, spacing = 0.3 }) {
  const pins = useMemo(() => {
    const pinArray = [];
    const offset = ((count - 1) * spacing) / 2;
    
    // Left side pins
    for (let i = 0; i < count; i++) {
      pinArray.push({
        position: [-1.5, -0.15, -offset + i * spacing],
        rotation: [0, 0, 0]
      });
    }
    
    // Right side pins
    for (let i = 0; i < count; i++) {
      pinArray.push({
        position: [1.5, -0.15, -offset + i * spacing],
        rotation: [0, 0, 0]
      });
    }
    
    return pinArray;
  }, [count, spacing]);

  return (
    <group>
      {pins.map((pin, i) => (
        <mesh key={i} position={pin.position} rotation={pin.rotation} castShadow>
          <boxGeometry args={[0.15, 0.08, 0.08]} />
          <meshStandardMaterial 
            color={THEME.gold} 
            metalness={1} 
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function CircuitPattern() {
  const circuitLines = useMemo(() => {
    const lines = [];
    const gridSize = 8;
    const step = 2.4 / gridSize;
    
    // Create grid pattern
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Randomly generate circuit traces
        if (Math.random() > 0.6) {
          lines.push({
            start: [-1.2 + i * step, 0.12, -1.2 + j * step],
            end: [-1.2 + (i + 1) * step, 0.12, -1.2 + j * step]
          });
        }
        if (Math.random() > 0.6) {
          lines.push({
            start: [-1.2 + i * step, 0.12, -1.2 + j * step],
            end: [-1.2 + i * step, 0.12, -1.2 + (j + 1) * step]
          });
        }
      }
    }
    return lines;
  }, []);

  return (
    <group>
      {circuitLines.map((line, i) => (
        <mesh key={i} position={[
          (line.start[0] + line.end[0]) / 2,
          line.start[1],
          (line.start[2] + line.end[2]) / 2
        ]}>
          <boxGeometry args={[
            Math.abs(line.end[0] - line.start[0]) || 0.03,
            0.01,
            Math.abs(line.end[2] - line.start[2]) || 0.03
          ]} />
          <meshStandardMaterial 
            color={THEME.primary} 
            emissive={THEME.primary}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function ChipLabel() {
  return (
    <group position={[0, 0.13, 0.7]}>
      {/* Manufacturer logo area */}
      <mesh>
        <planeGeometry args={[0.8, 0.3]} />
        <meshStandardMaterial 
          color="#ffffff"
          metalness={0.5}
          roughness={0.2}
          opacity={0.8}
          transparent
        />
      </mesh>
      
      {/* Status Dot */}
      <mesh position={[-1.0, 0.01, -1.0]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial 
          color={THEME.secondary}
          emissive={THEME.secondary}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function ICChip() {
  const chipRef = useRef();
  
  // Slow, premium rotation logic
  useFrame((state) => {
    if (chipRef.current) {
      // Gentle floating rotation
      chipRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      chipRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <group ref={chipRef}>
      {/* Main chip body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3, 0.25, 2.8]} />
        <meshStandardMaterial 
          color={THEME.matte}
          metalness={0.6}
          roughness={0.7}
        />
      </mesh>
      
      {/* Top surface detail (The Core) */}
      <mesh position={[0, 0.13, 0]} castShadow>
        <boxGeometry args={[2.6, 0.01, 2.4]} />
        <meshPhysicalMaterial 
          color={THEME.darkBody}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      <CircuitPattern />
      <ChipLabel />
      <ChipPins count={10} spacing={0.25} />
      
      {/* Corner mounting holes (Visual Detail) */}
      {[
        [-1.4, 0.13, -1.3],
        [1.4, 0.13, -1.3],
        [-1.4, 0.13, 1.3],
        [1.4, 0.13, 1.3]
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
          <meshStandardMaterial 
            color="#333"
            metalness={1}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// --- MAIN EXPORT ---
export default function ChipScene() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      minHeight: '450px',
      background: 'transparent' // Let the section gradient show through
    }}>
      <Canvas 
        // UPDATED: Closer camera position [2.5, 3, 3] to make object look bigger
        camera={{ position: [3, 4, 4], fov: 45 }}
        shadows
        dpr={[1, 2]} // Crisp rendering
        gl={{ antialias: true, alpha: true }}
      >
        {/* Cinematic Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={2} 
          color="#ffffff"
          castShadow
        />
        {/* Accent Light - Cyan */}
        <pointLight position={[-5, 2, -5]} intensity={2} color={THEME.primary} distance={10} />
        {/* Accent Light - Indigo */}
        <pointLight position={[5, -2, 5]} intensity={2} color={THEME.secondary} distance={10} />
        
        {/* Float Animation Wrapper */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <ICChip />
        </Float>
        
        {/* Ground Shadow for Depth */}
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.5} 
          scale={10} 
          blur={2} 
          far={4}
          color={THEME.primary} 
        />
        
        {/* Studio Environment Reflections */}
        <Environment preset="city" />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}