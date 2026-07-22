'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session)
    })
  }, [pathname])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/news', label: 'News' },
    { href: '/bugs', label: 'Known Bugs' },
    { href: '/patch-notes', label: 'Patch Notes' },
  ]

  return (
    <nav className="bg-gray-900 bg-opacity-90 backdrop-blur-sm border-b-2 border-yellow-400 px-6 py-2 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="RUNIT Logo"
            width={120}
            height={60}
            className="object-contain"
            priority
          />
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold uppercase tracking-wide text-sm transition hover:text-yellow-400 ${
                pathname === link.href ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm uppercase tracking-wide hover:bg-yellow-300 transition"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
