export default function Buttons({ cantidad, max, onChange }) {
  const disminuir = () => onChange(Math.max(1, cantidad - 1))
  const aumentar = () => onChange(Math.min(max, cantidad + 1))

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={disminuir}
        disabled={cantidad <= 1}
        aria-label="Restar unidad"
        className="bg-bg-600 text-ambar-300 rounded-lg w-8 h-8 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
      >
        -
      </button>
      <span className="bg-bg-600 text-ambar-300 rounded-lg px-4 py-1 text-center font-semibold w-12">
        {cantidad}
      </span>
      <button
        type="button"
        onClick={aumentar}
        disabled={cantidad >= max}
        aria-label="Sumar unidad"
        className="bg-bg-600 text-ambar-300 rounded-lg w-8 h-8 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
      >
        +
      </button>

      
    </div>
  )
}