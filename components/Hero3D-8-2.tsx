'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBoxGeometry } from '@react-three/drei'
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
  SECONDARY_OLED: 0xA044FF,

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
        const waveY = Math.sin(x * 0.3 + time * 1) * 0.8 +
                     Math.sin(z * 0.25 + time * 1.2) * 0.6 +
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

      // 🌊 OSCILLATION EFFECT - Gentle floating animation when not hovering
      const oscillationIntensity = 1 - hoverState.intensity  // Fade out oscillation on hover
      const oscillationY = Math.sin(time * 0.8) * 0.3 * oscillationIntensity  // Slow gentle Y oscillation
      const oscillationZ = Math.cos(time * 0.6) * 0.03 * oscillationIntensity  // Subtle Z oscillation for depth

      // Layer 1 positioned as TOP OLED layer (closest to camera) - Z-axis stacking
      // Base position: top layer in Z-stack with mouse proximity effect
      meshRef.current.position.x = 0
      meshRef.current.position.y = -0.1 - (hoverState.intensity * 0.4) + oscillationY  // Dramatic upward movement on hover + oscillation
      meshRef.current.position.z = 0 + oscillationZ  // Top layer at z=0 (closest to camera) + oscillation

      //Initial rotation
        meshRef.current.rotation.x = -1.6

      // Mouse interaction - minimal rotation for OLED realism
      //meshRef.current.rotation.x = mousePositionState.y * 0.9
      meshRef.current.rotation.y = mousePositionState.x * 0.02
      meshRef.current.rotation.z = 0

      // 🔧 BOX GEOMETRY NOTE: BoxGeometry doesn't support vertex manipulation
      // The 3D depth is now provided by the BoxGeometry itself

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
        material.opacity = THREE.MathUtils.lerp(1, 0.6, t)          // 👈 Less transparent: 0.6 (solid) → 0.95 (very opaque)
        material.transmission = THREE.MathUtils.lerp(0.4, 0.45, t)      // 👈 Reduced transmission: 0.4 (less glass) → 0.05 (solid)
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
      <mesh position={[0, 0, -0.01]} rotation={[Math.PI / 2, 0, 0]}>      {/* 👈 Behind Layer 1 (z=0) + SAME ROTATION */}
        <RoundedBoxGeometry args={[6.4, 6.4, 0.1]} radius={0.3} smoothness={5} />  {/* 👈 Square rounded box glow slightly larger than main OLED */}
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.9}            // 👈 Glow intensity: 0.9 = strongest
          blending={THREE.AdditiveBlending}               // 👈 Additive = light adds together
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 🌟 GLOW LAYER 2 - Medium glow */}
      <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>      {/* 👈 Behind Layer 1 + SAME ROTATION */}
        <RoundedBoxGeometry args={[6.6, 6.6, 0.1]} radius={0.1} smoothness={5} />  {/* 👈 Square rounded box glow even larger */}
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.2}            // 👈 Glow intensity: 0.2 = medium
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 🌟 GLOW LAYER 3 - Outermost/Softest glow */}
      <mesh position={[0, 0, -0.03]} rotation={[Math.PI / 2, 0, 0]}>      {/* 👈 Behind Layer 1 + SAME ROTATION */}
        <RoundedBoxGeometry args={[7.0, 7.0, 0.1]} radius={0.1} smoothness={5} />  {/* 👈 Square rounded box glow largest size */}
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
        <RoundedBoxGeometry args={[6, 6, 0.4]} radius={0.1} smoothness={5} />  {/* 👈 Square rounded box geometry for OLED layer with depth */}
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

      // 🌊 OSCILLATION EFFECT - Gentle floating animation when not hovering
      const oscillationIntensity = 1 - hoverState.intensity  // Fade out oscillation on hover
      const oscillationY = Math.sin(time * 0.9 + 1.0) * 0.3 * oscillationIntensity  // Slightly different frequency for variety
      const oscillationZ = Math.cos(time * 0.7 + 0.5) * 0.025 * oscillationIntensity  // Subtle Z oscillation with phase offset

      // Layer 2 positioned as MIDDLE OLED layer - Z-axis stacking
      // Base position: middle layer in Z-stack with mouse proximity effect
      meshRef.current.position.x = 0
      //meshRef.current.position.y = Math.sin(time * 0.5 + 0.5) * 0.05
      meshRef.current.position.y = 0.8 + (hoverState.intensity * 0.0) + oscillationY  // Middle layer stays centered + oscillation
      meshRef.current.position.z = 0.02 + oscillationZ  // Middle layer at z=0.02 + oscillation

       //Initial rotation
        meshRef.current.rotation.x = -1.6


      // Mouse interaction - minimal rotation for OLED realism
      //meshRef.current.rotation.x = mousePositionState.y * 0.02
      meshRef.current.rotation.y = mousePositionState.x * 0.02
      meshRef.current.rotation.z = 0

      // 🔧 BOX GEOMETRY NOTE: BoxGeometry doesn't support vertex manipulation
      // The 3D depth is now provided by the BoxGeometry itself

      // ═══════════════════════════════════════════════════════════════
      // 🎨 LAYER 2 - COLORS & BRIGHTNESS CONTROL
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
        material.emissiveIntensity = THREE.MathUtils.lerp(0.25, 3.0, t) // 👈 Brightness: 0.25 (default) → 3.0 (hover)

        // 🔍 GLASS EFFECT SETTINGS - Layer 2: Moderately glassy (between Layer 1 and 3)
        material.opacity = THREE.MathUtils.lerp(1, 0.6, t)        // 👈 Moderate transparency: 0.4 → 0.9 (opaque)
        material.transmission = THREE.MathUtils.lerp(0.7, 0.1, t)       // 👈 Moderate transmission: 0.7 (glassy) → 0.1 (solid)
        material.roughness = THREE.MathUtils.lerp(0.15, 0.05, t)       // 👈 Surface roughness: 0.15 (smooth) → 0.25 (diffuse)

        material.needsUpdate = true
      }
    }
  })

  return (
    <group>
      {/* Glow layers - multiple layers for box-shadow effect */}
      <mesh position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]}>       {/* 👈 Behind Layer 2 (z=0.02) + SAME ROTATION */}
        <RoundedBoxGeometry args={[5.9, 5.9, 0.1]} radius={0.1} smoothness={5} />  {/* 👈 Square rounded box glow for Layer 2 */}
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0.0]} rotation={[Math.PI / 2, 0, 0]}>       {/* 👈 Behind Layer 2 + SAME ROTATION */}
        <RoundedBoxGeometry args={[6.1, 6.1, 0.1]} radius={0.1} smoothness={5} />  {/* 👈 Square rounded box glow for Layer 2 */}
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.2}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, -0.01]} rotation={[Math.PI / 2, 0, 0]}>      {/* 👈 Behind Layer 2 + SAME ROTATION */}
        <RoundedBoxGeometry args={[6.5, 6.5, 0.1]} radius={0.1} smoothness={5} />  {/* 👈 Square rounded box glow for Layer 2 */}
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
        <RoundedBoxGeometry args={[5.5, 5.5, 0.4]} radius={0.1} smoothness={5} />  {/* 👈 Square rounded box geometry for OLED layer with depth */}
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

      // 🌊 OSCILLATION EFFECT - Gentle floating animation when not hovering
      const oscillationIntensity = 1 - hoverState.intensity  // Fade out oscillation on hover
      const oscillationY = Math.sin(time * 0.7 + 2.0) * 0.3 * oscillationIntensity  // Different frequency and phase for natural movement
      const oscillationZ = Math.cos(time * 0.8 + 1.5) * 0.02 * oscillationIntensity  // Subtle Z oscillation with different phase

      // Layer 3 positioned as BOTTOM OLED layer (furthest from camera) - Z-axis stacking
      // Base position: bottom layer in Z-stack with mouse proximity effect
      meshRef.current.position.x = 0
      //meshRef.current.position.y = Math.sin(time * 0.5 + 1.0) * 0.05
      meshRef.current.position.y = 1.4 + (hoverState.intensity * 0.8) + oscillationY  // Dramatic downward movement on hover + oscillation
      meshRef.current.position.z = 0.04 + oscillationZ  // Bottom layer at z=0.04 (furthest from camera) + oscillation

       //Initial rotation
        meshRef.current.rotation.x = -1.6


      // Mouse interaction - minimal rotation for OLED realism
      //meshRef.current.rotation.x = mousePositionState.y * 0.02
      meshRef.current.rotation.y = mousePositionState.x * 0.02
      meshRef.current.rotation.z = 0

      // 🔧 BOX GEOMETRY NOTE: BoxGeometry doesn't support vertex manipulation
      // The 3D depth is now provided by the BoxGeometry itself

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
        material.opacity = THREE.MathUtils.lerp(1, 1, t)          // 👈 Transparency: 0.2 (glass) → 0.75 (opaque)
        material.transmission = THREE.MathUtils.lerp(0.95, 0.2, t)      // 👈 Light transmission: 0.95 (glass) → 0.2 (solid)
        material.roughness = THREE.MathUtils.lerp(0.2, 1, t)         // 👈 Surface roughness: 0.2 (constant)

        material.needsUpdate = true;
      }
    }
  })

  return (
    <group>
      {/* Glow layers - multiple layers for box-shadow effect */}
      <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>       {/* 👈 Behind Layer 3 (z=0.04) + SAME ROTATION */}
        <RoundedBoxGeometry args={[5.4, 5.4, 0.1]} radius={0.1} smoothness={5} />  {/* 👈 Square rounded box glow for Layer 3 */}
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>       {/* 👈 Behind Layer 3 + SAME ROTATION */}
        <RoundedBoxGeometry args={[5.6, 5.6, 0.1]} radius={0.1} smoothness={5} />  {/* 👈 Square rounded box glow for Layer 3 */}
        <meshBasicMaterial
          color={new THREE.Color(COLORS.GLOW_COLOR)}      // 👈 Glow color from COLORS object
          transparent={true}
          opacity={hoverState.intensity * 0.2}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]}>       {/* 👈 Behind Layer 3 + SAME ROTATION */}
        <RoundedBoxGeometry args={[6.0, 6.0, 0.1]} radius={0.1} smoothness={5} />  {/* 👈 Square rounded box glow for Layer 3 */}
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
        rotation={[Math.PI / 2, 0, 0]}      // 👈 90° rotation - flat side points upward (SAME AS OTHER LAYERS)
      >
        <RoundedBoxGeometry args={[5, 5, 0.4]} radius={0.1} smoothness={5} />  {/* 👈 Square rounded box geometry for OLED layer with depth */}
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

