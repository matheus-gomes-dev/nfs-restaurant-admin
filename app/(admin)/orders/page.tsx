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
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Pedidos</Typography>
      <Divider />
      <OrderList orders={orders} />
    </>
  )
}