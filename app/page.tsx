import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AuthForm from './components/AuthForm'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (apiResponse.status === 200) {
      redirect('/dashboard')
    }
  }
  return (
    <div className='w-full min-h-screen bg-gray-800 flex items-center justify-center flex-col'>
      <Image
        src="/nfs-logo-removebg.png"
        alt="Logo"
        width={300}
        height={300}
      />
      <div className='w-xs'>
        <AuthForm />
      </div>
      <ToastContainer />
    </div>
  )
}
