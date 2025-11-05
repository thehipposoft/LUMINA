'use client'

import React, { useMemo } from 'react'
import { useGLTF, Environment, ContactShadows, OrbitControls, Stats } from '@react-three/drei'
import { Object3D, Mesh, MeshPhysicalMaterial } from 'three';
import { useControls } from 'leva';

const GlassModel = () => {
    const gltf = useGLTF('/three/lumina.gltf')

    // 🎛️ PREVIEW CONTROLS
    const previewControls = useControls('Preview Settings', {
        showStats: { value: false },
        enableOrbitControls: { value: true },
        showContactShadows: { value: true },
        autoRotate: { value: false },
        autoRotateSpeed: {
            value: 2,
            min: 0.1,
            max: 10,
            step: 0.1
        }
    })

    // 🌍 ENVIRONMENT CONTROLS
    const environmentControls = useControls('Environment', {
        preset: {
            value: 'city',
            options: [
                'sunset',
                'dawn',
                'night',
                'warehouse',
                'forest',
                'apartment',
                'studio',
                'city',
                'park',
                'lobby'
            ]
        },
        background: { value: false },
        blur: {
            value: 0,
            min: 0,
            max: 1,
            step: 0.01
        },
        intensity: {
            value: 1,
            min: 0,
            max: 2,
            step: 0.1
        }
    })

    // 🔍 GLASS MATERIAL CONTROLS
    const glassControls = useControls('Glass Properties', {
        opacity: {
            value: 0.85,
            min: 0,
            max: 1,
            step: 0.01
        },
        roughness: {
            value: 0.25,
            min: 0,
            max: 1,
            step: 0.01
        },
        metalness: {
            value: 0.00,
            min: 0,
            max: 1,
            step: 0.01
        },
        color: '#007BFF',
        transmission: {
            value: 1,
            min: 0,
            max: 1,
            step: 0.1
        },
        thickness: {
            value: 0.2,
            min: 0,
            max: 3,
            step: 0.05
        },
        ior: {
            value: 1.2,
            min: 0,
            max: 3,
            step: 0.1
        }
    })

    // 🎨 ADVANCED MATERIAL PROPERTIES
    const materialProps = useControls('Advanced Glass', {
        thickness: {
            value: 0.2,
            min: 0,
            max: 3,
            step: 0.05
        },
        chromaticAberration: {
            value: 0.02,
            min: 0,
            max: 1,
            step: 0.01
        },
        clearcoat: {
            value: 1,
            min: 0,
            max: 1,
            step: 0.01
        },
        clearcoatRoughness: {
            value: 0.1,
            min: 0,
            max: 1,
            step: 0.01
        },
        reflectivity: {
            value: 0.5,
            min: 0,
            max: 1,
            step: 0.01
        },
        backside: false
    })

    // 🔧 GLASS MATERIAL - Combinando controles básicos y avanzados
    const glassMaterial = useMemo(() => {
        return new MeshPhysicalMaterial({
            // Propiedades básicas de glassControls
            color: glassControls.color,
            transparent: true,
            opacity: glassControls.opacity,
            roughness: glassControls.roughness,
            metalness: glassControls.metalness,
            transmission: glassControls.transmission,
            ior: glassControls.ior,

            // Propiedades avanzadas de materialProps
            thickness: materialProps.thickness,
            clearcoat: materialProps.clearcoat,
            clearcoatRoughness: materialProps.clearcoatRoughness,
            reflectivity: materialProps.reflectivity,

            // Configuraciones adicionales
            side: materialProps.backside ? 2 : 0, // 2 = DoubleSide, 0 = FrontSide
        })
    }, [glassControls, materialProps]);



    // 🎯 APPLY MATERIAL - Reemplazamos materiales de cada mesh en el GLTF
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

    return (
        <group>
            {/* 🌍 ENVIRONMENT */}
            <Environment
                preset={environmentControls.preset as "sunset" | "dawn" | "night" | "warehouse" | "forest" | "apartment" | "studio" | "city" | "park" | "lobby"}
                background={environmentControls.background}
                blur={environmentControls.blur}
            />

            {/* 🎮 ORBIT CONTROLS */}
            {previewControls.enableOrbitControls && (
                <OrbitControls
                    autoRotate={previewControls.autoRotate}
                    autoRotateSpeed={previewControls.autoRotateSpeed}
                    enablePan={true}
                    enableZoom={false}
                    enableRotate={true}
                />
            )}

            {/* 📊 PERFORMANCE STATS */}
            {previewControls.showStats && <Stats />}

            {/* 🔲 CONTACT SHADOWS */}
            {previewControls.showContactShadows && (
                <ContactShadows
                    position={[0, -1.4, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={1}
                    far={4}
                />
            )}

            {/* 🏆 GLTF MODEL */}
            <primitive
                object={gltf.scene}
                scale={1}
                position={[8, -3, -1]}
            />
        </group>
    )
}

export default GlassModel
