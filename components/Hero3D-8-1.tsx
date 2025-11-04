'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Shared mouse position state
const mousePositionState = { x: 0, y: 0 }

// Shared hover state for animations
const hoverState = { isHovered: false, intensity: 0 }

// Color palette matching your SVG gradients
const COLORS = {
  // Logo gradient colors (matching your SVG)
  GRADIENT_1_START: 0x35E3ED,  // Cyan
  GRADIENT_1_MID: 0x007BFF,    // Blue
  GRADIENT_1_END: 0xA044FF,    // Purple

  GRADIENT_2_START: 0x007BFF,  // Blue
  GRADIENT_2_END: 0xA044FF,    // Purple

  GRADIENT_3_START: 0x35E3ED,  // Cyan
  GRADIENT_3_END: 0x007BFF,    // Blue

  // Effects
  GLOW_COLOR: 0x35E3ED,        // Cyan glow
  POINT_LIGHT: "#007BFF",      // Point lights color
  FOG_COLOR: "#000011"         // Scene fog color
}

// Helper function to create rounded rectangular shape
function createRectangleShape(width: number, height: number) {
  const shape = new THREE.Shape()
  const halfWidth = width / 2
  const halfHeight = height / 2
  const radius = Math.min(width, height) * 0.15 // Rounded corner radius (15% of smallest dimension)

  // Create rounded rectangle
  shape.moveTo(-halfWidth + radius, -halfHeight)

  // Bottom edge
  shape.lineTo(halfWidth - radius, -halfHeight)

  // Bottom-right corner
  shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + radius)

  // Right edge
  shape.lineTo(halfWidth, halfHeight - radius)

  // Top-right corner
  shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - radius, halfHeight)

  // Top edge
  shape.lineTo(-halfWidth + radius, halfHeight)

  // Top-left corner
  shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - radius)

  // Left edge
  shape.lineTo(-halfWidth, -halfHeight + radius)

  // Bottom-left corner
  shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + radius, -halfHeight)

  return shape
}

// Single Lumina Logo Layer Component with Gradient Support
function LuminaLayer({
  position,
  size,
  depth,
  gradientStart,
  gradientEnd,
  opacity = 1,
  animationOffset = 0
}: {
  position: [number, number, number]
  size: number
  depth: number
  gradientStart: number
  gradientEnd: number
  opacity?: number
  animationOffset?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime

      // Floating animation with offset for each layer
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + animationOffset) * 0.1

      // Gentle rotation
      meshRef.current.rotation.z = Math.sin(time * 0.3 + animationOffset) * 0.05

      // Hover effects
      const scale = 1 + hoverState.intensity * 0.05
      meshRef.current.scale.setScalar(scale)

      // Dynamic gradient material effects
      if (meshRef.current.material) {
        const material = meshRef.current.material as THREE.MeshPhysicalMaterial

        // Animate between gradient colors on hover
        const startColor = new THREE.Color(gradientStart)
        const endColor = new THREE.Color(gradientEnd)
        const mixedColor = startColor.clone().lerp(endColor, 0.5 + hoverState.intensity * 0.3)

        material.color.copy(mixedColor)
        material.emissive.copy(startColor.clone().lerp(endColor, hoverState.intensity * 0.8))
        material.emissiveIntensity = 0.3 + hoverState.intensity * 2.0
        material.needsUpdate = true
      }
    }
  })

  const rectShape = createRectangleShape(size, size * 0.6) // Make it slightly rectangular

  return (
    <group>
      {/* Glow effect */}
      <mesh position={[position[0], position[1], position[2] - 0.01]}>
        <shapeGeometry args={[rectShape]} />
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}
          transparent={true}
          opacity={hoverState.intensity * 0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main rectangular layer */}
      <mesh
        ref={meshRef}
        position={position}
        rotation={[0, 0, 0]}
      >
        <extrudeGeometry
          args={[rectShape, {
            depth: depth,
            bevelEnabled: true,
            bevelSize: 0.02,
            bevelThickness: 0.01
          }]}
        />
        <meshPhysicalMaterial
          color={new THREE.Color(gradientStart).lerp(new THREE.Color(gradientEnd), 0.5)}
          emissive={new THREE.Color(gradientStart)}
          emissiveIntensity={0.3}

          transparent={true}
          opacity={opacity}

          roughness={0.1}
          metalness={0.1}
          transmission={0.1}
          thickness={depth}
          ior={1.5}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Main Lumina Logo Component (3 stacked hexagonal layers)
function LuminaLogo() {
  useFrame(() => {
    // Detect hover over entire logo area
    const distance = Math.sqrt(mousePositionState.x * mousePositionState.x + mousePositionState.y * mousePositionState.y)
    const hoverRadius = 2.0
    const isHovered = distance < hoverRadius

    // Update shared hover state
    hoverState.isHovered = isHovered
    hoverState.intensity = isHovered ? Math.max(0, 1 - (distance / hoverRadius)) : 0
  })

  return (
    <group>
      {/* Layer 1 - Bottom/Base layer (gradient: cyan → blue → purple) */}
      <LuminaLayer
        position={[0, -0.3, 0]}
        size={2.0}
        depth={0.15}
        gradientStart={COLORS.GRADIENT_1_START}
        gradientEnd={COLORS.GRADIENT_1_END}
        opacity={0.9}
        animationOffset={0}
      />

      {/* Layer 2 - Middle layer (gradient: blue → purple) */}
      <LuminaLayer
        position={[0, 0, 0.2]}
        size={1.7}
        depth={0.12}
        gradientStart={COLORS.GRADIENT_2_START}
        gradientEnd={COLORS.GRADIENT_2_END}
        opacity={0.85}
        animationOffset={1}
      />

      {/* Layer 3 - Top layer (gradient: cyan → blue) */}
      <LuminaLayer
        position={[0, 0.3, 0.4]}
        size={1.4}
        depth={0.1}
        gradientStart={COLORS.GRADIENT_3_START}
        gradientEnd={COLORS.GRADIENT_3_END}
        opacity={0.8}
        animationOffset={2}
      />
    </group>
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
      className="w-full h-screen relative bg-black"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{
            position: [0, 0, 8],
            fov: 35,
            near: 0.1,
            far: 100
          }}
        >
          {/* Scene lighting */}
          <ambientLight intensity={0.4} color="#112244" />
          <pointLight position={[5, 5, 5]} intensity={1.2} color={COLORS.POINT_LIGHT} />
          <pointLight position={[-5, -5, 5]} intensity={0.8} color={COLORS.POINT_LIGHT} />

          {/* Camera controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={false}
            target={[0, 0, 0]}
          />

          {/* Animated Lumina Logo */}
          <LuminaLogo />

          <fog attach="fog" args={[COLORS.FOG_COLOR, 5, 20]} />
        </Canvas>
      </div>
    </div>
  )
}
