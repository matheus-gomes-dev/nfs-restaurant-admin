import authCheck from "@/app/helpers/authCheck"
import { Order } from "@/types/orders"
import { redirect } from "next/navigation"
import RevenueChart from "@/app/components/RevenueChart"
import { Box, Divider, Typography } from '@mui/material'


export default async function DashboardPage() {
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
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Dashboard</Typography>
      <Divider />
      <RevenueChart orders={orders} />
    </>
  )
}