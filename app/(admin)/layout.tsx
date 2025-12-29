import { redirect } from "next/navigation"
import authCheck from "../helpers/authCheck"
import Header from "../components/Header"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await authCheck()
  if (!isAuthenticated) {
    redirect('/')
  }

  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}