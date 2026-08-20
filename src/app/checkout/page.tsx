import { CheckoutSteps } from '@/components/checkout/CheckoutSteps'

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-border pb-6">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
            256-Bit Encrypted Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Seamless Order Checkout
          </h1>
        </div>

        <CheckoutSteps />
      </div>
    </main>
  )
}
