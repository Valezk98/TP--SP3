import ItemCard from "./ItemCard"

// Acá está la lista de los resultados de la busqueda
export default function ItemList({ items, onToggle, isInList }) {
  // Si no hay resultados
  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-texto-400 text-lg">No encontramos nada relacionado</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item)=>{
          return <ItemCard key={item.id} item={item} onToggle={onToggle} isInList={isInList}/>
        })}
      </div>
    </div>
  )
}
