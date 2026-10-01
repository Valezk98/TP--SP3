import useLocalStorage from "../../hooks/useLocalStorage"


export default function Footer() {

  const [luz, setLuz] = useLocalStorage("AniWatch:luz", false);

  const handleToggleLuz = () => {
    setLuz(!luz)
  }


  return (
    <footer style={{ backgroundColor: "var(--bg-primary)", borderTopColor: "var(--bg-tertiary)" }} className="border-t mt-auto flex items-center mx-auto justify-center gap-10">
      <div className="">
        <h2 className="text-3xl mx-auto my-20 font-bold text-ambar-400">AniWatch</h2> 
      </div>
      <div className={`w-7 p-5 rounded-full cursor-pointer ${luz ? "animate-pulse bg-radial-[at_25%_25%] from-amber-200 to-amber-400 to-75% drop-shadow-2xl/100 drop-shadow-amber-300" : "bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"}`} onClick={handleToggleLuz} />
    </footer>
  )
}