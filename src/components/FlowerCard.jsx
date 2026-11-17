import { motion } from 'framer-motion'
import FlowerViewer from './3d/FlowerViewer'
import { useState } from 'react'


function FlowerCard({ flor, indice, onSelect, tamano = '', likes = 0 }) {
    const [encima, setEncima] = useState(false)
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      layoutId={`card-${flor.id}`}
      onClick={onSelect}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: (indice % 3) * 0.12, ease: 'easeOut' }}
      onMouseEnter={() => setEncima(true)}
      onMouseLeave={() => setEncima(false)}
      whileHover={{ y: -6, transition: { duration: 0.25, delay: 0 } }}
      className={`cursor-pointer group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition-colors hover:border-salvia-500 dark:border-white/10 dark:bg-stone-900 dark:shadow-none dark:hover:border-white/30 ${tamano}`}
    >
      <div
  className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-10 dark:group-hover:opacity-15"
  style={{ backgroundColor: flor.color }}
/>
      <div
        className="absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition group-hover:opacity-70"
        style={{ backgroundColor: flor.color }}
      />
      <span className="absolute top-4 right-4 z-10 rounded-full bg-white/80 px-3 py-1 text-xs text-stone-600 backdrop-blur dark:bg-black/40 dark:text-stone-200">
  ♥ {likes}
</span>
      <div className="relative flex flex-1 flex-col">
        <div className="relative -mx-6 -mt-2 min-h-36 flex-1">
  <div className="absolute inset-0">
    <FlowerViewer color={flor.color} acelerar={encima} />
  </div>
</div>
        <p className="text-xs uppercase tracking-widest text-salvia-700 dark:text-stone-400">{flor.familia}</p>
        <h2 className="mt-2 text-3xl font-light">{flor.nombre}</h2>
        <p className="text-sm italic text-stone-500 dark:text-stone-400">{flor.cientifico}</p>
        <p className="mt-6 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{flor.descripcion}</p>
      </div>
    </motion.article>
  )
}

export default FlowerCard