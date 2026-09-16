import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { BrandMark } from "./BrandMark"
import { OpenBadge } from "./OpenBadge"

const LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/planes", label: "Planes" },
  { to: "/consultar", label: "Inscribirme" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <BrandMark size="sm" />
        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-display text-sm tracking-wider uppercase ${
                  isActive ? "text-cream" : "text-muted hover:text-cream"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex">
            <OpenBadge compact />
          </span>
          <NavLink
            to="/consultar"
            className="hidden rounded-xl bg-red px-4 py-2 font-display text-sm uppercase tracking-wider text-ink hover:bg-red-2 sm:inline-flex"
          >
            Clase de prueba
          </NavLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/10 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display text-lg uppercase ${isActive ? "text-cream" : "text-muted"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
