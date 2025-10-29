'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// Shared mouse position state
const mousePositionState = { x: 0, y: 0 }

// First OLED Layer Component
function OLEDLayer1() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle oscillation
      const time = state.clock.elapsedTime
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.1

      // Mouse interaction - slight rotation
      meshRef.current.rotation.x = mousePositionState.y * 0.1
      meshRef.current.rotation.y = mousePositionState.x * 0.1

      // Color intensity based on mouse proximity
      const distance = Math.sqrt(mousePositionState.x * mousePositionState.x + mousePositionState.y * mousePositionState.y)
      const intensity = Math.max(0.3, 1 - distance * 0.5)

      if (meshRef.current.material) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = intensity
      }
    }
  })

  return (
    <RoundedBox
      ref={meshRef}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[6, 3, 0.2]}
      radius={0.1}
      smoothness={4}
    >
      <meshStandardMaterial
        color="#007BFF"
        emissive="#007BFF"
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
        wireframe={false}
      />
    </RoundedBox>
  )
}

// Second OLED Layer Component
function OLEDLayer2() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle oscillation with slight offset
      const time = state.clock.elapsedTime
      meshRef.current.position.y = Math.sin(time * 0.5 + 0.5) * 0.1

      // Mouse interaction - slight rotation
      meshRef.current.rotation.x = mousePositionState.y * 0.08
      meshRef.current.rotation.y = mousePositionState.x * 0.08

      // Color intensity based on mouse proximity
      const distance = Math.sqrt(mousePositionState.x * mousePositionState.x + mousePositionState.y * mousePositionState.y)
      const intensity = Math.max(0.25, 0.8 - distance * 0.4)

      if (meshRef.current.material) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = intensity
      }
    }
  })

  return (
    <RoundedBox
      ref={meshRef}
      position={[0, -0.4, -0.8]}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[5.5, 2.8, 0.18]}
      radius={0.09}
      smoothness={4}
    >
      <meshStandardMaterial
        color="#007BFF"
        emissive="#007BFF"
        emissiveIntensity={0.25}
        transparent
        opacity={0.7}
        wireframe={false}
      />
    </RoundedBox>
  )
}

// Third OLED Layer Component
function OLEDLayer3() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle oscillation with more offset
      const time = state.clock.elapsedTime
      meshRef.current.position.y = Math.sin(time * 0.5 + 1.0) * 0.1

      // Mouse interaction - slight rotation
      meshRef.current.rotation.x = mousePositionState.y * 0.06
      meshRef.current.rotation.y = mousePositionState.x * 0.06

      // Color intensity based on mouse proximity
      const distance = Math.sqrt(mousePositionState.x * mousePositionState.x + mousePositionState.y * mousePositionState.y)
      const intensity = Math.max(0.2, 0.6 - distance * 0.3)

      if (meshRef.current.material) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = intensity
      }
    }
  })

  return (
    <RoundedBox
      ref={meshRef}
      position={[0, -0.8, -1.6]}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[5, 2.5, 0.15]}
      radius={0.08}
      smoothness={4}
    >
      <meshStandardMaterial
        color="#007BFF"
        emissive="#007BFF"
        emissiveIntensity={0.2}
        transparent
        opacity={0.6}
        wireframe={false}
      />
    </RoundedBox>
  )
}









export default function Hero3D() {
  // Handle mouse movement
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mousePositionState.x = (event.clientX / window.innerWidth) * 2 - 1
    mousePositionState.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [6, 2, 4], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <directionalLight position={[-5, 3, -2]} intensity={0.4} />
        <pointLight position={[3, 2, 2]} intensity={0.8} color="#007BFF" />
        <pointLight position={[-3, 1, -1]} intensity={0.5} color="#007BFF" />

        {/* Orbit controls for better viewing */}
        <OrbitControls
          enablePan={true}
          enableZoom={false}
          enableRotate={true}
          autoRotate={false}
          target={[0, -0.4, -0.8]}
        />

        {/* Three OLED layers separated in depth */}
        <OLEDLayer1 />
        <OLEDLayer2 />
        <OLEDLayer3 />

        <fog attach="fog" args={['#000000', 8, 20]} />
      </Canvas>
    </div>
  )
}
