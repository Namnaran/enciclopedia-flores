
import { motion, AnimatePresence } from 'framer-motion'
import FlowerCard from './components/FlowerCard'
import FlowerModal from './components/FlowerModal'
import { API_URL } from './api'
import { useState, useEffect } from 'react'
import CalendarioFloracion from './components/CalendarioFloracion'



function App() {
  const [seleccionada, setSeleccionada] = useState(null)
  const [oscuro, setOscuro] = useState(false)
const [flores, setFlores] = useState([])
const [estado, setEstado] = useState('cargando')
const [likes, setLikes] = useState({})

useEffect(() => {
  fetch(`${API_URL}/api/flores`)
    .then((res) => res.json())
    .then((datos) => {
      setFlores(datos)
      setEstado('listo')
    })
    .catch(() => setEstado('error'))
}, [])
useEffect(() => {
  fetch(`${API_URL}/api/likes`)
    .then((res) => res.json())
    .then((datos) => setLikes(datos))
    .catch(() => {})
}, [])

const darLike = (id) => {
  fetch(`${API_URL}/api/flores/${id}/like`, { method: 'POST' })
    .then((res) => res.json())
    .then((datos) =>
      setLikes((anteriores) => ({ ...anteriores, [datos.id]: datos.likes }))
    )
    .catch(() => {})
}
useEffect(() => {
  document.documentElement.classList.toggle('dark', oscuro)
}, [oscuro])

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-20 text-stone-800 transition-colors lg:px-10 dark:bg-stone-950 dark:text-stone-100">
      <motion.header
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  className="mx-auto flex max-w-[2000px] items-start justify-between gap-4"
>
  <div>
    <h1 className="text-5xl font-light tracking-tight text-salvia-900 dark:text-salvia-100">
      Enciclopedia de Flores
    </h1>
    <p className="mt-3 text-salvia-700 dark:text-salvia-300">Explora, gira y descubre.</p>
  </div>
  <button
    onClick={() => setOscuro(!oscuro)}
    className="rounded-full border border-stone-300 px-4 py-2 text-sm transition hover:bg-salvia-100 dark:border-white/20 dark:hover:bg-white/10"
  >
    {oscuro ? '☀ Claro' : '☾ Oscuro'}
  </button>
</motion.header>
{estado === 'cargando' && (
  <p className="mx-auto mt-14 max-w-[2000px] text-stone-500 dark:text-stone-400">Cargando flores…</p>
)}
{estado === 'error' && (
  <p className="mx-auto mt-14 max-w-[2000px] text-red-600 dark:text-red-400">
    No se pudo conectar con el servidor. Revisa que esté encendido.
  </p>
)}
      <main className="mx-auto mt-14 grid max-w-[2000px] gap-6 sm:grid-cols-2 lg:auto-rows-[24rem] lg:grid-cols-3 xl:grid-cols-5">
        {flores.map((flor, i) => (
          <FlowerCard
            tamano={flor.tamano}
            key={flor.id}
            flor={flor}
            indice={i}
            onSelect={() => setSeleccionada(flor)}
            likes={likes[flor.id] || 0}
          />
        ))}
      </main>
      {estado === 'listo' && <CalendarioFloracion flores={flores} />}
      <AnimatePresence>
        {seleccionada && (
          <FlowerModal
  flor={seleccionada}
  likes={likes[seleccionada.id] || 0}
  onLike={() => darLike(seleccionada.id)}
  onClose={() => setSeleccionada(null)}
/>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App