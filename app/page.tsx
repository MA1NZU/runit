import Link from 'next/link'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h1 className="text-6xl font-bold text-yellow-400 mb-4">RUNIT</h1>
      <p className="text-gray-400 text-xl mb-10">
        Welcome to the official RUNIT website
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <Link href="/news" className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">News</h2>
          <p className="text-gray-400">Latest updates and announcements</p>
        </Link>
        <Link href="/bugs" className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Known Bugs</h2>
          <p className="text-gray-400">Current issues we are working on</p>
        </Link>
        <Link href="/patch-notes" className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Patch Notes</h2>
          <p className="text-gray-400">Full history of changes</p>
        </Link>
      </div>
    </main>
  )
}
