import { redirect } from 'next/navigation'
import AuthForm from './components/AuthForm'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
import authCheck from './helpers/authCheck'

export default async function Home() {
  const isAuthenticated = await authCheck()
  if (isAuthenticated) {
    redirect('/dashboard')
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
