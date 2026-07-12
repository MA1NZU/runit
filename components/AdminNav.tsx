'use client'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminNav({ active }: { active: string }) {
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const tabs = [
    { label: '📰 News', value: 'news' },
    { label: '🐛 Bugs', value: 'bugs' },
    { label: '📋 Patch Notes', value: 'patch-notes' },
  ]

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => router.push(`/admin?tab=${tab.value}`)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              active === tab.value
                ? 'bg-yellow-400 text-gray-900'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="text-red-400 hover:text-red-300 transition font-semibold"
      >
        Logout
      </button>
    </div>
  )
}
