import { catalogo } from "../data/items"
import useLocalStorage from "../hooks/useLocalStorage"

export default function ItemCard({ item, onToggle, isInList }) {
  const anime = catalogo.find((anime) => anime.id === item.id) || item

  const [destacado, setDestacado] = useLocalStorage(`anime ${anime.id} destacado?`, anime.destacado === false)

  const handleDestacadoClick = () =>{
    setDestacado( !destacado )
  }

  return (

    <div className="bg-bg-800 rounded-lg shadow-md overflow-hidden flex flex-col">
      <img src={anime.imagen} alt={anime.nombre} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between">

          <h2 className="text-xl font-semibold text-texto-100">{anime.nombre}</h2>

          <img className="w-[10%] hover:scale-115 " src={!destacado ? "/noFav.png" : "/fav.png"} onClick={handleDestacadoClick}/>


        </div>
        <p className="text-texto-400 mt-2 text-sm">{anime.descripcion}</p>
        <p className="text-texto-500 mt-2 text-sm">Género: {anime.genero}</p>
        <p className="text-texto-500 mb-auto mt-1 text-sm">Año: {anime.año}</p>
        
        <button onClick={() => onToggle(anime)}

          className={ isInList(anime.id) ? "mt-4 bg-bg-600 text-ambar-300 font-semibold py-2 rounded-lg" : "mt-4 bg-ambar-500 hover:bg-ambar-400 text-bg-900 font-semibold py-2 rounded-lg"
          }
        >
          {isInList(anime.id) ? "✓ En mi lista" : "+ Agregar"}
        </button>
      </div>
    </div>
  )
}
