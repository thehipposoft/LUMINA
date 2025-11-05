'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import GlassModel from './GlassModel'
import { OrbitControls } from '@react-three/drei'
import { Group } from 'three'

const Scene = () => {
    return (
        <div
            className="relative w-full h-screen overflow-hidden sm:h-[80vh] md:h-[90vh] lg:h-screen canvas-container"
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
                >
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 3, 2]} intensity={3} />
                <Suspense fallback={null}>
                    <AnimatedModel />
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate={false} enableRotate={true} enablePan={true} />
            </Canvas>
        </div>
    )
}

// Modelo flotante / efecto respiración
const AnimatedModel = () => {
    const groupRef = useRef<Group>(null)

    useFrame(({ clock }) => {
        if (groupRef.current) {
        const t = clock.getElapsedTime()
        // Movimiento flotante
        groupRef.current.position.y = -0.3 + Math.sin(t * 1) * 0.08
        }
    })

    return (
        <group
            ref={groupRef}
            position={[0.5, 1.5, 0]}
            rotation={[Math.PI / 5, Math.PI / 4, 0]}
        >
            <GlassModel />
        </group>
    )
}

export default Scene
