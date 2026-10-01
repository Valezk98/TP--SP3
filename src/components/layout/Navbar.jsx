
import { useCarritoContext } from "../../context/CarritoContext"
import { useThemeContext } from "../../context/ThemeContext"

export default function Navbar({ onOpenList }) {
  const { carrito } = useCarritoContext()
  const { tema, toggleTema } = useThemeContext()
  const count = carrito.length

  return (
    <header style={{ backgroundColor: "var(--bg-primary)", borderBottomColor: "var(--bg-tertiary)" }} className="border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ambar-400">AniWatch</h1>
        <div className="flex items-center gap-3">
          
          <button onClick={toggleTema} className="text-2xl px-2 py-1 rounded-lg hover:opacity-80">
            {tema === "oscuro" ? "☀️" : "🌙"}
          </button>

          {count > 0 && (
            <span className="bg-ambar-500 text-bg-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"> {count} </span>
          )}

          <button onClick={onOpenList} className="bg-ambar-500 hover:bg-ambar-400 text-bg-900 font-semibold px-4 py-2 rounded-lg"> Carrito </button>
        </div>
      </div>
    </header>
  )
}
