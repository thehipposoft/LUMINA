'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Shared mouse position state
const mousePositionState = { x: 0, y: 0 }

// Static Grid with Wave Effect - Particles in fixed grid positions with floating wave motion
function StaticWaveGrid() {
  const particlesRef = useRef<THREE.Points>(null)

  // Grid parameters
  const gridWidth = 40
  const gridHeight = 20
  const spacing = 4
  const particleCount = gridWidth * gridHeight

  // Create static grid with wave data
  const gridData = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const basePositions = new Float32Array(particleCount * 3) // Store original positions
    const waveParams = []

    let index = 0
    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        const i3 = index * 3

        // Calculate grid position
        const posX = (x - gridWidth / 2) * spacing
        const posY = (y - gridHeight / 2) * spacing
        const posZ = Math.random() * 20 - 10 // Random depth

        // Store base positions
        basePositions[i3] = posX
        basePositions[i3 + 1] = posY
        basePositions[i3 + 2] = posZ

        // Initial positions (same as base)
        positions[i3] = posX
        positions[i3 + 1] = posY
        positions[i3 + 2] = posZ

        // Wave parameters for each particle
        waveParams.push({
          phaseX: Math.random() * Math.PI * 2, // Random phase for X wave
          phaseY: Math.random() * Math.PI * 2, // Random phase for Y wave
          amplitudeX: 0.5 + Math.random() * 1.0, // Wave amplitude in X
          amplitudeY: 0.3 + Math.random() * 0.7, // Wave amplitude in Y
          amplitudeZ: 0.2 + Math.random() * 0.5, // Wave amplitude in Z
          frequencyX: 0.8 + Math.random() * 0.4, // Wave frequency in X
          frequencyY: 1.0 + Math.random() * 0.5, // Wave frequency in Y
          frequencyZ: 0.6 + Math.random() * 0.3  // Wave frequency in Z
        })

        // Colors - warm orange-yellow spectrum like original
        const intensity = 0.8 + Math.random() * 0.2
        colors[i3] = 1.0 * intensity     // r - full red
        colors[i3 + 1] = (0.6 + Math.random() * 0.4) * intensity // g - variable orange-yellow
        colors[i3 + 2] = 0.1 * intensity // b - minimal blue

        // Sizes with slight variation
        sizes[index] = 0.8 + Math.random() * 0.4

        index++
      }
    }

    return { positions, colors, sizes, basePositions, waveParams }
  }, [gridWidth, gridHeight, spacing, particleCount])

  useFrame((state) => {
    if (particlesRef.current && gridData.waveParams) {
      const time = state.clock.elapsedTime
      const positionAttribute = particlesRef.current.geometry.attributes.position

      // Apply wave motion to each particle in the grid
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const waveParam = gridData.waveParams[i]

        // Get base position
        const baseX = gridData.basePositions[i3]
        const baseY = gridData.basePositions[i3 + 1]
        const baseZ = gridData.basePositions[i3 + 2]

        // Calculate wave offsets
        const waveX = Math.sin(time * waveParam.frequencyX + waveParam.phaseX) * waveParam.amplitudeX
        const waveY = Math.sin(time * waveParam.frequencyY + waveParam.phaseY) * waveParam.amplitudeY
        const waveZ = Math.sin(time * waveParam.frequencyZ + waveParam.phaseX) * waveParam.amplitudeZ

        // Apply waves to base position
        let finalX = baseX + waveX
        let finalY = baseY + waveY
        const finalZ = baseZ + waveZ

        // Subtle mouse interaction - slight attraction to cursor
        const mouseX = mousePositionState.x * 30
        const mouseY = mousePositionState.y * 15
        const distanceFromMouse = Math.sqrt((finalX - mouseX) ** 2 + (finalY - mouseY) ** 2)

        if (distanceFromMouse < 15) {
          const attraction = (1 - distanceFromMouse / 15) * 0.5
          finalX += (mouseX - finalX) * attraction * 0.1
          finalY += (mouseY - finalY) * attraction * 0.1
        }

        positionAttribute.setXYZ(i, finalX, finalY, finalZ)
      }

      positionAttribute.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={gridData.positions}
          itemSize={3}
          args={[gridData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={gridData.colors}
          itemSize={3}
          args={[gridData.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={gridData.sizes}
          itemSize={1}
          args={[gridData.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2.0}
        transparent={true}
        opacity={0.8}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={false}
      />
    </points>
  )
}

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

        // Multiple wave patterns across the surface (much more prominent amplitudes)
        const wave1 = Math.sin(x * 0.1 + time * 1.5) * 1.2  // Increased from 0.6 to 1.2
        const wave2 = Math.sin(y * 0.15 + time * 1.2) * 0.8  // Increased from 0.4 to 0.8
        const wave3 = Math.sin((x + y) * 0.08 + time * 0.8) * 0.6  // Increased from 0.3 to 0.6
        const ripple = Math.sin(Math.sqrt(x * x + y * y) * 0.1 - time * 2.0) * 0.4  // Increased from 0.2 to 0.4

        // Add bump effects for surface texture
        const bump1 = Math.sin(x * 0.3 + time * 2.0) * Math.cos(y * 0.25 + time * 1.8) * 0.3  // Small frequent bumps
        const bump2 = Math.sin(x * 0.15 + time * 0.9) * Math.sin(y * 0.2 + time * 1.1) * 0.5   // Medium bumps
        const bump3 = Math.cos(x * 0.05 + time * 0.6) * Math.sin(y * 0.08 + time * 0.7) * 0.4  // Large slow bumps

        // Traveling bump waves
        const travelBump1 = Math.sin((x + time * 8) * 0.2) * Math.exp(-Math.abs(y) * 0.05) * 0.6  // Horizontal traveling bumps
        const travelBump2 = Math.cos((y + time * 6) * 0.18) * Math.exp(-Math.abs(x) * 0.02) * 0.4 // Vertical traveling bumps

        // Combine waves and bumps for complex surface motion
        const z = wave1 + wave2 + wave3 + ripple + bump1 + bump2 + bump3 + travelBump1 + travelBump2

        // Add mouse interaction (adjusted for wider display, much more prominent)
        const mouseInfluence = Math.exp(-((x - mousePositionState.x * 50) ** 2 + (y - mousePositionState.y * 14) ** 2) / 200)
        const mouseWave = mouseInfluence * Math.sin(time * 3.0) * 1.5  // Increased from 0.8 to 1.5

        // Mouse-induced bump effects
        const mouseBumpDistance = Math.sqrt((x - mousePositionState.x * 50) ** 2 + (y - mousePositionState.y * 14) ** 2)
        const mouseBump1 = mouseInfluence * Math.sin(mouseBumpDistance * 0.3 + time * 4.0) * 0.8  // Rippling bumps from cursor
        const mouseBump2 = mouseInfluence * Math.cos(mouseBumpDistance * 0.5 - time * 3.5) * 0.6  // Counter-rotating bumps

        positionAttribute.setZ(i, z + mouseWave + mouseBump1 + mouseBump2)
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
      <planeGeometry ref={geometryRef} args={[140, 14, 280, 28]} />
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

        {/* Static wave grid background */}
        <StaticWaveGrid />

        {/* Single wide OLED display spanning the container */}
        <WideOLEDDisplay />

        <fog attach="fog" args={['#000000', 40, 80]} />
      </Canvas>
    </div>
  )
}
