'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import GlassModel from './GlassModel'
import { OrbitControls } from '@react-three/drei'
import { Group } from 'three';
import * as THREE from 'three';

const COLORS = {
  // Background dots colors
  DOTS_R: 0.1,               // 👈 Dots red component
  DOTS_G: 0.1,               // 👈 Dots green component
  DOTS_B: 0.9,               // 👈 Dots blue component
};

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

        //colorAttribute.setXYZ(i, colors[i3], colors[i3 + 1], colors[i3 + 2])
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
        size={0.15}
        transparent={true}
        opacity={0.9}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthTest={true}
        depthWrite={true}
      />
    </points>
  )
}

const Scene = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden sm:h-[80vh] md:h-[90vh] lg:h-screen canvas-container">
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
                >
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 3, 2]} intensity={3} />
                <Suspense fallback={null}>
                    <AnimatedModel />

                    {/* Background dots grid */}
                    <DotsGrid />
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate={false} enableRotate={true} enablePan={true} />
            </Canvas>
        </div>
    )
};

// Modelo flotante / efecto respiración
const AnimatedModel = () => {
    const groupRef = useRef<Group>(null)

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const t = clock.getElapsedTime()
            // Movimiento flotante
            groupRef.current.position.y = -0.3 + Math.sin(t * 1) * 0.5
        }
    })

    return (
        <group
            ref={groupRef}
            //position={[0.5, 1.5, 0]}
            rotation={[Math.PI / 40, Math.PI / 30, -0.1]}
        >
            <GlassModel />
        </group>
    )
}

export default Scene
