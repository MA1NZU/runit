import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-yellow-400">
          RUNIT
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link href="/news" className="text-gray-300 hover:text-white transition">
            News
          </Link>
          <Link href="/bugs" className="text-gray-300 hover:text-white transition">
            Known Bugs
          </Link>
          <Link href="/patch-notes" className="text-gray-300 hover:text-white transition">
            Patch Notes
          </Link>
        </div>
      </div>
    </nav>
  )
}
