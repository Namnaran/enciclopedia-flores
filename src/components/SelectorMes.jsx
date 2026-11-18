import { meses } from '../meses'

function SelectorMes({ mes, onElegirMes }) {
  const base = 'rounded-full border px-4 py-1.5 text-sm transition'
  const activo = 'border-salvia-700 bg-salvia-700 text-white'
  const inactivo =
    'border-stone-300 text-stone-600 hover:bg-salvia-100 dark:border-white/20 dark:text-stone-300 dark:hover:bg-white/10'

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <button onClick={() => onElegirMes(null)} className={`${base} ${mes === null ? activo : inactivo}`}>
        Todos
      </button>
      {meses.map((nombre, i) => (
        <button
          key={nombre}
          onClick={() => onElegirMes(i + 1)}
          className={`${base} ${mes === i + 1 ? activo : inactivo}`}
        >
          {nombre}
        </button>
      ))}
    </div>
  )
}

export default SelectorMes