import { BRAND, SCHEDULE } from "../data/catalog"

const TZ = BRAND.timezone

const DAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export type ShopStatus = {
  open: boolean
  label: string
  dayLabel: string
  timeLabel: string
}

function partsInZone(now: Date) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
  }).format(now)

  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      hour: "2-digit",
      hourCycle: "h23",
    }).format(now),
  )

  const timeLabel = new Intl.DateTimeFormat("es-UY", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now)

  const dayLabel = new Intl.DateTimeFormat("es-UY", {
    timeZone: TZ,
    weekday: "long",
  }).format(now)

  return { weekday, hour, timeLabel, dayLabel }
}

export function getShopStatus(now = new Date()): ShopStatus {
  const { weekday, hour, timeLabel, dayLabel } = partsInZone(now)
  const slot = SCHEDULE[DAY_INDEX[weekday] ?? 0]
  const open = slot != null && hour >= slot.open && hour < slot.close

  return {
    open,
    label: open ? "Abierto ahora" : "Cerrado ahora",
    dayLabel,
    timeLabel,
  }
}
