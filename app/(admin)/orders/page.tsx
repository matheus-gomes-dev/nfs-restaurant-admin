import authCheck from "@/app/helpers/authCheck"
import { redirect } from "next/navigation"

export default async function OrdersPage() {
  const token = await authCheck()
  if (!token) {
    redirect('/')
  }
  return <h1>Pedidos</h1>
}