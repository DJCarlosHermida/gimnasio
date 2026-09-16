import { CalendarCheck, Dumbbell, Timer } from "lucide-react"
import { Link } from "react-router-dom"
import { BRAND, FEATURES, getPlan } from "../data/catalog"
import { whatsappBlankUrl } from "../lib/whatsapp"
import { OpenBadge } from "./OpenBadge"
import { Specialties } from "./Specialties"

const FEATURE_ICONS = {
  planes: Dumbbell,
  prueba: CalendarCheck,
  horario: Timer,
} as const

export function Hero() {
  const featured = getPlan("full")

  return (
    <section className="relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80"
        alt={`Sala de ${BRAND.name}`}
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
      <div className="relative mx-auto grid min-h-[88vh] max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <OpenBadge />
          <p className="mt-5 font-display text-sm tracking-[0.35em] text-red">GIMNASIO · INSCRIPCIÓN POR WHATSAPP</p>
          <h1 className="mt-2 font-display text-5xl uppercase leading-[0.92] text-cream sm:text-7xl">
            {BRAND.name}
            <span className="mt-3 block text-2xl font-semibold normal-case tracking-normal text-cream-2 sm:text-3xl">
              {BRAND.tagline}
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base text-muted">
            Planes, clases y clase de prueba. Ves lo que hay y mandás la consulta armada al gimnasio.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/planes"
              className="rounded-xl bg-red px-6 py-3 font-display uppercase tracking-wider text-ink hover:bg-red-2"
            >
              Ver planes
            </Link>
            <a
              href={whatsappBlankUrl()}
              className="rounded-xl border border-cream/30 px-6 py-3 font-display uppercase tracking-wider text-cream hover:border-cream"
            >
              WhatsApp {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
        {featured && (
          <Link
            to={`/consultar?plan=${featured.id}`}
            className="justify-self-end overflow-hidden rounded-3xl border border-white/10 bg-card/80 shadow-2xl backdrop-blur-sm lg:max-w-md"
          >
            <div className="relative h-52">
              <img src={featured.image} alt={featured.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
              <span className="ribbon absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                Destacado
              </span>
            </div>
            <div className="p-5">
              <p className="font-display text-sm uppercase tracking-widest text-red">Plan full</p>
              <h2 className="mt-1 font-display text-2xl uppercase text-cream">{featured.name}</h2>
              <p className="mt-2 text-sm text-muted">{featured.highlights.join(" · ")}</p>
              <p className="mt-4 font-display text-lg uppercase tracking-wider text-cream">{featured.priceLabel}</p>
            </div>
          </Link>
        )}
      </div>
    </section>
  )
}

export function HomeExtras() {
  return (
    <>
      <Specialties />
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = FEATURE_ICONS[feature.id]
            return (
              <div key={feature.id} className="rounded-2xl border border-white/10 bg-ink-2 p-5">
                <Icon className="h-6 w-6 text-red" />
                <h3 className="mt-3 font-display text-lg uppercase text-cream">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted">{feature.text}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
