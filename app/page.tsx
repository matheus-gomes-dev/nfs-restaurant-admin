import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    const apiResponse = await fetch(`${process.env.API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (apiResponse.status === 200) {
      redirect('/dashboard')
    }
  }
  return <h1>Welcome to Natal Free Surf Admin Platform</h1>
}
