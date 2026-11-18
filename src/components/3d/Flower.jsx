function Flower({ color, segmentos = 32 }) {
  const petalos = 8

  return (
    <group>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 12]} />
        <meshStandardMaterial color="#3f7d3a" />
      </mesh>

      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.25, segmentos, segmentos]} />
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
            <sphereGeometry args={[0.4, segmentos, segmentos]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
      })}
    </group>
  )
}

export default Flower