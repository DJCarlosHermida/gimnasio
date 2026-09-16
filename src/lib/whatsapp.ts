import { BRAND, getPlan } from "../data/catalog"
import type { InquiryForm } from "../types"

export function buildWhatsAppMessage(form: InquiryForm, closed: boolean): string {
  const plan = form.planId ? getPlan(form.planId) : undefined

  return [
    `Consulta ${BRAND.type} ${BRAND.name}`,
    closed ? "(Consulta enviada fuera de horario)" : null,
    `Nombre: ${form.name.trim()}`,
    `Tel: ${form.phone.trim()}`,
    plan ? `Plan de interés: ${plan.name}` : "Plan de interés: (a definir)",
    form.trial ? "Quiere clase de prueba: Sí" : "Quiere clase de prueba: No",
    form.notes.trim() ? `Comentario: ${form.notes.trim()}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n")
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${BRAND.whatsappE164}?text=${encodeURIComponent(message)}`
}

export function whatsappBlankUrl(): string {
  return `https://wa.me/${BRAND.whatsappE164}`
}
