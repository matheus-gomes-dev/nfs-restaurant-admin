import authCheck from "@/app/helpers/authCheck"
import { Order } from "@/types/orders"
import { redirect } from "next/navigation"
import RevenueChart from "@/app/components/RevenueChart"
import ProductRevenueChart from "@/app/components/ProductRevenueChart"
import VisualizationChart from "@/app/components/VisualizationChart"
import { Divider, Typography, Grid } from '@mui/material'


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
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <VisualizationChart title="Faturamento por Categoria">
            <RevenueChart orders={orders} />
          </VisualizationChart>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <VisualizationChart title="Faturamento por Produto">
            <ProductRevenueChart orders={orders} />
          </VisualizationChart>
        </Grid>
      </Grid>
    </>
  )
}