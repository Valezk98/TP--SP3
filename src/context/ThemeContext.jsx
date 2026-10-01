import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'


const ThemeContext = createContext(null)

export function ThemeProvider({children}){

    const [tema, setTema] = useLocalStorage("AniWatch:tema", matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro")

    useEffect(()=>{
        document.documentElement.classList.toggle("dark", tema === "oscuro")
    }, [tema])

    const toggleTema = () => {
        setTema( tema === "oscuro" ? "claro" : "oscuro")
    }

    return <ThemeContext.Provider value={{ tema, toggleTema}}>{children}</ThemeContext.Provider>
}

export function useThemeContext(){
    const theme = useContext(ThemeContext)

    if(theme === null){
        throw new Error("ThemeContext solo debe usarse dentro de ThemeProvider")
    }

    return theme
}