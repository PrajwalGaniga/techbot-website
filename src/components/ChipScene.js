import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Float } from "@react-three/drei";
import { useRef } from "react";

function Chip() {
  const chipRef = useRef();
  // Slow rotation for that premium feel
  useFrame(() => {
    chipRef.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={chipRef}>
      <boxGeometry args={[2.5, 0.2, 2.5]} />
      <meshStandardMaterial 
        color="#111" 
        metalness={0.8} 
        roughness={0.2} 
      />
    </mesh>
  );
}

function GlowLines() {
  return (
    <group rotation={[0, 0, 0]}>
      {/* Dynamic Circuit-like Lines */}
      <Line
        points={[[-2, 0.2, 0], [0, 0.2, 1], [2, 0.2, 0]]}
        color="#00ffff"
        lineWidth={1}
      />
      <Line
        points={[[-1.5, 0.2, -1.5], [0, 0.2, 0], [1.5, 0.2, 1.5]]}
        color="#00ffff"
        lineWidth={1}
      />
    </group>
  );
}

export default function ChipScene() {
  return (
    <div style={{ width: "100%", height: "450px" }}>
      <Canvas camera={{ position: [0, 3, 7], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffff" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Chip />
          <GlowLines />
        </Float>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}