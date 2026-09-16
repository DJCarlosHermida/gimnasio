export type PlanId = "musculacion" | "clases" | "funcional" | "full"

export type Plan = {
  id: PlanId
  name: string
  description: string
  priceLabel: string
  highlights: string[]
  image: string
  featured?: boolean
}

export type InquiryForm = {
  name: string
  phone: string
  planId: string
  trial: boolean
  notes: string
}
