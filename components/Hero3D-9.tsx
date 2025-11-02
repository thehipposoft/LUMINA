'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/*
═══════════════════════════════════════════════════════════════════════════════
🎯 HERO3D COMPONENT CUSTOMIZATION GUIDE
═══════════════════════════════════════════════════════════════════════════════

🎨 COLOR CUSTOMIZATION:
- Look for sections marked with "🎨 COLOR SETTINGS"
- Default colors: #007BFF (blue)
- Hover colors: #00DDFF (cyan)
- Glow colors: #00DDFF (cyan)

💡 BRIGHTNESS CUSTOMIZATION:
- Look for sections marked with "💡 BRIGHTNESS SETTINGS"
- emissiveIntensity controls glow strength
- Higher values = brighter glow
- Layer 1: 0.3 → 3.5, Layer 2: 0.25 → 3.0, Layer 3: 0.2 → 2.5

🔍 GLASS EFFECT CUSTOMIZATION:
- Look for sections marked with "🔍 GLASS EFFECT SETTINGS"
- opacity: 0.0 = invisible, 1.0 = solid
- transmission: 0.0 = solid, 1.0 = fully transparent glass
- roughness: 0.0 = mirror-smooth, 1.0 = completely rough
- clearcoat: adds glossy finish layer

✨ GLOW EFFECT CUSTOMIZATION:
- Look for sections marked with "✨ GLOW EFFECT"
- Multiple glow layers create box-shadow-like effect
- opacity values control glow intensity (0.1, 0.2, 0.9)
- Larger args[] values = bigger glow spread

═══════════════════════════════════════════════════════════════════════════════
*/

// Shared mouse position state
const mousePositionState = { x: 0, y: 0 }

