'use client'

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

const Model = () => {
  const gltf = useGLTF('/three/lumina.gltf') as GLTF

  return (
    <primitive
      object={gltf.scene}
      scale={0.38}     // Ajusta según el tamaño de tu modelo
      position={[1, -0.5, 0]}
    />
  )
}

export default Model
