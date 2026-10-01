import { createContext, useContext } from "react"
import { catalogo } from "../data/items"
import useLocalStorage from "../hooks/useLocalStorage"

const CheckoutContext = createContext(null)

export function CheckoutProvider({ children }) {

  const [checkoutId, setCheckoutId] = useLocalStorage("AniWatch:checkout", null)

  const checkoutItem = catalogo.find((anime) => anime.id === checkoutId) ?? null

  const setCheckoutItem = (item) => setCheckoutId(item ? item.id : null)

  return (
    <CheckoutContext.Provider value={{ checkoutItem, setCheckoutItem }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckoutContext() {
  const contexto = useContext(CheckoutContext)
  if (!contexto) throw new Error("useCheckoutContext debe usarse dentro de CheckoutProvider")
  return contexto
}