'use client'

import React, { useMemo, useState, useRef } from 'react'
import { useGLTF, Environment, Lightformer, ContactShadows, OrbitControls, Stats } from '@react-three/drei';
import { Object3D, Mesh, MeshPhysicalMaterial, Vector3, Group, Color, MathUtils } from 'three';
import { useControls, Leva } from 'leva';
import { useFrame, useThree } from '@react-three/fiber';

const GlassModel = () => {
    const gltf = useGLTF('/three/lumina.gltf')

    // 🎛️ PREVIEW CONTROLS
    const previewControls = useControls('Preview Settings', {
        showStats: { value: false },
        enableOrbitControls: { value: true },
        showContactShadows: { value: false },
        autoRotate: { value: false },
        autoRotateSpeed: {
            value: 2,
            min: 0.1,
            max: 10,
            step: 0.1
        }
    })

    // 🌍 ENVIRONMENT CONTROLS
    // Entorno procedural (Lightformers): sin descargar ningún .hdr
    const environmentControls = useControls('Environment', {
        background: { value: false },
        blur: {
            value: 0.49,
            min: 0,
            max: 1,
            step: 0.01
        },
        intensity: {
            value: 1.2,
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
    }, [gltf, glassMaterial]);

    // 🎯 MOUSE INTERACTION & ANIMATION - Similar to your OLED effect
    useFrame((state) => {
        const time = state.clock.elapsedTime
        const { mouse } = state

        // Detect hover over model area
        const distance = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y)
        const hoverRadius = 1.2
        const isHovered = distance < hoverRadius

        // Calculate hover intensity (0 to 1)
        const hoverIntensity = isHovered ? Math.max(0, 1 - (distance / hoverRadius)) : 0

        // 🎨 DYNAMIC MATERIAL PROPERTIES - Apply to all meshes
        gltf.scene.traverse((child: Object3D) => {
            if ((child as Mesh).isMesh) {
                const mesh = child as Mesh
                const material = mesh.material as MeshPhysicalMaterial

                if (material) {
                    // 💎 Glass effect intensifies on hover
                    const baseOpacity = glassControls.opacity
                    const baseTransmission = glassControls.transmission
                    const baseRoughness = glassControls.roughness

                    // Dynamic material changes based on hover
                   // material.opacity = MathUtils.lerp(baseOpacity, baseOpacity * 0.9, hoverIntensity)
                   // material.transmission = MathUtils.lerp(baseTransmission, Math.min(1, baseTransmission * 1.2), hoverIntensity)
                    //material.roughness = MathUtils.lerp(baseRoughness, baseRoughness * 0.5, hoverIntensity)

                    // Add subtle color shift on hover
                    const baseColor = new Color(glassControls.color)
                    const hoverColor = new Color(glassControls.color).multiplyScalar(2.1)
                    //material.color.lerpColors(baseColor, hoverColor, hoverIntensity)

                    // Enhanced clearcoat effect on hover
                    //material.clearcoat = MathUtils.lerp(materialProps.clearcoat, Math.min(1, materialProps.clearcoat * 1.3), hoverIntensity)
                }
            }
        })
    })

    return (
        <>
            {/* 🎛️ LEVA CONTROLS - Cambia hidden={true} para ocultar */}
            <Leva
                collapsed={false}
                hidden={true}
                oneLineLabels={true}
                flat={true}
                hideCopyButton={true}
            />

            <group>
                {/* 🌍 ENVIRONMENT */}
                {/* Generado en tiempo real con Lightformers: 0 KB, sin peticiones de red */}
                <Environment
                    resolution={256}
                    background={environmentControls.background}
                    blur={environmentControls.blur}
                    environmentIntensity={environmentControls.intensity}
                >
                    {/* Fondo cálido tipo atardecer */}
                    <color attach="background" args={['#2a1a14']} />
                    {/* Luz principal superior */}
                    <Lightformer intensity={2} color="#fff4e6" position={[0, 5, -9]} scale={[10, 10, 1]} />
                    {/* Franjas laterales para reflejos en el vidrio */}
                    <Lightformer intensity={1.5} color="#ffd6a8" rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.5, 1]} />
                    <Lightformer intensity={1.5} color="#ffffff" rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
                    {/* Acento cálido */}
                    <Lightformer form="ring" color="#ff9a5c" intensity={3} position={[-5, 2, 5]} scale={2} onUpdate={(self) => self.lookAt(0, 0, 0)} />
                </Environment>

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
        </>
    )
}

export default GlassModel
