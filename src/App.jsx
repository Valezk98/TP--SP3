import { useEffect, useState } from "react"
import { catalogo } from "./data/items"
import useMyList from "./hooks/useMyList"
import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import ItemList from "./components/ItemList"
import ListPanel from "./components/ListPanel"
import Footer from "./components/Footer"

export default function App() {

  const [busqueda, setBusqueda] = useState("") // el buscador, empieza vacio

  const [open, setOpen] = useState(false) // state de apertura del modal

  const { myList, toggle, isInList } = useMyList() // estado de la watchlist


  useEffect(() => {
    const titulo = myList.length === 0 ?'AniWatch' : `AniWatch - (${myList.length})`;

    document.title = titulo
  })


  // El filtro del catalogo según lo que haya en el input buscador
  const filtrados = catalogo.filter((item) => {
    return item.nombre.includes(busqueda)
  })
  
  return (

    <div className="min-h-screen bg-bg-900 text-texto-100">

      <Navbar count={myList.length} onOpenList={() => setOpen(true)} />

      <SearchBar busqueda={busqueda} enBusqueda={setBusqueda} />

      <ItemList items={filtrados} onToggle={toggle} isInList={isInList} />

      {open && (
        <ListPanel myList={myList} onRemove={toggle} onClose={() => setOpen(false)} />
      )}

      <Footer />
    </div>
  )
}
