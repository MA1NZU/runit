'use client'
import { News } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

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
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Local display values
  const [currentTitle, setCurrentTitle] = useState(item.title)
  const [currentContent, setCurrentContent] = useState(item.content)
  const [currentCategory, setCurrentCategory] = useState(item.category)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session)
    })
  }, [])

  async function handleSave() {
    setLoading(true)
    setError('')

    const { error } = await supabase
      .from('news')
      .update({ title, content, category })
      .eq('id', item.id)
      .select()

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Update display values immediately
    setCurrentTitle(title)
    setCurrentContent(content)
    setCurrentCategory(category)

    setSuccess(true)
    setEditing(false)
    setLoading(false)
    setTimeout(() => setSuccess(false), 3000)
  }

  async function handleDelete() {
    if (!confirm('Delete this post?')) return
    const { error } = await supabase.from('news').delete().eq('id', item.id)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      window.location.reload()
    }
  }

  function handleCancel() {
    setTitle(currentTitle)
    setContent(currentContent)
    setCategory(currentCategory)
    setEditing(false)
    setError('')
  }

  const inputClass = 'w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2'

  if (editing) {
    return (
      <div className="bg-gray-800 border-2 border-yellow-400 rounded-xl p-6">
        <h3 className="text-yellow-400 font-bold mb-3">✏️ Editing Post</h3>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
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
            className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 transition flex-1 disabled:opacity-50"
          >
            {loading ? 'Saving...' : '✅ Save'}
          </button>
          <button
            onClick={handleCancel}
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
      {success && (
        <p className="text-green-400 text-sm font-bold mb-2">✅ Post updated successfully!</p>
      )}
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-bold px-2 py-1 rounded ${categoryColors[currentCategory] ?? 'bg-gray-600 text-white'}`}>
          {currentCategory.toUpperCase()}
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
      <h2 className="text-xl font-bold text-white mt-2">{currentTitle}</h2>
      <p className="text-gray-400 mt-2 line-clamp-3">{currentContent}</p>
      <p className="text-gray-600 text-sm mt-4">
        {new Date(item.published_at).toLocaleDateString()}
      </p>
    </div>
  )
}
