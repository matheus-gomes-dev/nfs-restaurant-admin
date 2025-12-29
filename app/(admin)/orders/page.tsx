import authCheck from "@/app/helpers/authCheck"
import { redirect } from "next/navigation"

export default async function OrdersPage() {
  const isAuthenticated = await authCheck()
  if (!isAuthenticated) {
    redirect('/')
  }
  return <h1>Pedidos</h1>
}