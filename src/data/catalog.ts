import type { Plan } from "../types"

export const BRAND = {
  name: "Gimnasio",
  tagline: "Entrená a tu ritmo",
  type: "Gimnasio",
  zone: "Barrio de ejemplo",
  hoursLabel: "Lunes a viernes · 7:00 a 22:00 hs · Sábados 8:00 a 14:00 hs",
  phoneDisplay: "091 332 854",
  whatsappE164: "59891332854",
  timezone: "America/Montevideo",
} as const

export const SCHEDULE: ({ open: number; close: number } | null)[] = [
  null,
  { open: 7, close: 22 },
  { open: 7, close: 22 },
  { open: 7, close: 22 },
  { open: 7, close: 22 },
  { open: 7, close: 22 },
  { open: 8, close: 14 },
]

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`

export const PLANS: Plan[] = [
  {
    id: "musculacion",
    name: "Musculación",
    description: "Sala de pesas, máquinas y seguimiento inicial.",
    priceLabel: "Consultar cuota",
    highlights: ["Sala de musculación", "Inducción incluida", "Horario extendido"],
    image: img("photo-1534438327276-14e5300c3a48"),
    featured: true,
  },
  {
    id: "clases",
    name: "Clases grupales",
    description: "Funcional, spinning y GAP según la grilla de la semana.",
    priceLabel: "Consultar cuota",
    highlights: ["Clases guiadas", "Cupos limitados", "Todos los niveles"],
    image: img("photo-1518611012118-696072aa579a"),
  },
  {
    id: "funcional",
    name: "Entrenamiento funcional",
    description: "Circuitos, fuerza y acondicionamiento en grupos reducidos.",
    priceLabel: "Consultar cuota",
    highlights: ["Grupos chicos", "Trabajo de fuerza", "Clase de prueba"],
    image: img("photo-1517836357463-d25dfeac3438"),
  },
  {
    id: "full",
    name: "Plan full",
    description: "Musculación + clases grupales. Acceso completo al gimnasio.",
    priceLabel: "Consultar cuota",
    highlights: ["Todo incluido", "Prioridad en cupos", "Evaluación inicial"],
    image: img("photo-1571902943202-507ec2618e8f"),
  },
]

export const ACTIVITIES = [
  { id: "muscu", label: "Musculación", detail: "Sala abierta en el horario del gym", image: PLANS[0].image, to: "/planes#musculacion", featured: true },
  { id: "spin", label: "Spinning", detail: "Turnos de mañana y tarde", image: img("photo-1534367610401-9f5ed68180aa"), to: "/planes#clases", featured: false },
  { id: "gap", label: "GAP", detail: "Glúteos, abdomen y piernas", image: img("photo-1571019614242-c5c5dee9f50b"), to: "/planes#clases", featured: false },
  { id: "funcional", label: "Funcional", detail: "Circuitos de alta intensidad", image: PLANS[2].image, to: "/planes#funcional", featured: false },
] as const

export const FEATURES = [
  { id: "planes", title: "Planes claros", text: "Ves musculación, clases y full antes de escribir." },
  { id: "prueba", title: "Clase de prueba", text: "Pedí una clase de prueba desde el mismo formulario." },
  { id: "horario", title: "Horario a la vista", text: "El sitio muestra si el gimnasio está abierto ahora." },
] as const

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((item) => item.id === id)
}
