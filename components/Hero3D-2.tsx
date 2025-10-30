'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Shared mouse position state
const mousePositionState = { x: 0, y: 0 }

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
          // Subtle color brightening
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

      // Individual layer rotation removed - now handled by group

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

      // Individual layer rotation removed - now handled by group

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

      // Individual layer rotation removed - now handled by group

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

// Rotatable group for OLED layers with drag interaction
function RotatableOLEDGroup() {
  const groupRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragStartRotation, setDragStartRotation] = React.useState({ x: 0, y: 0 })
  const [dragStartMouse, setDragStartMouse] = React.useState({ x: 0, y: 0 })
  const [currentRotation, setCurrentRotation] = React.useState({ x: 0, y: 0 })

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime

      if (isDragging) {
        // During drag, use accumulated rotation from drag interaction
        groupRef.current.rotation.x = currentRotation.x
        groupRef.current.rotation.y = currentRotation.y
      } else {
        // When not dragging, use mouse position for gentle rotation
        groupRef.current.rotation.x = mousePositionState.y * 0.3 + currentRotation.x
        groupRef.current.rotation.y = mousePositionState.x * 0.5 + currentRotation.y
      }

      // Always add subtle auto-rotation
      groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.05
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePointerDown = (event: any) => {
    event.stopPropagation?.()
    setIsDragging(true)
    setDragStartMouse({ x: event.clientX || 0, y: event.clientY || 0 })
    setDragStartRotation({ ...currentRotation })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePointerMove = (event: any) => {
    if (isDragging) {
      const deltaX = ((event.clientX || 0) - dragStartMouse.x) * 0.005
      const deltaY = ((event.clientY || 0) - dragStartMouse.y) * 0.005

      setCurrentRotation({
        x: dragStartRotation.x - deltaY,
        y: dragStartRotation.y + deltaX
      })
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  // Add global mouse event listeners for drag
  React.useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (event: MouseEvent) => {
        const deltaX = (event.clientX - dragStartMouse.x) * 0.005
        const deltaY = (event.clientY - dragStartMouse.y) * 0.005

        setCurrentRotation({
          x: dragStartRotation.x - deltaY,
          y: dragStartRotation.y + deltaX
        })
      }

      const handleGlobalMouseUp = () => {
        setIsDragging(false)
      }

      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove)
        document.removeEventListener('mouseup', handleGlobalMouseUp)
      }
    }
  }, [isDragging, dragStartMouse, dragStartRotation])

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <FlexibleOLEDLayer1 />
      <FlexibleOLEDLayer2 />
      <FlexibleOLEDLayer3 />
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

        {/* Orbit controls for better viewing - only pan and zoom */}
        <OrbitControls
          enablePan={true}
          enableZoom={false}
          enableRotate={false}
          autoRotate={false}
          target={[0, -0.4, -0.8]}
        />

        {/* Background dots grid - stays fixed */}
        <DotsGrid />

        {/* Rotatable OLED layers group */}
        <RotatableOLEDGroup />        <fog attach="fog" args={['#000000', 8, 20]} />
      </Canvas>
    </div>
  )
}
