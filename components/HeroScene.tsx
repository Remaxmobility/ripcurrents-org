'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// ─── Shaders ─────────────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uBigWavesElevation;
  uniform vec2  uBigWavesFrequency;
  uniform float uBigWavesSpeed;
  uniform float uSmallWavesElevation;
  uniform float uSmallWavesFrequency;
  uniform float uSmallWavesSpeed;

  varying float vElevation;
  varying vec2  vUv;

  // Simplex 2D noise (Stefan Gustavson)
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy  -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                             dot(x12.zw, x12.zw)), 0.0);
    m = m * m * m * m;
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec4 pos = modelMatrix * vec4(position, 1.0);

    float elevation =
      sin(pos.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
      sin(pos.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
      uBigWavesElevation;

    for (float i = 1.0; i <= 4.0; i++) {
      elevation -= abs(
        snoise(vec2(pos.xz * uSmallWavesFrequency * i + uTime * uSmallWavesSpeed))
      ) * (uSmallWavesElevation / i);
    }

    vElevation = elevation;
    pos.y += elevation;
    gl_Position = projectionMatrix * viewMatrix * pos;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3  uDepthColor;
  uniform vec3  uSurfaceColor;
  uniform float uColorOffset;
  uniform float uColorMultiplier;
  uniform float uTime;
  uniform float uRipIntensity;

  varying float vElevation;
  varying vec2  vUv;

  void main() {
    float mix_s = clamp((vElevation + uColorOffset) * uColorMultiplier, 0.0, 1.0);
    vec3  color  = mix(uDepthColor, uSurfaceColor, mix_s);

    // Rip-current channel — turbulent dark strip
    float rip = 1.0 - smoothstep(0.0, 0.07, abs(vUv.x - 0.5));
    rip *= uRipIntensity;
    color = mix(color, vec3(0.004, 0.02, 0.09), rip);

    // Secondary weaker channel offset
    float rip2 = 1.0 - smoothstep(0.0, 0.04, abs(vUv.x - 0.62));
    color = mix(color, vec3(0.006, 0.03, 0.11), rip2 * uRipIntensity * 0.4);

    // Foam / whitecaps at crests
    float foam = smoothstep(0.06, 0.14, vElevation) * 0.35;
    color = mix(color, vec3(0.72, 0.88, 0.96), foam);

    // Horizon shimmer
    float shimmer = smoothstep(0.85, 1.0, vUv.y) * 0.3;
    color = mix(color, vec3(0.0, 0.42, 0.62), shimmer);

    gl_FragColor = vec4(color, 1.0);
  }
`

// ─── Ocean Mesh ───────────────────────────────────────────────────────────────

function OceanMesh() {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime:                { value: 0 },
      uBigWavesElevation:   { value: 0.38 },
      uBigWavesFrequency:   { value: new THREE.Vector2(3.5, 1.5) },
      uBigWavesSpeed:       { value: 0.7 },
      uSmallWavesElevation: { value: 0.16 },
      uSmallWavesFrequency: { value: 3.2 },
      uSmallWavesSpeed:     { value: 0.22 },
      uDepthColor:          { value: new THREE.Color('#002A4A') },
      uSurfaceColor:        { value: new THREE.Color('#0096C7') },
      uColorOffset:         { value: 0.1 },
      uColorMultiplier:     { value: 5.5 },
      uRipIntensity:        { value: 0.75 },
    }),
    []
  )

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh rotation={[-Math.PI * 0.35, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[14, 14, 256, 256]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

// ─── Floating Particles (sea spray / foam) ────────────────────────────────────

function OceanParticles() {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, sizes] = useMemo(() => {
    const count = 800
    const pos  = new Float32Array(count * 3)
    const size = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.2 - 0.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14
      size[i] = Math.random() * 0.04 + 0.01
    }
    return [pos, size]
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={pointsRef} rotation={[-Math.PI * 0.35, 0, 0]} position={[0, -0.8, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ADE8F4"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  )
}

// ─── Camera Drift ─────────────────────────────────────────────────────────────

function CameraDrift() {
  const { camera } = useThree()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    camera.position.x = Math.sin(t * 0.08) * 0.4
    camera.position.y = 3.8 + Math.sin(t * 0.12) * 0.15
    camera.position.z = 7.2 + Math.sin(t * 0.06) * 0.3
    camera.lookAt(0, -0.5, 0)
  })
  return null
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function Scene() {
  return (
    <>
      <CameraDrift />
      <color attach="background" args={['#010D1B']} />
      <fog attach="fog" color="#010810" near={12} far={28} />
      <ambientLight intensity={0.3} color="#0A2540" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4}
        color="#48CAE4"
        castShadow={false}
      />
      <directionalLight position={[-8, 4, -6]} intensity={0.4} color="#0077B6" />
      <pointLight position={[0, 6, 0]} intensity={0.8} color="#00B4D8" distance={20} />
      <Stars radius={60} depth={30} count={1200} factor={3} saturation={0.4} fade speed={0.6} />
      <OceanMesh />
      <OceanParticles />
    </>
  )
}

// ─── Static Fallback (for reduced-motion) ────────────────────────────────────

function StaticFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse at 50% 70%, #0A2540 0%, #010D1B 60%, #010810 100%)',
      }}
    />
  )
}

// ─── Export ──────────────────────────────────────────────────────────────────

export default function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    // Check WebGL availability
    try {
      const c = document.createElement('canvas')
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl')
      if (!gl) setWebglOk(false)
    } catch {
      setWebglOk(false)
    }
  }, [])

  if (reducedMotion || !webglOk) return <StaticFallback />

  return (
    <Canvas
      camera={{ position: [0, 3.8, 7.2], fov: 55 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene />
    </Canvas>
  )
}
