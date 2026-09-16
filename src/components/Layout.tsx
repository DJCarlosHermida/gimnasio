import type { MouseEvent, ReactNode } from "react"
import { isInAppPathLink, scrollToTop } from "../lib/scroll"
import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import { ScrollToTop } from "./ScrollToTop"
import { WhatsAppFab } from "./WhatsAppFab"

export function Layout({ children }: { children: ReactNode }) {
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const anchor = (event.target as HTMLElement | null)?.closest("a")
    if (!anchor || !isInAppPathLink(anchor)) return
    requestAnimationFrame(() => scrollToTop())
  }

  return (
    <div className="texture min-h-screen pb-8" onClick={handleClick}>
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
