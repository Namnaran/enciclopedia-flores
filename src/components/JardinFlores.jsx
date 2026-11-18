import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import Flower from './3d/Flower'
import { MathUtils } from 'three'
import SelectorMes from './SelectorMes'
import { mesesLargos } from '../meses'

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

function FlorDelJardin({ x, z, escala, fase, color, visible }) {
  const balanceo = useRef()
  const exterior = useRef()

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime()
    balanceo.current.rotation.z = Math.sin(t * 1.2 + fase) * 0.08
    balanceo.current.rotation.x = Math.cos(t * 0.9 + fase) * 0.05
    const tamano = MathUtils.damp(exterior.current.scale.x, visible ? escala : 0, 5, delta)
exterior.current.scale.setScalar(tamano)
exterior.current.visible = tamano > 0.01
  })

  return (
    <group ref={exterior} position={[x, 0, z]} scale={escala}>
      <group ref={balanceo}>
        <group position={[0, 2, 0]}>
          <Flower color={color} segmentos={12} />
        </group>
      </group>
    </group>
  )
}

function JardinFlores({ flores, oscuro, mes, onElegirMes }) {
  const plantas = useMemo(
    () =>
      Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * (ANCHO - 2),
        z: (Math.random() - 0.5) * (FONDO - 2),
        escala: 0.5 + Math.random() * 0.4,
        fase: Math.random() * Math.PI * 2,
        indice: Math.floor(Math.random() * flores.length),
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
      <SelectorMes mes={mes} onElegirMes={onElegirMes} />
      <div className="h-[32rem] overflow-hidden rounded-3xl border border-stone-200 bg-salvia-100 dark:border-white/10 dark:bg-stone-900">
        <Canvas>
          <Camara />
          <ambientLight intensity={oscuro ? 0.35 : 0.9} color={oscuro ? '#9fb4ff' : '#ffffff'} />
<directionalLight position={[4, 8, 3]} intensity={oscuro ? 0.9 : 2} color={oscuro ? '#b8c6ff' : '#ffffff'} />

          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[ANCHO, 0.4, FONDO]} />
            <meshStandardMaterial color="#869b75" />
          </mesh>

          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[ANCHO, 1.2, FONDO]} />
            <meshStandardMaterial color="#7b5232" />
          </mesh>

          {plantas.map((planta) => {
  const flor = flores[planta.indice]
  return (
    <FlorDelJardin
      key={planta.id}
      {...planta}
      color={flor.color}
      visible={mes === null || flor.meses.includes(mes)}
    />
  )
})}
        </Canvas>
        
      </div>
      <p className="mt-3 text-xs text-stone-400">
  {mes === null
    ? 'Un jardín a escala con las flores de la enciclopedia.'
    : `Flores que florecen en ${mesesLargos[mes - 1]}.`}
</p>
    </motion.section>
  )
}

export default JardinFlores