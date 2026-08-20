import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { FloatingThemeSwitcher } from '@/components/theme/FloatingThemeSwitcher'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { AnnouncementBanner } from '@/components/common/AnnouncementBanner'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { FilterSidebar } from '@/components/common/FilterSidebar'
import { QuickViewModal } from '@/components/common/QuickViewModal'
import { SizeGuideModal } from '@/components/pdp/SizeGuideModal'

export const metadata: Metadata = {
  title: 'AURALUXE | Premier Full-Stack E-Commerce Platform',
  description: 'Ultra-responsive Awwwards-grade luxury e-commerce experience featuring 8 visual themes, real-time search, multi-step Stripe checkout, and executive admin command center.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="midnight-obsidian" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col justify-between antialiased selection:bg-primary selection:text-primary-fg">
        <ThemeProvider>
          <AnnouncementBanner />
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />

          {/* Interactive Modals & Drawers */}
          <CartDrawer />
          <FilterSidebar />
          <QuickViewModal />
          <SizeGuideModal />
          <FloatingThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  )
}
