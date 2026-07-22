'use client'
import { Bug } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

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
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Local state to show updated values immediately
  const [currentTitle, setCurrentTitle] = useState(bug.title)
  const [currentDescription, setCurrentDescription] = useState(bug.description)
  const [currentSeverity, setCurrentSeverity] = useState(bug.severity)
  const [currentStatus, setCurrentStatus] = useState(bug.status)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session)
    })
  }, [])

  async function handleSave() {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('bugs')
      .update({
        title,
        description,
        severity,
        status,
      })
      .eq('id', bug.id)
      .select()

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Update local display values immediately
    setCurrentTitle(title)
    setCurrentDescription(description)
    setCurrentSeverity(severity)
    setCurrentStatus(status)

    setSuccess(true)
    setEditing(false)
    setLoading(false)

    setTimeout(() => setSuccess(false), 3000)
  }

  async function handleDelete() {
    if (!confirm('Delete this bug?')) return
    const { error } = await supabase.from('bugs').delete().eq('id', bug.id)
    if (error) {
      alert('Error deleting: ' + error.message)
    } else {
      // Hide the card
      window.location.reload()
    }
  }

  function handleCancel() {
    // Reset edit fields back to current values
    setTitle(currentTitle)
    setDescription(currentDescription)
    setSeverity(currentSeverity)
    setStatus(currentStatus)
    setEditing(false)
    setError('')
  }

  const inputClass = 'w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2'

  if (editing) {
    return (
      <div className="bg-gray-800 border-2 border-yellow-400 rounded-xl p-6">
        <h3 className="text-yellow-400 font-bold mb-3">✏️ Editing Bug</h3>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
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
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as Bug['severity'])}
            className={inputClass}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🟠 High</option>
            <option value="critical">🔴 Critical</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Bug['status'])}
            className={inputClass}
          >
            <option value="known">Known</option>
            <option value="investigating">🔍 Investigating</option>
            <option value="fixed">✅ Fixed</option>
          </select>
        </div>
        <div className="flex gap-2">
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
    <div className={`bg-gray-800 rounded-xl p-5 border-l-4 ${severityConfig[currentSeverity].color}`}>
      {success && (
        <p className="text-green-400 text-sm font-bold mb-2">✅ Bug updated successfully!</p>
      )}
      <div className="flex justify-between items-start flex-wrap gap-2">
        <h3 className="text-lg font-bold text-white">{currentTitle}</h3>
        <div className="flex gap-2 items-center flex-wrap">
          <span className={`text-xs font-bold border px-2 py-1 rounded ${severityConfig[currentSeverity].color}`}>
            {severityConfig[currentSeverity].label}
          </span>
          <span className={`text-xs font-bold px-2 py-1 rounded text-white ${statusConfig[currentStatus].color}`}>
            {statusConfig[currentStatus].label}
          </span>
          {isAdmin && (
            <>
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
            </>
          )}
        </div>
      </div>
      <p className="text-gray-400 mt-2">{currentDescription}</p>
      <p className="text-gray-600 text-sm mt-3">
        Reported: {new Date(bug.reported_at).toLocaleDateString()}
      </p>
    </div>
  )
}
