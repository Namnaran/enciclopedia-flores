import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Flower({ color }) {
  const petalos = 8

  return (
    <group>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 12]} />
        <meshStandardMaterial color="#3f7d3a" />
      </mesh>

      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#facc15" />
      </mesh>

      {Array.from({ length: petalos }).map((_, i) => {
        const angulo = (i / petalos) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angulo) * 0.55, 0, Math.sin(angulo) * 0.55]}
            rotation={[0, -angulo, 0]}
            scale={[1, 0.25, 0.5]}
          >
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
      })}
    </group>
  )
}

function FlowerViewer({ color, acelerar = false }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 3.5], fov: 40 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 2]} intensity={2} />
      <Flower color={color} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={acelerar ? 8 : 2}
      />
    </Canvas>
  )
}

export default FlowerViewer