// Shared hover state for gap expansion
const hoverState = { isHovered: false, intensity: 0 }

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 COLOR PALETTE - Modify these variables to change all colors at once
// ═══════════════════════════════════════════════════════════════════════════════
const COLORS = {
  // Main OLED colors
  DEFAULT_OLED: 0x007BFF,    // 👈 Default OLED blue color
  HOVER_OLED: 0x00DDFF,      // 👈 Hover/active OLED cyan color

  // Glow effect colors
  GLOW_COLOR: 0x00DDFF,      // 👈 Glow/shadow effect color

  // Background dots colors
  DOTS_R: 0.1,               // 👈 Dots red component
  DOTS_G: 0.3,               // 👈 Dots green component
  DOTS_B: 0.7,               // 👈 Dots blue component

  // Scene lighting colors
  POINT_LIGHT: "#007BFF",    // 👈 Point lights color
  FOG_COLOR: "#007BFF"       // 👈 Scene fog color
}

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
        colors[i3] = COLORS.DOTS_R       // r (slightly more red)
        colors[i3 + 1] = COLORS.DOTS_G   // g (more green)
        colors[i3 + 2] = COLORS.DOTS_B   // b (brighter blue)

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
        opacity={0.8}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthTest={false}
        depthWrite={false}
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
      const hoverRadius = 1.5
      const isHovered = distance < hoverRadius

      // Update shared hover state
      hoverState.isHovered = isHovered
      hoverState.intensity = isHovered ? Math.max(0, 1 - (distance / hoverRadius)) : 0

      // Layer 1 positioned as TOP OLED layer (closest to camera) - Z-axis stacking
      // Base position: top layer in Z-stack with mouse proximity effect
      meshRef.current.position.x = 0
      meshRef.current.position.y = -0.1 + (hoverState.intensity * 0.2)  // Slight upward movement on hover
      meshRef.current.position.z = 0  // Top layer at z=0 (closest to camera)

      //Initial rotation
        meshRef.current.rotation.x = -1.6

      // Mouse interaction - minimal rotation for OLED realism
      //meshRef.current.rotation.x = mousePositionState.y * 0.9
      meshRef.current.rotation.y = mousePositionState.x * 0.02
      meshRef.current.rotation.z = 0

      // 🔧 FLEXIBLE OLED BENDING EFFECT
      // Apply vertex deformation for flexible OLED behavior

      if (meshRef.current.geometry) {
        const geometry = meshRef.current.geometry as THREE.PlaneGeometry
        const positionAttribute = geometry.attributes.position

        // Bend amount based on hover intensity (0 = flat, 1 = max bend)
        const bendAmount = hoverState.intensity * 0.55  // Max 0.40 units forward bend

        // Smooth bending transition
        const targetBend = bendAmount
        const geometryWithBend = geometry as THREE.PlaneGeometry & { currentBend?: number }
        const currentBend = geometryWithBend.currentBend || 0
        const newBend = THREE.MathUtils.lerp(currentBend, targetBend, 0.1)
        geometryWithBend.currentBend = newBend

        // Apply bending to vertices
        for (let i = 0; i < positionAttribute.count; i++) {
          const x = positionAttribute.getX(i)
          const y = positionAttribute.getY(i)

          // Create smooth curve: center bulges forward, edges stay put
          const distanceFromCenter = Math.sqrt(x * x + y * y) / 3  // Normalize to panel size
          const bendFactor = Math.cos(distanceFromCenter * Math.PI / 2)  // Smooth falloff
          const zOffset = bendFactor * newBend

          positionAttribute.setZ(i, zOffset)
        }

        positionAttribute.needsUpdate = true
        geometry.computeVertexNormals()  // Recalculate normals for proper lighting
      }

      // ═══════════════════════════════════════════════════════════════
      // 🎨 LAYER 1 - COLORS & BRIGHTNESS CONTROL
      // ═══════════════════════════════════════════════════════════════
      if (meshRef.current.material) {
        const material = meshRef.current.material as THREE.MeshPhysicalMaterial

        // Use hoverState.intensity for smooth interpolation (0 to 1)
        const t = hoverState.intensity // Smooth transition value

        // 🎨 COLOR SETTINGS - Using color variables from COLORS object
        const defaultColor = new THREE.Color(COLORS.DEFAULT_OLED) // 👈 Default OLED color
        const hoverColor = new THREE.Color(COLORS.HOVER_OLED)     // 👈 Hover OLED color

        // Apply color interpolation
        material.color.lerpColors(defaultColor, hoverColor, t)
        material.emissive.lerpColors(defaultColor, hoverColor, t)

        // 💡 BRIGHTNESS SETTINGS - Adjust these values to control glow intensity
        material.emissiveIntensity = THREE.MathUtils.lerp(0.3, 3.5, t) // 👈 Brightness: 0.3 (default) → 3.5 (hover)

        // 🔍 GLASS EFFECT SETTINGS - Layer 1: Least glassy, most opaque
        material.opacity = THREE.MathUtils.lerp(0.6, 0.95, t)          // 👈 Less transparent: 0.6 (solid) → 0.95 (very opaque)
        material.transmission = THREE.MathUtils.lerp(0.4, 0.05, t)      // 👈 Reduced transmission: 0.4 (less glass) → 0.05 (solid)
        material.roughness = THREE.MathUtils.lerp(0.1, 0.3, t)         // 👈 Surface roughness: 0.1 (smooth) → 0.3 (diffuse)

        material.needsUpdate = true
      }
    }
  })

  return (
    <group>
      {/* ═══════════════════════════════════════════════════════════════
          ✨ LAYER 1 - GLOW EFFECT (Box-Shadow Style)
          ═══════════════════════════════════════════════════════════════ */}

      {/* 🌟 GLOW LAYER 1 - Closest/Brightest glow */}
      <mesh position={[0, 0, -0.01]}>      {/* 👈 Behind Layer 1 (z=0) */}
        <planeGeometry args={[6.4, 3.4]} />  {/* 👈 Slightly larger than main OLED */}
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.9}            // 👈 Glow intensity: 0.9 = strongest
          blending={THREE.AdditiveBlending}               // 👈 Additive = light adds together
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 🌟 GLOW LAYER 2 - Medium glow */}
      <mesh position={[0, 0, -0.02]}>      {/* 👈 Behind Layer 1 */}
        <planeGeometry args={[6.6, 3.6]} />  {/* 👈 Even larger (6.6 vs 6.0) */}
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.2}            // 👈 Glow intensity: 0.2 = medium
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 🌟 GLOW LAYER 3 - Outermost/Softest glow */}
      <mesh position={[0, 0, -0.03]}>      {/* 👈 Behind Layer 1 */}
        <planeGeometry args={[7.0, 4.0]} />  {/* 👈 Largest size (7.0 vs 6.0) */}
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.1}            // 👈 Glow intensity: 0.1 = softest
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ═══════════════════════════════════════════════════════════════
          📺 MAIN OLED LAYER 1 - Flexible Display Panel (Top Layer)
          ═══════════════════════════════════════════════════════════════ */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}               // 👈 Top layer Z-position (closest to camera)
        rotation={[Math.PI / 2, 0, 0]}     // 👈 90° rotation - flat side points upward
      >
        <planeGeometry args={[6, 3, 32, 32]} />  {/* 👈 High-segment geometry for smooth bending */}
        <meshPhysicalMaterial
          // 🎨 BASE COLORS (modified dynamically on hover via useFrame above)
          color={new THREE.Color(COLORS.DEFAULT_OLED)}    // 👈 Base color from COLORS object
          emissive={new THREE.Color(COLORS.DEFAULT_OLED)} // 👈 Emissive color from COLORS object
          emissiveIntensity={0.3}                        // 👈 Default glow intensity: 0.3

          // 🔍 TRANSPARENCY SETTINGS - Layer 1: Less glassy baseline
          transparent={true}
          opacity={0.6}                                  // 👈 Less transparent baseline: 0.6 (more solid)

          // ✨ GLASS EFFECT PROPERTIES - Layer 1: Reduced glass effect
          roughness={0.1}                                // 👈 Surface roughness: 0.1 = very smooth/glossy
          metalness={0.0}                                // 👈 Metallic properties: 0.0 = non-metallic
          transmission={0.4}                             // 👈 Reduced light transmission: 0.4 = less glassy
          thickness={0.8}                                // 👈 Increased glass thickness for refraction
          ior={1.5}                                      // 👈 Index of refraction: 1.5 = glass-like
          clearcoat={0.1}                                // 👈 Clear coating: 1.0 = full glossy finish
          clearcoatRoughness={0.8}                       // 👈 Clear coat roughness: 0.1 = smooth
          side={THREE.DoubleSide}                        // 👈 Show both sides of OLED panel
        />
      </mesh>
    </group>
  )
}

