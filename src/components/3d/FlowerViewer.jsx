import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Flower from './Flower'

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