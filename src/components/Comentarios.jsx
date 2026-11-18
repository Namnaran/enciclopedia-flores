import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { API_URL } from '../api'

function Comentarios() {
  const [comentarios, setComentarios] = useState([])
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/api/comentarios`)
      .then((res) => res.json())
      .then((datos) => setComentarios(datos))
      .catch(() => setError('No se pudieron cargar los comentarios.'))
  }, [])

  const enviar = (e) => {
    e.preventDefault()
    setEnviando(true)
    setError('')

    fetch(`${API_URL}/api/comentarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, mensaje }),
    })
      .then(async (res) => {
        const datos = await res.json()
        if (!res.ok) {
          setError(datos.error)
          return
        }
        setComentarios((anteriores) => [datos, ...anteriores])
        setNombre('')
        setMensaje('')
      })
      .catch(() => setError('No se pudo conectar con el servidor.'))
      .finally(() => setEnviando(false))
  }

  const campo =
    'w-full rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-salvia-500 dark:border-white/20 dark:bg-stone-950'

  return (
    <motion.section
      id="comentarios"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto mt-24 max-w-[2000px] scroll-mt-24"
    >
      <h2 className="text-3xl font-light tracking-tight text-salvia-900 dark:text-salvia-100">Comentarios</h2>
      <p className="mt-2 text-salvia-700 dark:text-salvia-300">Deja un mensaje sobre la enciclopedia.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[24rem_1fr]">
        <form
          onSubmit={enviar}
          className="h-fit rounded-3xl border border-stone-200 bg-white p-6 dark:border-white/10 dark:bg-stone-900"
        >
          <label className="text-xs uppercase tracking-widest text-salvia-700 dark:text-stone-400">Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            maxLength={40}
            required
            className={`mt-1 ${campo}`}
          />

          <label className="mt-4 block text-xs uppercase tracking-widest text-salvia-700 dark:text-stone-400">
            Mensaje
          </label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            maxLength={300}
            required
            rows={4}
            className={`mt-1 resize-none ${campo}`}
          />
          <p className="mt-1 text-right text-xs text-stone-400">{mensaje.length}/300</p>

          {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="mt-4 rounded-full bg-salvia-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-salvia-900 disabled:opacity-50"
          >
            {enviando ? 'Enviando…' : 'Enviar comentario'}
          </button>
        </form>

        <ul className="max-h-[28rem] space-y-3 overflow-y-auto">
          {comentarios.length === 0 && (
            <li className="text-sm text-stone-500 dark:text-stone-400">Todavía no hay comentarios. ¡Sé el primero!</li>
          )}
          {comentarios.map((c) => (
            <li
              key={c.id}
              className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-white/10 dark:bg-stone-900"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-medium text-salvia-900 dark:text-salvia-100">{c.nombre}</p>
                <p className="shrink-0 text-xs text-stone-400">
                  {new Date(c.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <p className="mt-1 break-words text-sm text-stone-600 dark:text-stone-300">{c.mensaje}</p>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  )
}

export default Comentarios