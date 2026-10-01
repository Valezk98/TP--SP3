import { useEffect, useState } from "react"
import { catalogo } from "./data/items"
import { useCarritoContext } from "./context/CarritoContext"
import { useCheckoutContext } from "./context/CheckoutContext"
import Navbar from "./components/layout/Navbar"
import SearchBar from "./components/SearchBar"
import ItemList from "./components/views/Tienda"
import Checkout from "./components/views/Checkout"
import Confirm from "./components/views/Confirmacion"
import ListPanel from "./components/UI/Carrito"
import Footer from "./components/layout/Footer"

export default function App() {

  const [busqueda, setBusqueda] = useState("") // el buscador, empieza vacio

  const [open, setOpen] = useState(false) // state de apertura del modal

  const [confirmado, setConfirmado] = useState(null) // datos del formulario de la compra confirmada

  const { carrito } = useCarritoContext() // estado del carrito

  const { checkoutItem, setCheckoutItem } = useCheckoutContext()

  useEffect(() => {
    const titulo = carrito.length === 0 ?'AniWatch' : `AniWatch - (${carrito.length})`;

    document.title = titulo
  })


  // El filtro del catalogo según lo que haya en el input buscador
  const filtrados = catalogo.filter((item) => {
    return item.nombre.includes(busqueda)
  })
  
  return (

    <div style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }} className="min-h-screen">

      <Navbar onOpenList={() => setOpen(true)} />

      <SearchBar busqueda={busqueda} enBusqueda={setBusqueda} />

      <ItemList items={filtrados} />

      {checkoutItem && (
        <Checkout item={checkoutItem} onConfirmado={setConfirmado} onClose={() => setCheckoutItem(null)} />
      )}

      {confirmado && (
        <Confirm datos={confirmado} onClose={() => setConfirmado(null)} />
      )}

      {open && (
        <ListPanel onClose={() => setOpen(false)} />
      )}

      <Footer />
    </div>
  )
}
