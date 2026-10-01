// Modal superpuesto del carrito. Solo se monta cuando App pone 'open' en true.
import { useCarritoContext } from "../../context/CarritoContext"
import { formatearPrecio } from "../../utils/formato"
import Buttons from "./Buttons"

export default function ListPanel({ onClose }) {

  const { carrito, quitar, vaciar, cambiarCantidad, total } = useCarritoContext()

  const handleVaciarCarrito = () => {
    const borrarCarrito = confirm("Estás seguro de vaciar tu carrito?")
    if (borrarCarrito){ 
      vaciar() 
    }
  }

  return (

    <div className="fixed inset-0 bg-bg-900/80 flex items-center justify-center z-20">
      <div style={{ backgroundColor: "var(--bg-primary)" }} className="rounded-xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">    
        <div style={{ borderBottomColor: "var(--bg-tertiary)" }} className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-ambar-400">Carrito</h2>
          
          <button onClick={onClose} style={{ color: "var(--text-secondary)" }} className="hover:text-texto-100 text-2xl leading-none" aria-label="cerrar carrito">
            x
          </button>
        </div>


        
        <div className="overflow-y-auto px-6 py-4">

          {carrito.length === 0 ? (
            <p style={{ color: "var(--text-secondary)" }} className="text-center py-8">
              Tu carrito está vacío, buscá algo arriba 👆
            </p>
          ) : (
            <ul className="space-y-3">
              {carrito.map((item) => (
                <li
                  key={item.id}
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                  className="flex items-center gap-4 rounded-lg p-3"
                >
                  <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 style={{ color: "var(--text-primary)" }} className="font-semibold">{item.nombre} </h3>
                    <p style={{ color: "var(--text-muted)" }} className="text-sm">{item.genero} · {item.año}</p>
                    <Buttons cantidad={item.cantidad} max={item.stock ?? 1} onChange={(nueva) => cambiarCantidad(item.id, nueva)} />
                  </div>

                  <button onClick={() => quitar(item.id)} className="bg-bg-600 hover:bg-ambar-600 text-ambar-300 px-3 py-1 rounded font-semibold"
                  > Quitar </button>
                  
                </li>
              ))}
            </ul>
          )}

          <p className="text-right font-semibold" style={{color: "var(--text-primary)"}}>Total : <span className="text-ambar-400">{formatearPrecio(total)}</span></p>
          <button onClick={handleVaciarCarrito} className="bg-bg-600 hover:bg-ambar-600 text-ambar-300 mt-5 px-3 py-1 rounded font-semibold"
          > Vaciar carrito </button>
        </div>
      </div>
    </div>
  )
}