// Flashlight Spotlight Component - Creates moving flashlight effect
function FlashlightSpotlight() {
  const spotlightRef = useRef<THREE.SpotLight>(null)
  const targetRef = useRef<THREE.Object3D>(null)

  useFrame(() => {
    if (spotlightRef.current && targetRef.current && hoverState.intensity > 0) {
      // Position spotlight above the scene, following cursor
      const spotlightX = mousePositionState.x * 3
      const spotlightY = -1  // Above Layer 3
      const spotlightZ = 3   // In front of layers

      spotlightRef.current.position.set(spotlightX, spotlightY, spotlightZ)

      // Target the flashlight beam at Layer 3 position (following cursor)
      const targetX = mousePositionState.x * 2
      const targetY = 1.4  // Layer 3 Y position
      const targetZ = 0.04 // Layer 3 Z position

      targetRef.current.position.set(targetX, targetY, targetZ)
      spotlightRef.current.target = targetRef.current

      // Update intensity based on hover state
      spotlightRef.current.intensity = hoverState.intensity * 6
    }
  })

  return (
    <group>
      <spotLight
        ref={spotlightRef}
        angle={Math.PI / 8}  // Narrow beam like a flashlight (22.5 degrees)
        penumbra={0.3}       // Soft edges
        intensity={0}        // Start at 0, controlled by useFrame
        distance={15}        // How far the light reaches
        decay={2}            // Natural light falloff
        color={COLORS.HOVER_OLED}  // Cyan flashlight color
        castShadow={false}
      />
      <object3D ref={targetRef} />
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
    <div className="relative min-h-screen overflow-hidden">
        {/* Text overlay positioned over the 3D scene */}
        <div
            className="relative w-full h-screen overflow-hidden sm:h-[80vh] md:h-[90vh] lg:h-screen canvas-container"
            onMouseMove={handleMouseMove}
        >
            <Canvas
                camera={{
                    position: typeof window !== 'undefined' && window.innerWidth < 768
                        ? [8, 8, 8]      // Mobile: pulled back more for better view
                        : typeof window !== 'undefined' &&  window.innerWidth < 1024
                        ? [7, 3.8, 5]    // Tablet: medium distance
                        : [10, 7.7, 4],   // Desktop: original position
                    fov: typeof window !== 'undefined' && window.innerWidth < 768
                        ? 85             // Mobile: wider FOV
                        : typeof window !== 'undefined' &&  window.innerWidth < 1024
                        ? 80             // Tablet: medium FOV
                        : 75             // Desktop: original FOV
                }}
                style={{ width: '100%', height: '100%' }}
                className="canvas-responsive"
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={0.6} />
                <directionalLight position={[-5, 3, -2]} intensity={0.4} />
                <pointLight position={[3, 2, 2]} intensity={0.8} color={COLORS.POINT_LIGHT} />
                <pointLight position={[-3, 1, -1]} intensity={0.5} color={COLORS.POINT_LIGHT} />

                {/* 🔦 FLASHLIGHT SPOTLIGHT - Follows cursor over Layer 3 */}
                <FlashlightSpotlight />

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
    </div>

  )
}
