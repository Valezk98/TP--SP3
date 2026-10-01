import { catalogo } from "../data/items"
import { useCarritoContext } from "../context/CarritoContext"
import { useCheckoutContext } from "../context/CheckoutContext"
import { formatearPrecio } from "../utils/formato"

export default function ProductCard({ item }) {
  const anime = catalogo.find((anime) => anime.id === item.id) || item
  const { isInCart } = useCarritoContext()
  const { setCheckoutItem } = useCheckoutContext()

  return (

    <div style={{ backgroundColor: "var(--bg-primary)" }} className="rounded-lg shadow-md overflow-hidden flex flex-col">
      <img src={anime.imagen} alt={anime.nombre} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between">

          <h2 style={{ color: "var(--text-primary)" }} className="text-xl font-semibold">{anime.nombre}</h2>
          <p className="text-ambar-500 text-xl font-bold"> {formatearPrecio(anime.precio)}</p>

        </div>
        <p style={{ color: "var(--text-secondary)" }} className="mt-2 text-sm">{anime.descripcion}</p>
        <p style={{ color: "var(--text-muted)" }} className="mt-2 text-sm">Género: {anime.genero}</p>
        <p style={{ color: "var(--text-muted)" }} className="mb-auto mt-1 text-sm">Año: {anime.año}</p>
        
        <button onClick={() => setCheckoutItem(anime)}

          className={ isInCart(anime.id) ? "mt-4 bg-bg-600 text-ambar-300 font-semibold py-2 rounded-lg" : "mt-4 bg-ambar-500 hover:bg-ambar-400 text-bg-900 font-semibold py-2 rounded-lg"
          }
        >
          {isInCart(anime.id) ? "✓ Agregado" : "+ Agregar al carrito"}
        </button>
      </div>
    </div>
  )
}
