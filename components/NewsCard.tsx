'use client'
import { News } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const categoryColors: Record<string, string> = {
  update: 'bg-blue-600 text-white',
  event: 'bg-purple-600 text-white',
  general: 'bg-gray-600 text-white',
}

export default function NewsCard({ item }: { item: News }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [content, setContent] = useState(item.content)
  const [category, setCategory] = useState(item.category)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session)
    })
  }, [])

  async function handleSave() {
    setLoading(true)
    await supabase.from('news').update({ title, content, category }).eq('id', item.id)
    setEditing(false)
    setLoading(false)
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Delete this post?')) return
    await supabase.from('news').delete().eq('id', item.id)
    router.refresh()
  }

  const inputClass = 'w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2'

  if (editing) {
    return (
      <div className="bg-gray-800 border-2 border-yellow-400 rounded-xl p-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="Title"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        >
          <option value="general">General</option>
          <option value="update">Update</option>
          <option value="event">Event</option>
        </select>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className={inputClass}
          placeholder="Content"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 transition flex-1"
          >
            {loading ? 'Saving...' : '✅ Save'}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-700 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 card-glow transition relative">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-bold px-2 py-1 rounded ${categoryColors[item.category] ?? 'bg-gray-600 text-white'}`}>
          {item.category.toUpperCase()}
        </span>
        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-lg transition"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg transition"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
      <h2 className="text-xl font-bold text-white mt-2">{item.title}</h2>
      <p className="text-gray-400 mt-2 line-clamp-3">{item.content}</p>
      <p className="text-gray-600 text-sm mt-4">
        {new Date(item.published_at).toLocaleDateString()}
      </p>
    </div>
  )
}
