import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import Flower from './3d/Flower'

const ANCHO = 40

const FONDO = 16


function Camara() {
  const size = useThree((estado) => estado.size)
  const zoom = Math.min(size.width / 34, size.height / 13.5)

  return (
    <OrthographicCamera
      makeDefault
      position={[5, 4, 14]}
      zoom={zoom}
      near={0.1}
      far={100}
      onUpdate={(camara) => camara.lookAt(0, 0, 0)}
    />
  )
}

function FlorDelJardin({ x, z, escala, fase, color }) {
  const balanceo = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    balanceo.current.rotation.z = Math.sin(t * 1.2 + fase) * 0.08
    balanceo.current.rotation.x = Math.cos(t * 0.9 + fase) * 0.05
  })

  return (
    <group position={[x, 0, z]} scale={escala}>
      <group ref={balanceo}>
        <group position={[0, 2, 0]}>
          <Flower color={color} segmentos={12} />
        </group>
      </group>
    </group>
  )
}

function JardinFlores({ flores }) {
  const plantas = useMemo(
    () =>
      Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * (ANCHO - 2),
        z: (Math.random() - 0.5) * (FONDO - 2),
        escala: 0.5 + Math.random() * 0.4,
        fase: Math.random() * Math.PI * 2,
        color: flores[Math.floor(Math.random() * flores.length)].color,
      })),
    [flores]
  )

  return (
    <motion.section
      id="jardin"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto mt-14 max-w-[2000px] scroll-mt-24"
    >
      <div className="h-[32rem] overflow-hidden rounded-3xl border border-stone-200 bg-salvia-100 dark:border-white/10 dark:bg-stone-900">
        <Canvas>
          <Camara />
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 8, 3]} intensity={2} />

          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[ANCHO, 0.4, FONDO]} />
            <meshStandardMaterial color="#869b75" />
          </mesh>

          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[ANCHO, 1.2, FONDO]} />
            <meshStandardMaterial color="#7b5232" />
          </mesh>

          {plantas.map((planta) => (
            <FlorDelJardin key={planta.id} {...planta} />
          ))}
        </Canvas>
      </div>
      <p className="mt-3 text-xs text-stone-400">Un jardín a escala con las flores de la enciclopedia.</p>
    </motion.section>
  )
}

export default JardinFlores