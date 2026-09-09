
// Modal superpuesto de la watchlist. Solo se monta cuando App pone 'open' en true. tiene botón de cerrar (onClose) y por cada item un botón "Quitar" (onRemove).
export default function ListPanel({ myList, onRemove, onClose }) {

  const handleVaciarLista = () => {

    const borrarDeUna = confirm("Estás seguro de borrar tu lista?")

    if (borrarDeUna) {
      myList.forEach((item) => onRemove(item))
    }
  }

  return (

    
 
    <div className="fixed inset-0 bg-bg-900/80 flex items-center justify-center z-20">


      <div className="bg-bg-800 rounded-xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">

    
        <div className="flex items-center justify-between px-6 py-4 border-b border-bg-600">
          <h2 className="text-xl font-bold text-ambar-400">Mi lista</h2>


          <button onClick={onClose} className="text-texto-400 hover:text-texto-100 text-2xl leading-none" aria-label="cerrar lista">
            x
          </button>
        </div>


        
        <div className="overflow-y-auto px-6 py-4">

          {myList.length === 0 ? (
            <p className="text-texto-400 text-center py-8">
              Todavía no agregaste nada, buscá algo arriba 👆
            </p>
          ) : (
            <ul className="space-y-3">
              {myList.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 bg-bg-700 rounded-lg p-3"
                >
                  <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-texto-100">{item.nombre} </h3>
                    <p className="text-texto-500 text-sm">{item.genero} · {item.año}</p>
                  </div>

                  <button onClick={() => onRemove(item)} className="bg-bg-600 hover:bg-ambar-600 text-ambar-300 px-3 py-1 rounded font-semibold"
                  > Quitar </button>
                  
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleVaciarLista} className="bg-bg-600 hover:bg-ambar-600 text-ambar-300 mt-5 px-3 py-1 rounded font-semibold"
          > Vaciar lista </button>
        </div>
      </div>
    </div>
  )
}
