'use client'

import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Object3D, Mesh, MeshPhysicalMaterial } from 'three'
import { useControls } from 'leva'

const GlassModel = () => {
  const gltf = useGLTF('/three/lumina.gltf')

  // Parámetros del vidrio controlables con Leva
  const { opacity, roughness, metalness, color } = useControls('Glass', {
    opacity: { value: 0.85, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.25, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0.70, min: 0, max: 1, step: 0.01 },
    color: '#007BFF'
  })

  // Creamos un material físico reutilizable
  const glassMaterial = useMemo(() => {
    return new MeshPhysicalMaterial({
      color,
      transparent: true,
      opacity,
      roughness,
      metalness,
      clearcoat: 1,
      clearcoatRoughness: 0
    })
  }, [color, opacity, roughness, metalness])

  // Reemplazamos materiales de cada mesh en el GLTF
  useMemo(() => {
  gltf.scene.traverse((child: Object3D) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh
      mesh.material = glassMaterial
      mesh.castShadow = true
      mesh.receiveShadow = true
    }
  })
}, [gltf, glassMaterial])

  return <primitive object={gltf.scene} scale={0.38} position={[1, -0.5, 0]} />
}

export default GlassModel
