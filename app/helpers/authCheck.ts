import { cookies } from "next/headers"

export default async function authCheck(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) {
    return false
  }
  const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (apiResponse.status === 200) {
    return true
  }
  return false
}