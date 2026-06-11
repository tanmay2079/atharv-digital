'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function CameraShape({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation?: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation ? new THREE.Euler(...rotation) : new THREE.Euler(0, 0, 0)} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.4]} />
        <MeshDistortMaterial color="#3b82f6" speed={2} distort={0.2} radius={0.3} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.35, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.25]}>
        <ringGeometry args={[0.1, 0.2, 24]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function FloatingTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[0.8, 0.12, 16, 48]} />
        <meshPhysicalMaterial color={color} transparent opacity={0.25} roughness={0.2} metalness={0.8} wireframe={false} />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.004;
      ref.current.rotation.y += 0.006;
      ref.current.rotation.z += 0.002;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.5, 0]} />
        <MeshDistortMaterial color={color} speed={1.5} distort={0.3} transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

function Particles({ count = 100 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#3b82f6" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        <directionalLight position={[-5, -5, -5]} intensity={0.1} color="#3b82f6" />
        <CameraShape position={[-3.5, 1.5, -2]} rotation={[0.3, 0.5, 0]} scale={0.8} />
        <CameraShape position={[4, -1.5, -3]} rotation={[-0.2, -0.4, 0.1]} scale={0.6} />
        <FloatingTorus position={[-2, -2, -4]} color="#3b82f6" />
        <FloatingTorus position={[3, 2.5, -5]} color="#60a5fa" />
        <FloatingIcosahedron position={[0, 3, -6]} color="#93c5fd" />
        <FloatingIcosahedron position={[-4, -3, -5]} color="#818cf8" />
        <Particles count={150} />
      </Canvas>
    </div>
  );
}
