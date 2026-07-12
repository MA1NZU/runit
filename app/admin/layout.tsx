'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession()

      // If no session and not already on login page, redirect
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login')
      } else {
        setLoading(false)
      }
    }

    checkSession()
  }, [router, pathname])

  // Dont show loading on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"/>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
