'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// Shared mouse position state
const mousePositionState = { x: 0, y: 0 }

// Shared hover state for gap expansion
const hoverState = { isHovered: false, intensity: 0 }

// Grid of Dots Background Component
function DotsGrid() {
  const pointsRef = useRef<THREE.Points>(null)

  // Grid parameters - more dots, closer spacing for finer grid
  const gridSize = 40
  const spacing = 1.5
  const totalDots = gridSize * gridSize

  // Create fixed dots grid
  const { positions, colors } = React.useMemo(() => {
    const positions = new Float32Array(totalDots * 3)
    const colors = new Float32Array(totalDots * 3)

    let index = 0
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const i3 = index * 3

        // Position dots in a fixed grid - moved higher for better visibility
        positions[i3] = (x - gridSize / 2) * spacing      // x
        positions[i3 + 1] = -6                            // y (closer to main scene)
        positions[i3 + 2] = (z - gridSize / 2) * spacing  // z

        // Brighter blue color for better visibility
        colors[i3] = 0.1       // r (slightly more red)
        colors[i3 + 1] = 0.3   // g (more green)
        colors[i3 + 2] = 0.7   // b (brighter blue)

        index++
      }
    }

    return { positions, colors }
  }, [gridSize, spacing, totalDots])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime
      const positionAttribute = pointsRef.current.geometry.attributes.position
      const colorAttribute = pointsRef.current.geometry.attributes.color

      // Continuous wave motion with mouse interaction
      for (let i = 0; i < totalDots; i++) {
        const i3 = i * 3
        const x = positions[i3]
        const z = positions[i3 + 2]

        // Continuous wave motion - creating ripple effect
        const waveY = Math.sin(x * 0.3 + time * 2) * 0.8 +
                     Math.sin(z * 0.25 + time * 1.5) * 0.6 +
                     Math.sin((x + z) * 0.2 + time * 1.8) * 0.4

        // Set the wave position - moved higher for visibility
        positionAttribute.setY(i, -6 + waveY)

        // Mouse interaction - dots glow when cursor is near
        const mouseX = mousePositionState.x * 15
        const mouseZ = mousePositionState.y * 8
        const distanceToMouse = Math.sqrt((x - mouseX) ** 2 + (z - mouseZ) ** 2)

        if (distanceToMouse < 6) {
          const influence = 1 - (distanceToMouse / 6)
          // Subtle color brightening only
          const brightnessMult = 1 + influence * 1.5
          colorAttribute.setXYZ(i,
            colors[i3] * brightnessMult,
            colors[i3 + 1] * brightnessMult,
            colors[i3 + 2] * brightnessMult
          )
        } else {
          // Return to original colors
          colorAttribute.setXYZ(i, colors[i3], colors[i3 + 1], colors[i3 + 2])
        }
      }

      positionAttribute.needsUpdate = true
      colorAttribute.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        transparent={true}
        opacity={0.7}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  )
}

// First OLED Layer Component
function OLEDLayer1() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime

      // Detect hover over OLED layers area
      const distance = Math.sqrt(mousePositionState.x * mousePositionState.x + mousePositionState.y * mousePositionState.y)
      const hoverRadius = 1.2
      const isHovered = distance < hoverRadius

      // Update shared hover state
      hoverState.isHovered = isHovered
      hoverState.intensity = isHovered ? Math.max(0, 1 - (distance / hoverRadius)) : 0

      // Layer 1 stays at base position [0, 0, 0] - no gap expansion needed
      const baseY = Math.sin(time * 0.5) * 0.1
      meshRef.current.position.y = baseY

      // Mouse interaction - slight rotation
      meshRef.current.rotation.x = mousePositionState.y * 0.1
      meshRef.current.rotation.y = mousePositionState.x * 0.1

      // Color intensity based on mouse proximity
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
      <meshPhysicalMaterial
        color="#007BFF"
        emissive="#007BFF"
        emissiveIntensity={0.3}
        transparent={true}
        opacity={0.4}
        roughness={0.1}
        metalness={0.0}
        transmission={0.7}
        thickness={0.5}
        ior={1.5}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
    </RoundedBox>
  )
}

// Second OLED Layer Component
function OLEDLayer2() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime

      // Use shared hover state to expand gap by 50%
      const expandIntensity = hoverState.intensity
      const basePos = { y: -0.12, z: -0.24 }  // Much closer position
      const expandedPos = { y: -0.36, z: -0.72 }  // Expanded to original position for dramatic effect

      // Interpolate between base and expanded positions
      const currentY = basePos.y + (expandedPos.y - basePos.y) * expandIntensity
      const currentZ = basePos.z + (expandedPos.z - basePos.z) * expandIntensity

      // Apply position with oscillation
      meshRef.current.position.y = currentY + Math.sin(time * 0.5 + 0.5) * 0.1
      meshRef.current.position.z = currentZ

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
      position={[0, -0.12, -0.24]}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[5.5, 2.8, 0.18]}
      radius={0.09}
      smoothness={4}
    >
      <meshPhysicalMaterial
        color="#007BFF"
        emissive="#007BFF"
        emissiveIntensity={0.25}
        transparent={true}
        opacity={0.35}
        roughness={0.15}
        metalness={0.0}
        transmission={0.8}
        thickness={0.4}
        ior={1.5}
        clearcoat={1.0}
        clearcoatRoughness={0.15}
      />
    </RoundedBox>
  )
}

// Third OLED Layer Component
function OLEDLayer3() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime

      // Use shared hover state to expand gap by 50%
      const expandIntensity = hoverState.intensity
      const basePos = { y: -0.24, z: -0.48 }  // Much closer position
      const expandedPos = { y: -0.72, z: -1.44 }  // Expanded to original far position for dramatic effect

      // Interpolate between base and expanded positions
      const currentY = basePos.y + (expandedPos.y - basePos.y) * expandIntensity
      const currentZ = basePos.z + (expandedPos.z - basePos.z) * expandIntensity

      // Apply position with oscillation
      meshRef.current.position.y = currentY + Math.sin(time * 0.5 + 1.0) * 0.1
      meshRef.current.position.z = currentZ

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
      position={[0, -0.24, -0.48]}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[5, 2.5, 0.15]}
      radius={0.08}
      smoothness={4}
    >
      <meshPhysicalMaterial
        color="#007BFF"
        emissive="#007BFF"
        emissiveIntensity={0.2}
        transparent={true}
        opacity={0.3}
        roughness={0.2}
        metalness={0.0}
        transmission={0.85}
        thickness={0.3}
        ior={1.5}
        clearcoat={1.0}
        clearcoatRoughness={0.2}
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

        {/* Background dots grid */}
        <DotsGrid />

        {/* Three OLED layers separated in depth */}
        <OLEDLayer1 />
        <OLEDLayer2 />
        <OLEDLayer3 />

        <fog attach="fog" args={['#000000', 8, 20]} />
      </Canvas>
    </div>
  )
}
