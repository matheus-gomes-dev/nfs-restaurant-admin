import OrderList from "@/app/components/OrderList"
import authCheck from "@/app/helpers/authCheck"
import { Order } from "@/types/orders"
import { Divider, Typography } from "@mui/material"
import { redirect } from "next/navigation"

export default async function OrdersPage() {
  const token = await authCheck()
  if (!token) {
    redirect('/')
  }
  const ordersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  const orders: Order[] = await ordersResponse.json()

  const onCompleteOrder = async (orderId: string) => {
    'use server';
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'completa' })
    })
    if (result.status !== 200) {
      const error = await result.text();
      console.error('Error completing order:', error);
      throw new Error('Error completing order')
    }
  }

  const onCancelOrder = async (orderId: string) => {
    'use server';
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'cancelada' })
    })
    if (result.status !== 200) {
      const error = await result.text();
      console.error('Error cancelling order:', error);
      throw new Error('Error cancelling order')
    }
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Pedidos</Typography>
      <Divider />
      <OrderList
        orders={orders}
        onCompleteOrder={onCompleteOrder}
        onCancelOrder={onCancelOrder}
      />
    </>
  )
}