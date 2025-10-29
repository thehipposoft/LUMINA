'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Shared mouse position state
const mousePositionState = { x: 0, y: 0 }

// Flexible OLED Layer Component
function FlexibleOLEDLayer1() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry
      const positions = geometry.attributes.position

      // Apply symmetric flexibility deformation
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)

        // Create synchronized wave-like bending effect
        const bendStrength = 0.3
        const waveFrequency = 0.5
        const flexZ = Math.sin(x * waveFrequency + time * 0.8) * bendStrength +
                     Math.sin(y * waveFrequency * 0.7 + time * 0.6) * bendStrength * 0.5

        // Mouse interaction for additional bending
        const mouseDistance = Math.sqrt(
          Math.pow(x - mousePositionState.x * 3, 2) +
          Math.pow(y - mousePositionState.y * 1.5, 2)
        )
        const mouseBend = Math.max(0, 1 - mouseDistance / 2) * 0.4

        positions.setZ(i, flexZ + mouseBend)
      }

      positions.needsUpdate = true

      // Gentle oscillation
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
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[6, 3, 40, 20]} />
      <meshStandardMaterial
        color="#007BFF"
        emissive="#007BFF"
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  )
}

// Flexible OLED Layer Component 2
function FlexibleOLEDLayer2() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry
      const positions = geometry.attributes.position

      // Apply symmetric flexibility deformation (same as layer 1)
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)

        // Create synchronized wave-like bending effect
        const bendStrength = 0.25 // Slightly reduced for middle layer
        const waveFrequency = 0.5
        const flexZ = Math.sin(x * waveFrequency + time * 0.8) * bendStrength +
                     Math.sin(y * waveFrequency * 0.7 + time * 0.6) * bendStrength * 0.5

        // Mouse interaction for additional bending
        const mouseDistance = Math.sqrt(
          Math.pow(x - mousePositionState.x * 2.8, 2) +
          Math.pow(y - mousePositionState.y * 1.4, 2)
        )
        const mouseBend = Math.max(0, 1 - mouseDistance / 2) * 0.35

        positions.setZ(i, flexZ + mouseBend)
      }

      positions.needsUpdate = true

      // Gentle oscillation with slight offset
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
    <mesh ref={meshRef} position={[0, -0.4, -0.8]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5.5, 2.8, 35, 18]} />
      <meshStandardMaterial
        color="#007BFF"
        emissive="#007BFF"
        emissiveIntensity={0.25}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  )
}

// Flexible OLED Layer Component 3
function FlexibleOLEDLayer3() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry
      const positions = geometry.attributes.position

      // Apply symmetric flexibility deformation (same as layers 1 & 2)
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)

        // Create synchronized wave-like bending effect
        const bendStrength = 0.2 // Most subtle for background layer
        const waveFrequency = 0.5
        const flexZ = Math.sin(x * waveFrequency + time * 0.8) * bendStrength +
                     Math.sin(y * waveFrequency * 0.7 + time * 0.6) * bendStrength * 0.5

        // Mouse interaction for additional bending
        const mouseDistance = Math.sqrt(
          Math.pow(x - mousePositionState.x * 2.5, 2) +
          Math.pow(y - mousePositionState.y * 1.25, 2)
        )
        const mouseBend = Math.max(0, 1 - mouseDistance / 2.5) * 0.3

        positions.setZ(i, flexZ + mouseBend)
      }

      positions.needsUpdate = true

      // Gentle oscillation with more offset
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
    <mesh ref={meshRef} position={[0, -0.8, -1.6]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5, 2.5, 30, 15]} />
      <meshStandardMaterial
        color="#007BFF"
        emissive="#007BFF"
        emissiveIntensity={0.2}
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
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

        {/* Three flexible OLED layers separated in depth */}
        <FlexibleOLEDLayer1 />
        <FlexibleOLEDLayer2 />
        <FlexibleOLEDLayer3 />

        <fog attach="fog" args={['#000000', 8, 20]} />
      </Canvas>
    </div>
  )
}
