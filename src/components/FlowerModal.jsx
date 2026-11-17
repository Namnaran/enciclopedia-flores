import { useEffect } from 'react'
import { motion } from 'framer-motion'
import FlowerViewer from './3d/FlowerViewer'

function FlowerModal({ flor, onClose, likes, onLike }) {
  useEffect(() => {
    const alPresionar = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [onClose])

  const datos = [
    { titulo: 'Origen', valor: flor.origen },
    { titulo: 'Floración', valor: flor.floracion },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/30 backdrop-blur-md dark:bg-black/60"
      />

      <motion.article
        layoutId={`card-${flor.id}`}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-stone-200 bg-white dark:border-white/20 dark:bg-stone-900"
      >
        <div
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: flor.color }}
        />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-xl transition hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/20"
        >
          ✕
        </button>

        <div className="relative max-h-[90vh] overflow-y-auto p-8">
          <div className="-mx-8 -mt-2 h-80">
            <FlowerViewer color={flor.color} />
          </div>

          <p className="text-xs uppercase tracking-widest text-salvia-700 dark:text-stone-400">{flor.familia}</p>
          <h2 className="mt-2 text-5xl font-light">{flor.nombre}</h2>
          <p className="italic text-stone-500 dark:text-stone-400">{flor.cientifico}</p>
          <p className="mt-6 leading-relaxed text-stone-600 dark:text-stone-300">{flor.descripcion}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {datos.map((dato) => (
              <div
                key={dato.titulo}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-xs uppercase tracking-widest text-salvia-700 dark:text-stone-400">{dato.titulo}</p>
                <p className="mt-1 text-sm text-stone-700 dark:text-stone-200">{dato.valor}</p>
              </div>
            ))}
          </div>

          <div
            className="mt-4 rounded-2xl border p-4"
            style={{ borderColor: flor.color + '66' }}
          >
            <p className="text-xs uppercase tracking-widest text-salvia-700 dark:text-stone-400">Dato curioso</p>
            <p className="mt-1 text-sm text-stone-700 dark:text-stone-200">{flor.curiosidad}</p>
          </div>
          <button
  onClick={onLike}
  className="mt-6 inline-flex items-center gap-2 rounded-full bg-salvia-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-salvia-900 active:scale-95"
>
  ♥ Me gusta · {likes}
</button>
        </div>
      </motion.article>
    </div>
  )
}

export default FlowerModal