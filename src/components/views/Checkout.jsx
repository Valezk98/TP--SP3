import { useState } from "react"
import { useCarritoContext } from "../../context/CarritoContext"
import { useForm } from "react-hook-form"
import Buttons from "../UI/Buttons"
import { formatearPrecio } from "../../utils/formato"

export default function Checkout({ item, onConfirmado, onClose }) {
  const [cantidad, setCantidad] = useState(1)
  const { agregar, isInCart } = useCarritoContext()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { metodoEnvio: "retiro" },
  })

  const metodoEnvio = watch("metodoEnvio")

  const stock = item.stock ?? 1
  const yaAgregado = isInCart(item.id)

  const inputStyle = {
    backgroundColor: "var(--bg-secondary)",
    borderColor: "var(--bg-tertiary)",
    color: "var(--text-primary)",
  }

  const inputClass = "w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-ambar-400"

  const a11y = (campo) => ({
    id: campo,
    "aria-invalid": !!errors[campo],
    "aria-describedby": errors[campo] ? `error-${campo}` : undefined,
  })

  const onSubmit = (datos) => {

    const datosCompra = { ...datos, direccion: datos.metodoEnvio === "domicilio" ? datos.direccion : null,}

    if (!yaAgregado) {
      agregar(item, cantidad)
      onConfirmado(datosCompra)
    }
    onClose()

    console.log("datos de la compra: ", datosCompra)
  }

  return (
    <section className="fixed inset-0 bg-bg-900/80 flex items-center justify-center z-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        style={{ backgroundColor: "var(--bg-primary)" }}
        className="rounded-xl w-full max-w-md mx-4 overflow-hidden"
      >
        <div style={{ borderBottomColor: "var(--bg-tertiary)" }} className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-ambar-400">Agregar al carrito</h2>
          <button type="button" onClick={onClose} style={{ color: "var(--text-secondary)" }} className="hover:text-texto-100 text-2xl leading-none" aria-label="cerrar modal">
            x
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          <img src={item.imagen} alt={item.nombre} className="w-full h-56 object-cover rounded-lg" />

          <div className="flex items-center justify-between">
            <div>
              <h3 style={{ color: "var(--text-primary)" }} className="text-lg font-semibold">{item.nombre}</h3>
              <p style={{ color: "var(--text-muted)" }} className="text-sm">{item.genero} · {item.año}</p>
            </div>
            <p className="text-2xl font-bold text-ambar-400">{formatearPrecio(item.precio)}</p>
          </div>

          <div className="flex items-center gap-3">
            <span style={{ color: "var(--text-secondary)" }} className="text-sm">
              Cantidad:
            </span>
            <Buttons cantidad={cantidad} max={stock} onChange={setCantidad} />
            <span style={{ color: "var(--text-muted)" }} className="text-sm">Stock: {stock}</span>
            <p className="ml-auto font-semibold" style={{ color: "var(--text-primary)" }}>
              Total: <span className="text-ambar-400">{formatearPrecio(item.precio * cantidad)}</span>
            </p>
          </div>

          <div>
            <label htmlFor="nombre" className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Nombre</label>
            <input
              {...a11y("nombre")}
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "Al menos 3 caracteres" },
              })}
              className={inputClass}
              style={inputStyle}
              type="text"
              placeholder="Tu nombre"
            />
            {errors.nombre?.message && (
              <p id="error-nombre" role="alert" className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Email</label>
            <input
              {...a11y("email")}
              {...register("email", {
                required: "El email es obligatorio",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Ingresá un email válido" },
              })}
              className={inputClass}
              style={inputStyle}
              type="email"
              placeholder="tucorreo@ejemplo.com"
            />
            {errors.email?.message && (
              <p id="error-email" role="alert" className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="telefono" className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Teléfono</label>
            <input
              {...a11y("telefono")}
              {...register("telefono", {
                required: "El teléfono es obligatorio",
                pattern: { value: /^\d+$/, message: "Solo números" },
                minLength: { value: 8, message: "Mínimo 8 dígitos" },
              })}
              className={inputClass}
              style={inputStyle}
              type="tel"
              inputMode="numeric"
              placeholder="Solo números"
            />
            {errors.telefono?.message && (
              <p id="error-telefono" role="alert" className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
            )}
          </div>

          <div>
            <span id="metodoEnvio-label" className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Método de envío</span>
            <div className="flex gap-4 mt-1" role="radiogroup" aria-labelledby="metodoEnvio-label">
              <label className="flex items-center gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                <input
                  type="radio"
                  value="retiro"
                  aria-invalid={!!errors.metodoEnvio}
                  aria-describedby={errors.metodoEnvio ? "error-metodoEnvio" : undefined}
                  {...register("metodoEnvio", { required: "Elegí un método de envío" })}
                /> Retiro en local
              </label>
              <label className="flex items-center gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                <input
                  type="radio"
                  value="domicilio"
                  aria-invalid={!!errors.metodoEnvio}
                  aria-describedby={errors.metodoEnvio ? "error-metodoEnvio" : undefined}
                  {...register("metodoEnvio", { required: "Elegí un método de envío" })}
                /> A domicilio
              </label>
            </div>
            {errors.metodoEnvio?.message && (
              <p id="error-metodoEnvio" role="alert" className="text-red-500 text-sm mt-1">{errors.metodoEnvio.message}</p>
            )}
          </div>

          {metodoEnvio === "domicilio" && (
            <div>
              <label htmlFor="direccion" className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Dirección</label>
              <input
                {...a11y("direccion")}
                {...register("direccion", {
                  validate: (valor) =>
                Boolean(valor?.trim()) || "La dirección es obligatoria para envío a domicilio",
                })}
                className={inputClass}
                style={inputStyle}
                type="text"
                placeholder="Calle y número"
              />
              {errors.direccion?.message && (
                <p id="error-direccion" role="alert" className="text-red-500 text-sm mt-1">{errors.direccion.message}</p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="notas" className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Notas</label>
            <textarea
              {...a11y("notas")}
              {...register("notas", {
                maxLength: { value: 200, message: "Máximo 200 caracteres" },
              })}
              className={inputClass}
              style={inputStyle}
              rows={3}
              placeholder="Algún detalle (opcional)"
            />
            {errors.notas?.message && (
              <p id="error-notas" role="alert" className="text-red-500 text-sm mt-1">{errors.notas.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="terminos" className="flex items-center gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
              <input {...a11y("terminos")} {...register("terminos", { required: "Debés aceptar los términos" })} type="checkbox" /> Acepto los términos y condiciones
            </label>
            {errors.terminos?.message && (
              <p id="error-terminos" role="alert" className="text-red-500 text-sm mt-1">{errors.terminos.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={yaAgregado}
            className={yaAgregado
              ? "w-full bg-bg-600 text-ambar-300 font-semibold py-2 rounded-lg cursor-not-allowed"
              : "w-full bg-ambar-500 hover:bg-ambar-400 text-bg-900 font-semibold py-2 rounded-lg"}
          >
            {yaAgregado ? "✓ Ya está en tu carrito" : "Agregar al carrito"}
          </button>
        </div>
      </form>
    </section>
  )
}