import authCheck from "@/app/helpers/authCheck"
import { redirect } from "next/navigation"

export default async function ProductsPage() {
  const token = await authCheck()
  if (!token) {
    redirect('/')
  }
  return <h1>Produtos</h1>
}