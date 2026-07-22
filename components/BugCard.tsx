'use client'
import { Bug } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const severityConfig = {
  critical: { color: 'border-red-400 text-red-400', label: '🔴 Critical' },
  high: { color: 'border-orange-400 text-orange-400', label: '🟠 High' },
  medium: { color: 'border-yellow-400 text-yellow-400', label: '🟡 Medium' },
  low: { color: 'border-green-400 text-green-400', label: '🟢 Low' },
}

const statusConfig = {
  known: { color: 'bg-gray-700', label: 'Known' },
  investigating: { color: 'bg-yellow-700', label: '🔍 Investigating' },
  fixed: { color: 'bg-green-700', label: '✅ Fixed' },
}

export default function BugCard({ bug }: { bug: Bug }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(bug.title)
  const [description, setDescription] = useState(bug.description)
  const [severity, setSeverity] = useState(bug.severity)
  const [status, setStatus] = useState(bug.status)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session)
    })
  }, [])

  async function handleSave() {
    setLoading(true)
    await supabase.from('bugs').update({ title, description, severity, status }).eq('id', bug.id)
    setEditing(false)
    setLoading(false)
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Delete this bug?')) return
    await supabase.from('bugs').delete().eq('id', bug.id)
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
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={inputClass}
          placeholder="Description"
        />
        <div className="grid grid-cols-2 gap-2 mb-2">
          <select value={severity} onChange={(e) => setSeverity(e.target.value as Bug['severity'])} className={inputClass}>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🟠 High</option>
            <option value="critical">🔴 Critical</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value as Bug['status'])} className={inputClass}>
            <option value="known">Known</option>
            <option value="investigating">🔍 Investigating</option>
            <option value="fixed">✅ Fixed</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={loading} className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 transition flex-1">
            {loading ? 'Saving...' : '✅ Save'}
          </button>
          <button onClick={() => setEditing(false)} className="bg-gray-700 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition flex-1">
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gray-800 rounded-xl p-5 border-l-4 ${severityConfig[bug.severity].color}`}>
      <div className="flex justify-between items-start flex-wrap gap-2">
        <h3 className="text-lg font-bold text-white">{bug.title}</h3>
        <div className="flex gap-2 items-center">
          <span className={`text-xs font-bold border px-2 py-1 rounded ${severityConfig[bug.severity].color}`}>
            {severityConfig[bug.severity].label}
          </span>
          <span className={`text-xs font-bold px-2 py-1 rounded text-white ${statusConfig[bug.status].color}`}>
            {statusConfig[bug.status].label}
          </span>
          {isAdmin && (
            <>
              <button onClick={() => setEditing(true)} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-lg transition">
                ✏️ Edit
              </button>
              <button onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg transition">
                🗑️
              </button>
            </>
          )}
        </div>
      </div>
      <p className="text-gray-400 mt-2">{bug.description}</p>
      <p className="text-gray-600 text-sm mt-3">
        Reported: {new Date(bug.reported_at).toLocaleDateString()}
      </p>
    </div>
  )
}
