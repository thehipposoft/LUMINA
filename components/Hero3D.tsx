"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

// Shared mouse position state
const mousePositionState = { x: 0, y: 0 };

// Create rounded particle texture
function createCircleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;

  // Create radial gradient for soft circular particles
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  return canvas;
}

function SmokeParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 800; // Much more particles for denser effect

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      const geometry = particlesRef.current.geometry as THREE.BufferGeometry;
      const positions = geometry.attributes.position;
      const opacity = geometry.attributes.opacity;
      const colors = geometry.attributes.color;

      // Initialize colors array if it doesn't exist
      if (!colors) {
        const colorArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
          // Default gray-blue color
          colorArray[i * 3] = 0.545; // R
          colorArray[i * 3 + 1] = 0.616; // G
          colorArray[i * 3 + 2] = 0.765; // B
        }
        geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      }

      for (let i = 0; i < particleCount; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);

        // Slow floating motion
        const floatX = Math.sin(time * 0.5 + i * 0.1) * 0.015;
        const floatY = Math.cos(time * 0.3 + i * 0.15) * 0.01;
        const floatZ = Math.sin(time * 0.4 + i * 0.2) * 0.008;

        // Distance from mouse (scaled to 3D coordinates)
        const mouseX = mousePositionState.x * 20;
        const mouseY = mousePositionState.y * 5;
        const mouseDistance = Math.sqrt(
          Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
        );

        // Avoidance behavior - particles push away from mouse
        const avoidanceRadius = 12;
        let pushX = 0;
        let pushY = 0;

        if (mouseDistance < avoidanceRadius && mouseDistance > 0) {
          const pushStrength = (avoidanceRadius - mouseDistance) / avoidanceRadius;
          const directionX = (x - mouseX) / mouseDistance;
          const directionY = (y - mouseY) / mouseDistance;

          pushX = directionX * pushStrength * 0.3;
          pushY = directionY * pushStrength * 0.3;
        }

        // Base opacity with subtle breathing effect
        const baseOpacity = 0.3 + Math.sin(time * 1.5 + i * 0.2) * 0.15;

        // Intense neon glow effect near mouse
        const glowRadius = 18;
        const neonInfluence = Math.max(0, 1 - mouseDistance / glowRadius);
        const coreGlow = Math.max(0, 1 - mouseDistance / (glowRadius * 0.5)); // Brighter core

        // Update positions with floating motion + mouse avoidance
        positions.setX(i, x + floatX + pushX);
        positions.setY(i, y + floatY + pushY);
        positions.setZ(i, z + floatZ);

        // Update opacity with intense neon glow enhancement
        if (opacity) {
          const neonGlow = neonInfluence * (0.8 + 0.4 * Math.sin(time * 10 + i * 0.5));
          const glowOpacity = baseOpacity + neonGlow;
          opacity.setX(i, Math.min(1.0, glowOpacity));
        }

        // Update colors with neon effect
        if (colors) {
          const colorAttribute = geometry.attributes.color;
          if (neonInfluence > 0) {
            // Ultra-bright neon colors near mouse
            const intensity = (neonInfluence + coreGlow * 0.5) * (1.5 + 0.8 * Math.sin(time * 8 + i * 0.4));
            const colorPhase = Math.sin(time * 5 + i * 0.3) * 0.5 + 0.5;

            // Electric neon color cycling: hot pink -> electric cyan -> neon green
            const neonR = intensity * (1.0 - colorPhase * 0.7) + 0.2; // Hot pink to cyan
            const neonG = intensity * (0.3 + colorPhase * 0.7) + 0.1; // Electric green boost
            const neonB = intensity * (colorPhase + 0.5) + 0.3; // Electric blue/cyan

            colorAttribute.setXYZ(
              i,
              Math.min(2.0, neonR), // Super saturated red/pink
              Math.min(2.5, neonG), // Ultra bright green
              Math.min(2.2, neonB)  // Electric blue
            );
          } else {
            // Darker base color for more contrast
            colorAttribute.setXYZ(i, 0.3, 0.4, 0.6);
          }
        }
      }

      positions.needsUpdate = true;
      if (opacity) {
        opacity.needsUpdate = true;
      }
      if (colors) {
        colors.needsUpdate = true;
      }
    }
  });

  // Initialize particles
  const particles = new Float32Array(particleCount * 3);
  const opacities = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 40; // X
    particles[i * 3 + 1] = (Math.random() - 0.5) * 15; // Y
    particles[i * 3 + 2] = Math.random() * 5 - 2; // Z
    opacities[i] = Math.random() * 0.5 + 0.2;
  }

  return (
    <points ref={particlesRef} position={[0, 2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
        <bufferAttribute
          attach="attributes-opacity"
          args={[opacities, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        transparent
        opacity={0.6}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        map={new THREE.CanvasTexture(createCircleTexture())}
      />
    </points>
  );
}

function SimpleWave() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position;
      const colors = geometry.attributes.color;

      // Initialize colors array if it doesn't exist
      if (!colors) {
        const colorArray = new Float32Array(positions.count * 3);
        for (let i = 0; i < positions.count; i++) {
          // Default blue color
          colorArray[i * 3] = 0; // R
          colorArray[i * 3 + 1] = 0.48; // G
          colorArray[i * 3 + 2] = 1; // B
        }
        geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      }

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        // Simple horizontal wave movement (slower)
        const wave = Math.sin(x * 0.3 + time * 0.8);

        // Mouse interaction bump effect (more prominent)
        const distanceFromMouse = Math.sqrt(
          Math.pow(x - mousePos.x * 20, 2) + Math.pow(y - mousePos.y * 5, 2)
        );
        const mouseInfluence = Math.max(0, 1 - distanceFromMouse / 10);
        const mouseBump = mouseInfluence * 1.2 * Math.sin(time * 2);

        positions.setZ(i, wave + mouseBump);

        // Fluorescent color effect in bump area
        if (geometry.attributes.color) {
          const colorAttribute = geometry.attributes.color;
          if (mouseInfluence > 0) {
            // Fluorescent cyan-green color in bump area
            const intensity = mouseInfluence * (0.5 + 0.5 * Math.sin(time * 4));
            colorAttribute.setXYZ(
              i,
              intensity * 0.2 + 0, // R - slight red tint
              intensity * 1.0 + 0.48, // G - bright green
              intensity * 0.8 + 1 // B - keep blue base
            );
          } else {
            // Default blue color
            colorAttribute.setXYZ(i, 0, 0.48, 1);
          }
        }
      }

      positions.needsUpdate = true;
      if (geometry.attributes.color) {
        geometry.attributes.color.needsUpdate = true;
      }
    }
  });

  const handlePointerMove = (event: THREE.Intersection) => {
    const x = (event.point.x / 20); // Normalize to wave coordinates
    const y = (event.point.y / 5);
    setMousePos({ x, y });

    // Update shared mouse position for smoke particles
    mousePositionState.x = x;
    mousePositionState.y = y;
  };

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[40, 10, 100, 20]} />
      <meshLambertMaterial
        vertexColors
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}



