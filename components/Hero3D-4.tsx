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

        // Multiple wave patterns across the surface (more prominent amplitudes)
        const wave1 = Math.sin(x * 0.1 + time * 1.5) * 0.6  // Increased from 0.3 to 0.6
        const wave2 = Math.sin(y * 0.15 + time * 1.2) * 0.4  // Increased from 0.2 to 0.4
        const wave3 = Math.sin((x + y) * 0.08 + time * 0.8) * 0.3  // Increased from 0.15 to 0.3
        const ripple = Math.sin(Math.sqrt(x * x + y * y) * 0.1 - time * 2.0) * 0.2  // Increased from 0.1 to 0.2

        // Combine waves for complex surface motion
        const z = wave1 + wave2 + wave3 + ripple

        // Add mouse interaction (adjusted for wider display, more prominent)
        const mouseInfluence = Math.exp(-((x - mousePositionState.x * 35) ** 2 + (y - mousePositionState.y * 12) ** 2) / 150)
        const mouseWave = mouseInfluence * Math.sin(time * 3.0) * 0.8  // Increased from 0.4 to 0.8

        positionAttribute.setZ(i, z + mouseWave)
      }

      positionAttribute.needsUpdate = true
      geometry.computeVertexNormals()

      // Keep the display centered and stable
      meshRef.current.rotation.x = -Math.PI / 2
      meshRef.current.position.set(0, 0, 0)

      // Create lighting effect that follows mouse cursor
      const mouseX = mousePositionState.x * 50 // Scale to match display width
      const mouseY = mousePositionState.y * 6  // Scale to match display height

      // Update vertex colors based on mouse position
      const colorAttribute = geometry.attributes.color
      if (!colorAttribute) {
        // Create color attribute if it doesn't exist
        const colors = new Float32Array(positionAttribute.count * 3)
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      }

      const colors = geometry.attributes.color
      const baseColor = new THREE.Color(0x004488) // Lighter blue base - more visible
      const activeColor = new THREE.Color(0x00CCFF) // Super bright neon cyan when "on"

      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i)
        const y = positionAttribute.getY(i)

        // Calculate distance from mouse position
        const distanceFromMouse = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2)

        // Create circular light area around cursor
        const lightRadius = 8 // Size of the lit area
        const intensity = Math.max(0, 1 - (distanceFromMouse / lightRadius))
        const smoothIntensity = intensity * intensity * (3 - 2 * intensity) // Smooth step function

        // Blend between off and on colors
        const currentColor = baseColor.clone().lerp(activeColor, smoothIntensity)

        colors.setXYZ(i, currentColor.r, currentColor.g, currentColor.b)
      }

      colors.needsUpdate = true

      if (meshRef.current.material) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial
        // High emissive intensity for bright neon effect
        material.emissiveIntensity = 0.6
        material.emissive.setHex(0x002244) // Brighter base glow
        material.color.setHex(0xFFFFFF) // White base to show vertex colors properly
        material.vertexColors = true // Enable vertex colors
      }
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry ref={geometryRef} args={[100, 12, 200, 24]} />
      <meshStandardMaterial
        color="#FFFFFF"
        emissive="#000000"
        emissiveIntensity={0.1}
        transparent={true}
        opacity={0.8}
        wireframe={false}
        side={THREE.DoubleSide}
        vertexColors={true}
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
        <ambientLight intensity={0.4} />
        <directionalLight position={[20, 10, 10]} intensity={0.6} />
        <directionalLight position={[-20, 8, -6]} intensity={0.5} />
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
