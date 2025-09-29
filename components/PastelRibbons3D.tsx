"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function PastelRibbons() {
  const ribbon1Ref = useRef<THREE.Mesh>(null);
  const ribbon2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (ribbon1Ref.current) {
      ribbon1Ref.current.rotation.y = time * 0.2;
      ribbon1Ref.current.position.y = Math.sin(time * 0.8) * 0.5;
    }

    if (ribbon2Ref.current) {
      ribbon2Ref.current.rotation.y = -time * 0.15;
      ribbon2Ref.current.position.x = Math.cos(time * 0.6) * 1;
    }
  });

  // Create curved paths for ribbons
  const curve1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4, -2, 0),
    new THREE.Vector3(-2, 0, 2),
    new THREE.Vector3(0, 2, -1),
    new THREE.Vector3(2, 0, 1),
    new THREE.Vector3(4, -1, 0),
  ]);

  const curve2 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3, 1, -1),
    new THREE.Vector3(-1, -1, 1),
    new THREE.Vector3(1, 1, 2),
    new THREE.Vector3(3, -2, -1),
  ]);

  return (
    <>
      <mesh ref={ribbon1Ref}>
        <tubeGeometry args={[curve1, 50, 0.4, 8, false]} />
        <meshStandardMaterial
          color="#35E3ED"
          transparent
          opacity={0.8}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>

      <mesh ref={ribbon2Ref} position={[1, 0, -1]}>
        <tubeGeometry args={[curve2, 40, 0.3, 8, false]} />
        <meshStandardMaterial
          color="#A044FF"
          transparent
          opacity={0.7}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
    </>
  );
}

export default function PastelRibbons3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={0.6} color="#35E3ED" />

        <PastelRibbons />
      </Canvas>
    </div>
  );
}