// Second OLED Layer Component
function OLEDLayer2() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime

      // Layer 2 positioned as MIDDLE OLED layer - Z-axis stacking
      // Base position: middle layer in Z-stack with mouse proximity effect
      meshRef.current.position.x = 0
      //meshRef.current.position.y = Math.sin(time * 0.5 + 0.5) * 0.05
      meshRef.current.position.y = 0.4 + (hoverState.intensity * 0.1)  // Increased base gap, slight movement on hover
      meshRef.current.position.z = 0.02  // Middle layer at z=0.02

       //Initial rotation
        meshRef.current.rotation.x = -1.6


      // Mouse interaction - minimal rotation for OLED realism
      //meshRef.current.rotation.x = mousePositionState.y * 0.02
      meshRef.current.rotation.y = mousePositionState.x * 0.02
      meshRef.current.rotation.z = 0

      // 🔧 FLEXIBLE OLED BENDING EFFECT
      // Apply vertex deformation for flexible OLED behavior (same as Layer 1)
      if (meshRef.current.geometry) {
        const geometry = meshRef.current.geometry as THREE.PlaneGeometry
        const positionAttribute = geometry.attributes.position

        // Bend amount based on hover intensity (synchronized with other layers)
        const bendAmount = hoverState.intensity * 0.55  // Max 0.60 units forward bend

        // Smooth bending transition
        const targetBend = bendAmount
        const geometryWithBend = geometry as THREE.PlaneGeometry & { currentBend?: number }
        const currentBend = geometryWithBend.currentBend || 0
        const newBend = THREE.MathUtils.lerp(currentBend, targetBend, 0.1)
        geometryWithBend.currentBend = newBend

        // Apply bending to vertices
        for (let i = 0; i < positionAttribute.count; i++) {
          const x = positionAttribute.getX(i)
          const y = positionAttribute.getY(i)

          // Create smooth curve: center bulges forward, edges stay put
          const distanceFromCenter = Math.sqrt(x * x + y * y) / 3  // Normalize to panel size
          const bendFactor = Math.cos(distanceFromCenter * Math.PI / 2)  // Smooth falloff
          const zOffset = bendFactor * newBend

          positionAttribute.setZ(i, zOffset)
        }

        positionAttribute.needsUpdate = true
        geometry.computeVertexNormals()  // Recalculate normals for proper lighting
      }

      // ═══════════════════════════════════════════════════════════════
      // 🎨 LAYER 2 - COLORS & BRIGHTNESS CONTROL
      // ═══════════════════════════════════════════════════════════════
      if (meshRef.current.material) {
        const material = meshRef.current.material as THREE.MeshPhysicalMaterial

        // Use hoverState.intensity for smooth interpolation (0 to 1)
        const t = hoverState.intensity // Smooth transition value

        // 🎨 COLOR SETTINGS - Using color variables from COLORS object
        const defaultColor = new THREE.Color(COLORS.DEFAULT_OLED) // 👈 Default OLED color
        const hoverColor = new THREE.Color(COLORS.HOVER_OLED)     // 👈 Hover OLED color

        // Apply color interpolation
        material.color.lerpColors(defaultColor, hoverColor, t)
        material.emissive.lerpColors(defaultColor, hoverColor, t)

        // 💡 BRIGHTNESS SETTINGS - Adjust these values to control glow intensity
        material.emissiveIntensity = THREE.MathUtils.lerp(0.25, 3.0, t) // 👈 Brightness: 0.25 (default) → 3.0 (hover)

        // 🔍 GLASS EFFECT SETTINGS - Layer 2: Moderately glassy (between Layer 1 and 3)
        material.opacity = THREE.MathUtils.lerp(0.4, 0.85, t)          // 👈 Moderate transparency: 0.4 → 0.85 (opaque)
        material.transmission = THREE.MathUtils.lerp(0.7, 0.1, t)       // 👈 Moderate transmission: 0.7 (glassy) → 0.1 (solid)
        material.roughness = THREE.MathUtils.lerp(0.15, 0.25, t)       // 👈 Surface roughness: 0.15 (smooth) → 0.25 (diffuse)

        material.needsUpdate = true
      }
    }
  })

  return (
    <group>
      {/* Glow layers - multiple layers for box-shadow effect */}
      <mesh position={[0, 0, 0.01]}>       {/* 👈 Behind Layer 2 (z=0.02) */}
        <planeGeometry args={[5.9, 3.2]} />
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0.0]}>       {/* 👈 Behind Layer 2 */}
        <planeGeometry args={[6.1, 3.4]} />
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.2}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, -0.01]}>      {/* 👈 Behind Layer 2 */}
        <planeGeometry args={[6.5, 3.8]} />
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main OLED Layer 2 - Flexible Display Panel */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0.02]}             // 👈 Middle layer Z-position
        rotation={[Math.PI / 2, 0, 0]}      // 👈 90° rotation - flat side points upward
      >
        <planeGeometry args={[5.5, 2.8, 32, 32]} />  {/* 👈 High-segment geometry for smooth bending */}
        <meshPhysicalMaterial
          color={new THREE.Color(COLORS.DEFAULT_OLED)}    // 👈 Base color from COLORS object
          emissive={new THREE.Color(COLORS.DEFAULT_OLED)} // 👈 Emissive color from COLORS object
          emissiveIntensity={0.25}
          transparent={true}
          opacity={0.4}                                // 👈 Layer 2: Moderate baseline opacity
          roughness={0.15}
          metalness={0.0}
          transmission={0.7}                           // 👈 Layer 2: Moderate glass effect
          thickness={0.25}                             // 👈 Increased thickness for Layer 2
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Third OLED Layer Component
function OLEDLayer3() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime

      // Layer 3 positioned as BOTTOM OLED layer (furthest from camera) - Z-axis stacking
      // Base position: bottom layer in Z-stack with mouse proximity effect
      meshRef.current.position.x = 0
      //meshRef.current.position.y = Math.sin(time * 0.5 + 1.0) * 0.05
      meshRef.current.position.y = 0.7 + (hoverState.intensity * 0.05)  // Increased base gap, minimal movement on hover
      meshRef.current.position.z = 0.04  // Bottom layer at z=0.04 (furthest from camera)

       //Initial rotation
        meshRef.current.rotation.x = -1.6


      // Mouse interaction - minimal rotation for OLED realism
      //meshRef.current.rotation.x = mousePositionState.y * 0.02
      meshRef.current.rotation.y = mousePositionState.x * 0.02
      meshRef.current.rotation.z = 0

      // 🔧 FLEXIBLE OLED BENDING EFFECT
      // Apply vertex deformation for flexible OLED behavior (synchronized with other layers)
      if (meshRef.current.geometry) {
        const geometry = meshRef.current.geometry as THREE.PlaneGeometry
        const positionAttribute = geometry.attributes.position

        // Bend amount based on hover intensity (synchronized with other layers)
        const bendAmount = hoverState.intensity * 0.55  // Max 0.40 units forward bend

        // Smooth bending transition
        const targetBend = bendAmount
        const geometryWithBend = geometry as THREE.PlaneGeometry & { currentBend?: number }
        const currentBend = geometryWithBend.currentBend || 0
        const newBend = THREE.MathUtils.lerp(currentBend, targetBend, 0.1)
        geometryWithBend.currentBend = newBend

        // Apply bending to vertices
        for (let i = 0; i < positionAttribute.count; i++) {
          const x = positionAttribute.getX(i)
          const y = positionAttribute.getY(i)

          // Create smooth curve: center bulges forward, edges stay put
          const distanceFromCenter = Math.sqrt(x * x + y * y) / 3  // Normalize to panel size
          const bendFactor = Math.cos(distanceFromCenter * Math.PI / 2)  // Smooth falloff
          const zOffset = bendFactor * newBend

          positionAttribute.setZ(i, zOffset)
        }

        positionAttribute.needsUpdate = true
        geometry.computeVertexNormals()  // Recalculate normals for proper lighting
      }

      // ═══════════════════════════════════════════════════════════════
      // 🎨 LAYER 3 - COLORS & BRIGHTNESS CONTROL
      // ═══════════════════════════════════════════════════════════════
      if (meshRef.current.material) {
        const material = meshRef.current.material as THREE.MeshPhysicalMaterial

        // Use hoverState.intensity for smooth interpolation (0 to 1)
        const t = hoverState.intensity // Smooth transition value

        // 🎨 COLOR SETTINGS - Using color variables from COLORS object
        const defaultColor = new THREE.Color(COLORS.DEFAULT_OLED) // 👈 Default OLED color
        const hoverColor = new THREE.Color(COLORS.DEFAULT_OLED)     // 👈 Hover OLED color

        // Apply color interpolation
        material.color.lerpColors(defaultColor, hoverColor, t)
        material.emissive.lerpColors(defaultColor, hoverColor, t)

        // 💡 BRIGHTNESS SETTINGS - Adjust these values to control glow intensity
        material.emissiveIntensity = THREE.MathUtils.lerp(0.2, 0.1,t)  // 👈 Brightness: 0.2 (default) → 2.5 (hover)

        // 🔍 GLASS EFFECT SETTINGS - Control transparency and glass-like appearance
        material.opacity = THREE.MathUtils.lerp(0.2, 1, t)          // 👈 Transparency: 0.2 (glass) → 0.75 (opaque)
        material.transmission = THREE.MathUtils.lerp(0.95, 0.05, t)      // 👈 Light transmission: 0.95 (glass) → 0.2 (solid)
        material.roughness = THREE.MathUtils.lerp(0.2, 0.1, t)         // 👈 Surface roughness: 0.2 (constant)

        material.needsUpdate = true;
      }
    }
  })

  return (
    <group>
      {/* Glow layers - multiple layers for box-shadow effect */}
      <mesh position={[0, 0, 0.03]}>       {/* 👈 Behind Layer 3 (z=0.04) */}
        <planeGeometry args={[5.4, 2.9]} />
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0.02]}>       {/* 👈 Behind Layer 3 */}
        <planeGeometry args={[5.6, 3.1]} />
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.2}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0.01]}>       {/* 👈 Behind Layer 3 */}
        <planeGeometry args={[6.0, 3.5]} />
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main OLED Layer 3 - Flexible Display Panel */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0.04]}             // 👈 Bottom layer Z-position (furthest from camera)
        rotation={[0, 0, 0]}                // 👈 Flat orientation for OLED
      >
        <planeGeometry args={[5, 2.5, 32, 32]} />  {/* 👈 High-segment geometry for smooth bending */}
        <meshPhysicalMaterial
          color={new THREE.Color(COLORS.DEFAULT_OLED)}    // 👈 Base color from COLORS object
          emissive={new THREE.Color(COLORS.DEFAULT_OLED)} // 👈 Emissive color from COLORS object
          emissiveIntensity={0.2}
          transparent={true}
          opacity={0.2}
          roughness={0.2}
          metalness={0.0}
          transmission={0.95}
          thickness={0.2}                              // 👈 Increased thickness for Layer 3
          ior={1.5}
          clearcoat={0.1}
          clearcoatRoughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
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
        className="relative w-full h-screen overflow-hidden sm:h-[80vh] md:h-[90vh] lg:h-screen canvas-container"
        onMouseMove={handleMouseMove}
    >
        <Canvas
            camera={{
                position: typeof window !== 'undefined' && window.innerWidth < 768
                    ? [8, 4, 6]      // Mobile: pulled back more for better view
                    : typeof window !== 'undefined' &&  window.innerWidth < 1024
                    ? [7, 3.8, 5]    // Tablet: medium distance
                    : [6, 3.5, 4],   // Desktop: original position
                fov: typeof window !== 'undefined' && window.innerWidth < 768
                    ? 85             // Mobile: wider FOV
                    : typeof window !== 'undefined' &&  window.innerWidth < 1024
                    ? 80             // Tablet: medium FOV
                    : 75             // Desktop: original FOV
            }}
            style={{ width: '100%', height: '100%' }}
        >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} />
            <directionalLight position={[-5, 3, -2]} intensity={0.4} />
            <pointLight position={[3, 2, 2]} intensity={0.8} color={COLORS.POINT_LIGHT} />
            <pointLight position={[-3, 1, -1]} intensity={0.5} color={COLORS.POINT_LIGHT} />

            {/* Orbit controls for better viewing */}
            <OrbitControls
            enablePan={true}
            enableZoom={false}
            enableRotate={true}
            autoRotate={false}
            target={[0, 0, 0]}              // 👈 Center of vertical stack
            />

            {/* Background dots grid */}
            <DotsGrid />

            {/* Three OLED layers separated in depth */}
            <OLEDLayer1 />
            <OLEDLayer2 />
            <OLEDLayer3 />

            <fog attach="fog" args={[COLORS.FOG_COLOR, 2, 25]} />
        </Canvas>
    </div>
  )
}