export default function Hero3D() {
  return (
    <>
      {/* SVG clip path definition with rounded corners */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="heroClipPath" clipPathUnits="objectBoundingBox">
            <path d="M 0,0
                     L 1,0
                     L 1,0.76
                     Q 1,0.76 0.985,0.76
                     L 0.635,0.76
                     Q 0.62,0.76 0.62,.775
                     L 0.62,1
                     L 0,0.99
                     Q 0,0.99 0,0.975
                     L 0,0.615
                     Q 0,0.6 0.015,0.6
                     L 0,0.6
                     Q 0,0.6 0,0.585
                     L 0,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: 'url(#heroClipPath)' }}
      >
      {/* Dark foggy background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(15, 23, 42, 0.8) 0%, rgba(2, 6, 23, 0.95) 70%, rgba(0, 0, 0, 1) 100%),
            linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(2, 6, 23, 0.8) 100%)
          `,
        }}
      />

      {/* Fog effect overlay */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(30, 58, 138, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(30, 58, 138, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.4) 0%, transparent 70%)
          `,
          filter: 'blur(40px)',
        }}
      />

      <Canvas camera={{ position: [0, 4, 10], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <directionalLight position={[-5, -5, -2]} intensity={0.3} />
        <fog attach="fog" args={['#0f172a', 8, 20]} />

        {/* Single horizontal wave with primary color */}
        <SimpleWave />

        {/* Interactive smoke particles that dissipate around mouse */}
        <SmokeParticles />
      </Canvas>
    </div>
    </>
  );
}
