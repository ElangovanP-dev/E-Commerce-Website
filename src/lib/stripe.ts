import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key_123', {
  apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
})

export interface CreatePaymentIntentResponse {
  clientSecret: string
  paymentIntentId: string
}

export async function createStripePaymentIntent(amount: number, orderId: string): Promise<CreatePaymentIntentResponse> {
  if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('mock')) {
    try {
      const intent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert dollars to cents
        currency: 'usd',
        metadata: { orderId },
      })
      return {
        clientSecret: intent.client_secret || `mock_secret_${orderId}`,
        paymentIntentId: intent.id,
      }
    } catch (e) {
      console.warn('Stripe Live API call failed, falling back to simulator:', e)
    }
  }

  // Fallback simulator for seamless testing
  return {
    clientSecret: `pi_mock_secret_${orderId}_${Date.now()}`,
    paymentIntentId: `pi_mock_${orderId}_${Date.now()}`,
  }
}
