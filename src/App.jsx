import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FlowerCard from './components/FlowerCard'
import FlowerModal from './components/FlowerModal'
import CalendarioFloracion from './components/CalendarioFloracion'
import { API_URL } from './api'

function App() {
  const [seleccionada, setSeleccionada] = useState(null)
  const [oscuro, setOscuro] = useState(false)
  const [flores, setFlores] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [likes, setLikes] = useState({})

  useEffect(() => {
    document.documentElement.classList.toggle('dark', oscuro)
  }, [oscuro])

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

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 transition-colors dark:bg-stone-950 dark:text-stone-100">
      <Navbar oscuro={oscuro} onCambiarTema={() => setOscuro(!oscuro)} />

      <div className="px-6 pt-16 pb-24 lg:px-10">
        <motion.header
          id="inicio"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-[2000px] scroll-mt-24"
        >
          <h1 className="text-5xl font-light tracking-tight text-salvia-900 dark:text-salvia-100">
            Enciclopedia de Flores
          </h1>
          <p className="mt-3 text-salvia-700 dark:text-salvia-300">Explora, gira y descubre.</p>
        </motion.header>

        {estado === 'cargando' && (
          <p className="mx-auto mt-14 max-w-[2000px] text-stone-500 dark:text-stone-400">Cargando flores…</p>
        )}
        {estado === 'error' && (
          <p className="mx-auto mt-14 max-w-[2000px] text-red-600 dark:text-red-400">
            No se pudo conectar con el servidor. Revisa que esté encendido.
          </p>
        )}

        <main
          id="flores"
          className="mx-auto mt-14 grid max-w-[2000px] scroll-mt-24 gap-6 sm:grid-cols-2 lg:auto-rows-[24rem] lg:grid-cols-3 xl:grid-cols-5"
        >
          {flores.map((flor, i) => (
            <FlowerCard
              key={flor.id}
              flor={flor}
              indice={i}
              tamano={flor.tamano}
              likes={likes[flor.id] || 0}
              onSelect={() => setSeleccionada(flor)}
            />
          ))}
        </main>

        {estado === 'listo' && <CalendarioFloracion flores={flores} />}
      </div>

      <Footer />

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