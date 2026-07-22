import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'RUNIT',
  description: 'Official website for RUNIT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-fortnite text-white min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
