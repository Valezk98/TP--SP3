import { useEffect, useState } from "react"

// Carrito de la tienda: guarda items con cantidad, respetando el stock de cada uno
export default function useCarrito() {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("AniWatch:carrito")
      return guardado ? JSON.parse(guardado) : []
    } catch {
      return []
    }
  })

  // Cada vez que cambia el carrito, se persiste en localStorage.
  useEffect(() => {
    localStorage.setItem("AniWatch:carrito", JSON.stringify(carrito))
  }, [carrito])

  // Sincroniza con otras pestañas: cuando otra pestaña escribe en la misma clave,
  // este listener actualiza el estado. No se dispara en la pestaña que hizo el cambio.
  useEffect(() => {
    const sincronizar = (event) => {
      if (event.key === "AniWatch:carrito" && event.newValue) {
        try {
          setCarrito(JSON.parse(event.newValue))
        } catch (err) {
          console.warn("Error parseando sincronización del carrito:", err)
        }
      }
    }

    window.addEventListener("storage", sincronizar)
    return () => window.removeEventListener("storage", sincronizar)
  }, [])

  const agregar = (item, cantidad = 1) => {
    setCarrito((prev) => {
      const existente = prev.find((anime) => anime.id === item.id)

      // Si ya está, suma sin pasar el stock
      if (existente) {
        return prev.map((anime) =>
          anime.id === item.id
            ? { ...anime, cantidad: Math.min(existente.cantidad + cantidad, anime.stock) }
            : anime
        )
      }

      return [...prev, { ...item, cantidad: Math.min(cantidad, item.stock ?? 1) }]
    })
  }

  const quitar = (id) => setCarrito((prev) => prev.filter((anime) => anime.id !== id))

  const cambiarCantidad = (id, cantidad) =>
    setCarrito((prev) =>
      prev.map((anime) =>
        anime.id === id
          ? { ...anime, cantidad: Math.max(1, Math.min(cantidad, anime.stock ?? 1)) }
          : anime
      )
    )

  const vaciar = () => setCarrito([])

  const isInCart = (id) => carrito.some((anime) => anime.id === id)

  const total = carrito.reduce((acc, item) => {
    return acc + item.precio * item.cantidad
  }, 0)

  return { carrito, agregar, quitar, cambiarCantidad, vaciar, isInCart, total }
}