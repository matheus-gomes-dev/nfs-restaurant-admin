import { redirect } from "next/navigation"
import authCheck from "../helpers/authCheck"

export default async function DashboardPage() {
  const isAuthenticated = await authCheck()
  if (!isAuthenticated) {
    redirect('/')
  }
  return <h1>Dashboard</h1>
}