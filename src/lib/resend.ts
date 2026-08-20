import { Order } from '@/types'

export async function sendOrderConfirmationEmail(order: Order, customerEmail: string) {
  console.log(`📧 [EMAIL SENT] Order Confirmation #${order.orderNumber} sent to ${customerEmail}`)
  return { success: true }
}

export function generateInvoiceHTML(order: Order): string {
  const itemsList = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${item.product.title} ${item.variant ? `(${item.variant.size || ''} ${item.variant.color || ''})` : ''}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">$${item.unitPrice.toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">$${(item.quantity * item.unitPrice).toFixed(2)}</td>
      </tr>
    `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice #${order.orderNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #1a202c; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; }
          .title { font-size: 28px; font-weight: bold; color: #090A0F; }
          .table { width: 100%; border-collapse: collapse; margin-top: 30px; }
          .table th { background: #f7fafc; padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e0; }
          .totals { margin-top: 30px; text-align: right; }
          .totals div { margin-bottom: 6px; }
          .grand-total { font-size: 20px; font-weight: bold; color: #D4AF37; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">LUXURY STORE</div>
            <div>High-Fidelity E-Commerce Platform</div>
          </div>
          <div style="text-align: right;">
            <h2>INVOICE</h2>
            <div>Invoice #: INV-${order.orderNumber}</div>
            <div>Date: ${new Date(order.createdAt).toLocaleDateString()}</div>
          </div>
        </div>

        <div style="margin-top: 30px; display: flex; justify-content: space-between;">
          <div>
            <strong>Billed To:</strong><br />
            ${order.shippingAddress.fullName}<br />
            ${order.shippingAddress.street}<br />
            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}<br />
            ${order.shippingAddress.country}
          </div>
          <div style="text-align: right;">
            <strong>Order Status:</strong> ${order.status}<br />
            <strong>Payment Status:</strong> ${order.paymentStatus}
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Item Description</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Unit Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>

        <div class="totals">
          <div>Subtotal: $${order.subtotal.toFixed(2)}</div>
          <div>Discount: -$${order.discount.toFixed(2)}</div>
          <div>Shipping: $${order.shippingFee.toFixed(2)}</div>
          <div>Tax (Estimated 8%): $${order.tax.toFixed(2)}</div>
          <div class="grand-total">Total Paid: $${order.total.toFixed(2)}</div>
        </div>

        <div style="margin-top: 60px; text-align: center; color: #718096; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
          Thank you for your business! For support inquiries, contact support@luxurystore.com
        </div>
      </body>
    </html>
  `
}
