'use client'

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import {
  ExtrudeGeometry,
  Group,
  MathUtils,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  TextureLoader,
} from 'three'

function roundedShape(width: number, height: number, radius: number) {
  const x = -width / 2,
    y = -height / 2
  const shape = new Shape()
  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + height - radius)
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  shape.lineTo(x + radius, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)
  return shape
}
const bodyGeometry = new ExtrudeGeometry(roundedShape(2.64, 5.45, 0.28), {
  depth: 0.16,
  bevelEnabled: true,
  bevelSize: 0.025,
  bevelThickness: 0.025,
  bevelSegments: 3,
  steps: 1,
  curveSegments: 12,
})
bodyGeometry.translate(0, 0, -0.08)
const glassGeometry = new ShapeGeometry(roundedShape(2.55, 5.35, 0.24), 16)
const screenGeometry = new ShapeGeometry(roundedShape(2.4, 5.16, 0.22), 16)
const positions = screenGeometry.attributes.position
const uv = screenGeometry.attributes.uv
for (let i = 0; i < positions.count; i++)
  uv.setXY(i, positions.getX(i) / 2.4 + 0.5, positions.getY(i) / 5.16 + 0.5)

function Phone({ onReady }: { onReady: () => void }) {
  const texture = useLoader(TextureLoader, '/media/phone-screen.png')
  texture.colorSpace = SRGBColorSpace
  const group = useRef<Group>(null)
  const target = useRef({ x: 0, y: 0 })
  const elapsed = useRef(0)
  const { invalidate, gl } = useThree()
  useEffect(() => {
    onReady()
    const canvas = gl.domElement
    function move(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      target.current = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      }
      invalidate()
    }
    function leave() {
      target.current = { x: 0, y: 0 }
      invalidate()
    }
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    return () => {
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [gl, invalidate, onReady])
  useFrame((_, delta) => {
    if (!group.current) return
    elapsed.current += delta
    const progress = Math.min(elapsed.current / 1.8, 1)
    const settled = 1 - Math.pow(1 - progress, 3)
    const x = -0.06 + target.current.y * 0.12
    const y = -0.3 + target.current.x * 0.26
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      x,
      5,
      delta,
    )
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      y,
      5,
      delta,
    )
    group.current.rotation.z = -0.12
    group.current.position.y = (1 - settled) * -0.45
    if (
      progress < 1 ||
      Math.abs(group.current.rotation.x - x) +
        Math.abs(group.current.rotation.y - y) >
        0.001
    )
      invalidate()
  })
  return (
    <group ref={group} rotation={[-0.06, -0.5, -0.12]}>
      <mesh geometry={bodyGeometry}>
        <meshStandardMaterial
          color="#9faec6"
          metalness={0.88}
          roughness={0.24}
        />
      </mesh>
      <mesh geometry={glassGeometry} position={[0, 0, 0.11]}>
        <meshStandardMaterial
          color="#171f32"
          metalness={0.25}
          roughness={0.2}
        />
      </mesh>
      <mesh geometry={screenGeometry} position={[0, 0, 0.12]}>
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[1.33, 0.6, 0]}>
        <boxGeometry args={[0.045, 0.65, 0.08]} />
        <meshStandardMaterial color="#abb9ce" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function ContextHealth({ onUnavailable }: { onUnavailable: () => void }) {
  const { gl } = useThree()
  useEffect(() => {
    const canvas = gl.domElement
    const lost = () => onUnavailable()
    canvas.addEventListener('webglcontextlost', lost)
    return () => canvas.removeEventListener('webglcontextlost', lost)
  }, [gl, onUnavailable])
  return null
}

export default function HeroScene({
  onReady,
  onUnavailable,
}: {
  onReady: () => void
  onUnavailable: () => void
}) {
  const [visible, setVisible] = useState(true)
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    )
    if (host.current) observer.observe(host.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div className="webgl-scene" ref={host} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9.9], fov: 36 }}
        dpr={[1, 1.5]}
        frameloop={visible ? 'demand' : 'never'}
        gl={{ alpha: true, antialias: true }}
        fallback={<span />}
      >
        <ambientLight intensity={2.2} />
        <directionalLight position={[4, 6, 8]} intensity={4} />
        <directionalLight position={[-4, 0, 3]} color="#678cff" intensity={3} />
        <Phone onReady={onReady} />
        <ContextHealth onUnavailable={onUnavailable} />
      </Canvas>
    </div>
  )
}
