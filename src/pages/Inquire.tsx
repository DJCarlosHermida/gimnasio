import { useMemo, useState, type FormEvent } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { OpenBadge } from "../components/OpenBadge"
import { WhatsAppIcon } from "../components/WhatsAppIcon"
import { BRAND, PLANS } from "../data/catalog"
import { useShopStatus } from "../lib/useShopStatus"
import { buildWhatsAppMessage, whatsappUrl } from "../lib/whatsapp"
import type { InquiryForm } from "../types"

const FORM_KEY = "gimnasio-consulta"

const EMPTY_FORM: InquiryForm = {
  name: "",
  phone: "",
  planId: "",
  trial: true,
  notes: "",
}

function readForm(planId: string): InquiryForm {
  try {
    const raw = localStorage.getItem(FORM_KEY)
    const parsed = raw ? { ...EMPTY_FORM, ...(JSON.parse(raw) as Partial<InquiryForm>) } : EMPTY_FORM
    parsed.trial = Boolean(parsed.trial)
    if (planId) parsed.planId = planId
    return parsed
  } catch {
    return { ...EMPTY_FORM, planId }
  }
}

export function Inquire() {
  const status = useShopStatus()
  const [params] = useSearchParams()
  const planFromUrl = params.get("plan") ?? ""
  const [form, setForm] = useState<InquiryForm>(() =>
    typeof window === "undefined" ? EMPTY_FORM : readForm(planFromUrl),
  )
  const [error, setError] = useState<string | null>(null)

  const preview = useMemo(
    () => (form.name.trim() ? buildWhatsAppMessage(form, !status.open) : ""),
    [form, status.open],
  )

  function update<K extends keyof InquiryForm>(key: K, value: InquiryForm[K]) {
    setForm((current) => {
      const next = { ...current, [key]: value }
      localStorage.setItem(FORM_KEY, JSON.stringify(next))
      return next
    })
  }

  function validate(): string | null {
    if (!form.name.trim() || form.name.trim().length < 2) return "Ingresá tu nombre."
    if (form.phone.replace(/\D/g, "").length < 8) return "Ingresá un teléfono válido."
    if (!form.planId) return "Elegí un plan."
    return null
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const message = validate()
    if (message) {
      setError(message)
      return
    }
    setError(null)
    window.open(whatsappUrl(buildWhatsAppMessage(form, !status.open)), "_blank", "noopener,noreferrer")
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-sm tracking-[0.3em] text-red">INSCRIPCIÓN</p>
            <h1 className="mt-1 font-display text-4xl uppercase text-cream">Consultar</h1>
            <p className="mt-2 text-sm text-muted">Pedí información de un plan o una clase de prueba.</p>
          </div>
          <OpenBadge />
        </div>
        {!status.open && (
          <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            El gimnasio está cerrado ahora ({BRAND.hoursLabel}). Podés enviar igual; va con aviso de fuera de horario.
          </p>
        )}
        <div className="mt-8 rounded-2xl border border-white/10 bg-card p-6">
          <p className="font-display text-lg uppercase text-cream">¿Todavía no sabés el plan?</p>
          <p className="mt-2 text-sm text-muted">
            Mirá el listado en{" "}
            <Link to="/planes" className="text-red hover:text-cream">
              Planes
            </Link>{" "}
            y volvé con uno elegido.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-card p-5 sm:p-6">
        <h2 className="font-display text-2xl uppercase text-cream">Tus datos</h2>
        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className="input" autoComplete="name" placeholder="Nombre" aria-label="Nombre" required />
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" inputMode="tel" autoComplete="tel" placeholder="Teléfono" aria-label="Teléfono" required />
          <select value={form.planId} onChange={(e) => update("planId", e.target.value)} className="input" aria-label="Plan" required>
            <option value="">Elegí un plan</option>
            {PLANS.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-3 text-sm text-cream-2">
            <input
              type="checkbox"
              checked={form.trial}
              onChange={(e) => update("trial", e.target.checked)}
              className="h-4 w-4 accent-[#c8f542]"
            />
            Quiero una clase de prueba
          </label>
          <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} className="input min-h-24" placeholder="Horario preferido u otra información" aria-label="Información adicional" />
          {error && <p className="text-sm text-red">{error}</p>}
          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-display uppercase tracking-wider text-white hover:brightness-110">
            <WhatsAppIcon />
            Enviar por WhatsApp
          </button>
        </form>
        {preview && (
          <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl bg-ink p-4 text-xs text-cream-2">{preview}</pre>
        )}
      </section>
    </div>
  )
}
