import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { OpenBadge } from "../components/OpenBadge"
import { PLANS } from "../data/catalog"

export function Plans() {
  const location = useLocation()

  useEffect(() => {
    const id = location.hash.replace("#", "")
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [location.hash])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-sm tracking-[0.3em] text-red">PLANES</p>
          <h1 className="mt-1 font-display text-4xl uppercase text-cream">Planes y actividades</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Precios y cupos se confirman por WhatsApp. Podés pedir una clase de prueba.
          </p>
        </div>
        <OpenBadge />
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {PLANS.map((plan) => (
          <article
            key={plan.id}
            id={plan.id}
            className={`scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-lg ${
              plan.featured ? "border-red ring-1 ring-red/40" : "border-white/10"
            }`}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={plan.image} alt={plan.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-black/10" />
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl uppercase leading-tight text-cream">{plan.name}</h2>
                  <p className="mt-1 text-sm text-muted">{plan.description}</p>
                </div>
                <p className="shrink-0 font-display text-sm uppercase tracking-wider text-red">{plan.priceLabel}</p>
              </div>
              <p className="text-xs leading-5 text-cream-2">{plan.highlights.join(" · ")}</p>
              <Link
                to={`/consultar?plan=${plan.id}`}
                className="inline-flex w-full items-center justify-center rounded-xl bg-red px-4 py-2.5 font-display text-sm uppercase tracking-wider text-ink hover:bg-red-2"
              >
                Consultar / clase de prueba
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
