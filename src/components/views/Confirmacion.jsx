export default function Confirm({ datos, onClose }) {
    return (
        <div className="fixed inset-0 bg-bg-900/80 flex items-center justify-center z-20">
            <div style={{ backgroundColor: "var(--bg-primary)" }} className="rounded-xl w-full max-w-md mx-4 overflow-hidden">
                <div style={{ borderBottomColor: "var(--bg-tertiary)" }} className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-xl font-bold text-ambar-400">Compra realizada</h2>
                    <button type="button" onClick={onClose} style={{ color: "var(--text-secondary)" }} className="hover:text-texto-100 text-2xl leading-none" aria-label="cerrar confirmación">
                        x
                    </button>
                </div>
                <div className="p-6 flex flex-col gap-4">
                    <p style={{ color: "var(--text-primary)" }}>¡Gracias {datos.nombre}! Tu producto se agregó al carrito correctamente.</p>
                    <button onClick={onClose} className="w-full bg-ambar-500 hover:bg-ambar-400 text-bg-900 font-semibold py-2 rounded-lg">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}