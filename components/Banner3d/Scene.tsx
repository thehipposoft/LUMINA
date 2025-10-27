'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import GlassModel from './GlassModel'
import { OrbitControls, Text } from '@react-three/drei'
import { Group } from 'three'
import { Html } from '@react-three/drei'

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <AnimatedModel />
      </Suspense>
        <Html center>
        <div className='text-6xl w-7xl mx-auto text-center' style={{fontFamily: 'Montserrat' }}>
            A <strong className='font-semibold'>REVOLUTION</strong> in OLED technology
        </div>
        </Html>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

// Texto centrado y siempre fijo
const CenteredText = () => {
  return (
    <Text
        position={[0, 0, 2]}
        fontSize={0.08}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        font="/three/Montserrat-Regular.ttf"
        // Fijo respecto a la cámara
        // La propiedad "renderOrder" asegura que siempre se vea
        renderOrder={999}
    >
    A REVOLUTION in OLED technology
    </Text>
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
      position={[0.5, 1, -2]}
      rotation={[Math.PI / 5, Math.PI / 4, 0]}
    >
      <GlassModel />
    </group>
  )
}

export default Scene
