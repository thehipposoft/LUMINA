'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Shared mouse position state
const mousePositionState = { x: 0, y: 0 }

// Wide OLED Display Component with surface waves
function WideOLEDDisplay() {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometryRef = useRef<THREE.PlaneGeometry>(null)

  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      const time = state.clock.elapsedTime
      const geometry = geometryRef.current
      const positionAttribute = geometry.attributes.position

      // Create waves on the surface by modifying vertices
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i)
        const y = positionAttribute.getY(i)

        // Multiple wave patterns across the surface
        const wave1 = Math.sin(x * 0.1 + time * 1.5) * 0.3
        const wave2 = Math.sin(y * 0.15 + time * 1.2) * 0.2
        const wave3 = Math.sin((x + y) * 0.08 + time * 0.8) * 0.15
        const ripple = Math.sin(Math.sqrt(x * x + y * y) * 0.1 - time * 2.0) * 0.1

        // Combine waves for complex surface motion
        const z = wave1 + wave2 + wave3 + ripple

        // Add mouse interaction (adjusted for wider display)
        const mouseInfluence = Math.exp(-((x - mousePositionState.x * 35) ** 2 + (y - mousePositionState.y * 12) ** 2) / 150)
        const mouseWave = mouseInfluence * Math.sin(time * 3.0) * 0.4

        positionAttribute.setZ(i, z + mouseWave)
      }

      positionAttribute.needsUpdate = true
      geometry.computeVertexNormals()

      // Keep the display centered and stable
      meshRef.current.rotation.x = -Math.PI / 2
      meshRef.current.position.set(0, 0, 0)

      // Dynamic color intensity with pulsing effect
      const distance = Math.sqrt(mousePositionState.x * mousePositionState.x + mousePositionState.y * mousePositionState.y)
      const pulseIntensity = Math.sin(time * 2.0) * 0.3 + 0.7
      const intensity = Math.max(0.4, pulseIntensity + (1.2 - distance * 0.3))

      if (meshRef.current.material) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = intensity
        // Add color variation based on waves
        const colorShift = Math.sin(time * 1.5) * 0.1
        material.emissive.setRGB(0, 0.48 + colorShift, 1)
      }
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry ref={geometryRef} args={[100, 12, 200, 24]} />
      <meshStandardMaterial
        color="#007BFF"
        emissive="#007BFF"
        emissiveIntensity={0.4}
        transparent
        opacity={0.85}
        wireframe={false}
        side={THREE.DoubleSide}
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
        camera={{ position: [0, 18, 25], fov: 85 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[20, 10, 10]} intensity={0.9} />
        <directionalLight position={[-20, 8, -6]} intensity={0.6} />
        <pointLight position={[15, 6, 8]} intensity={1.2} color="#007BFF" />
        <pointLight position={[-15, 6, 8]} intensity={1.2} color="#007BFF" />
        <pointLight position={[0, 8, 10]} intensity={1.0} color="#ffffff" />
        <pointLight position={[40, 6, 8]} intensity={0.8} color="#007BFF" />
        <pointLight position={[-40, 6, 8]} intensity={0.8} color="#007BFF" />
        <pointLight position={[50, 8, 10]} intensity={0.6} color="#007BFF" />
        <pointLight position={[-50, 8, 10]} intensity={0.6} color="#007BFF" />
        <pointLight position={[70, 10, 12]} intensity={0.5} color="#007BFF" />
        <pointLight position={[-70, 10, 12]} intensity={0.5} color="#007BFF" />
        <pointLight position={[85, 12, 15]} intensity={0.4} color="#007BFF" />
        <pointLight position={[-85, 12, 15]} intensity={0.4} color="#007BFF" />

        {/* Orbit controls - only horizontal panning allowed */}
        <OrbitControls
          enablePan={true}
          enableZoom={false}
          enableRotate={false}
          autoRotate={false}
          target={[0, 0, 0]}
        />

        {/* Single wide OLED display spanning the container */}
        <WideOLEDDisplay />

        <fog attach="fog" args={['#000000', 40, 80]} />
      </Canvas>
    </div>
  )
}
