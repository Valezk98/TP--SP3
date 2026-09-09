export default function SearchBar({ busqueda, enBusqueda }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <input
        type="text"
        value={busqueda}
        onChange={(event) => enBusqueda(event.target.value)}
        placeholder="Buscar un anime por nombre..."
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--bg-tertiary)", color: "var(--text-primary)" }}
        className="w-full border rounded-lg px-4 py-3 placeholder-texto-500 focus:outline-none focus:border-ambar-400"
      />
    </div>
  )
}
