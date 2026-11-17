import { motion } from 'framer-motion'

const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function CalendarioFloracion({ flores }) {
  const mesActual = new Date().getMonth() + 1
  const enFlor = flores.filter((flor) => flor.meses.includes(mesActual))

  return (
    <motion.section
    id="calendario"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
       className="mx-auto mt-24 max-w-[2000px] scroll-mt-24"
    >
      <h2 className="text-3xl font-light tracking-tight text-salvia-900 dark:text-salvia-100">
        Calendario de floración
      </h2>
      <p className="mt-2 text-salvia-700 dark:text-salvia-300">
        Este mes florecen: {enFlor.map((flor) => flor.nombre).join(', ') || 'ninguna de la lista'}.
      </p>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-stone-200 bg-white p-6 dark:border-white/10 dark:bg-stone-900">
        <div className="grid min-w-[44rem] grid-cols-[8rem_repeat(12,minmax(0,1fr))] items-center gap-1.5">
          <div />
          {meses.map((mes, i) => (
            <div
              key={mes}
              className={`text-center text-xs uppercase tracking-widest ${
                i + 1 === mesActual
                  ? 'font-semibold text-salvia-700 dark:text-salvia-300'
                  : 'text-stone-400'
              }`}
            >
              {mes}
            </div>
          ))}

          {flores.map((flor) => (
            <div key={flor.id} className="contents">
              <p className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200">
  <span
    className="h-3 w-3 shrink-0 rounded-full border border-black/10 dark:border-white/20"
    style={{ backgroundColor: flor.color }}
  />
  {flor.nombre}
</p>
              {meses.map((mes, i) => (
                <div
                  key={mes}
                  className={`h-8 rounded-md ${
                    flor.meses.includes(i + 1) ? 'bg-salvia-500' : 'bg-stone-100 dark:bg-white/5'
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-stone-400">Fechas aproximadas, según el hemisferio norte.</p>
    </motion.section>
  )
}

export default CalendarioFloracion