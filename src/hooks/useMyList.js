import useLocalStorage from "./useLocalStorage"

export default function useMyList() {

  const [myList, setMyList] = useLocalStorage("AniWatch:myList", [])


  const toggle = (animeAgregado) => {
    setMyList((animesGuardados) =>
      animesGuardados.some((animeEnLista) => animeEnLista.id === animeAgregado.id)
        ? animesGuardados.filter(
            (animeEnLista) => animeEnLista.id !== animeAgregado.id
          )
        : [...animesGuardados, animeAgregado]
    )
  }

  const isInList = (id) => myList.some((animeEnLista) => animeEnLista.id === id)

  return { myList, toggle, isInList }
}
