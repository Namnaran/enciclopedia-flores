function Navbar({ oscuro, onCambiarTema }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-stone-200 bg-stone-100/80 backdrop-blur-md dark:border-white/10 dark:bg-stone-950/80">
      <div className="mx-auto flex max-w-[2000px] items-center justify-between px-6 py-4 lg:px-10">
        <a href="#inicio" className="text-lg font-light tracking-tight text-salvia-900 dark:text-salvia-100">
          ✿ Enciclopedia
        </a>

        <div className="flex items-center gap-6 text-sm">
          <a
            href="#flores"
            className="text-stone-600 transition hover:text-salvia-700 dark:text-stone-300 dark:hover:text-salvia-300"
          >
            Flores
          </a>
          <a
            href="#calendario"
            className="text-stone-600 transition hover:text-salvia-700 dark:text-stone-300 dark:hover:text-salvia-300"
          >
            Calendario
          </a>
          <button
            onClick={onCambiarTema}
            className="rounded-full border border-stone-300 px-4 py-2 transition hover:bg-salvia-100 dark:border-white/20 dark:hover:bg-white/10"
          >
            {oscuro ? '☀ Claro' : '☾ Oscuro'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar