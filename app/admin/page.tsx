'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import AdminNav from '@/components/AdminNav'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

// NEWS FORM
function NewsForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('general')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const { error } = await supabase.from('news').insert({
      title,
      content,
      category,
      is_published: true,
    })

    if (!error) {
      setSuccess(true)
      setTitle('')
      setContent('')
      setCategory('general')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white">Create News Post</h2>
      {success && <p className="text-green-400">✅ News post created!</p>}
      <div>
        <label className="text-gray-400 text-sm mb-1 block">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-1 block">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="general">General</option>
          <option value="update">Update</option>
          <option value="event">Event</option>
        </select>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-1 block">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
      >
        {loading ? 'Publishing...' : 'Publish News'}
      </button>
    </form>
  )
}

// BUGS FORM
function BugsForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [severity, setSeverity] = useState('medium')
  const [status, setStatus] = useState('known')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const { error } = await supabase.from('bugs').insert({
      title,
      description,
      severity,
      status,
    })

    if (!error) {
      setSuccess(true)
      setTitle('')
      setDescription('')
      setSeverity('medium')
      setStatus('known')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white">Report a Bug</h2>
      {success && <p className="text-green-400">✅ Bug added!</p>}
      <div>
        <label className="text-gray-400 text-sm mb-1 block">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-1 block">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-sm mb-1 block">Severity</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🟠 High</option>
            <option value="critical">🔴 Critical</option>
          </select>
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-1 block">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="known">Known</option>
            <option value="investigating">🔍 Investigating</option>
            <option value="fixed">✅ Fixed</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Bug'}
      </button>
    </form>
  )
}

// PATCH NOTES FORM
function PatchNotesForm() {
  const [version, setVersion] = useState('')
  const [title, setTitle] = useState('')
  const [changes, setChanges] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    // Split changes by new line into array
    const changesArray = changes
      .split('\n')
      .map((c) => c.trim())
      .filter((c) => c !== '')

    const { error } = await supabase.from('patch_notes').insert({
      version,
      title,
      changes: changesArray,
    })

    if (!error) {
      setSuccess(true)
      setVersion('')
      setTitle('')
      setChanges('')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white">Create Patch Notes</h2>
      {success && <p className="text-green-400">✅ Patch notes created!</p>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-sm mb-1 block">Version (e.g. 1.2.0)</label>
          <input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="1.0.0"
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-1 block">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Bug fixes and improvements"
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-1 block">
          Changes (one per line)
        </label>
        <textarea
          value={changes}
          onChange={(e) => setChanges(e.target.value)}
          rows={8}
          placeholder={`Fixed player spawn issue\nAdded new weapon\nImproved performance`}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
      >
        {loading ? 'Publishing...' : 'Publish Patch Notes'}
      </button>
    </form>
  )
}

// MAIN ADMIN PAGE
function AdminContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') ?? 'news'

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNav active={tab} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        {tab === 'news' && <NewsForm />}
        {tab === 'bugs' && <BugsForm />}
        {tab === 'patch-notes' && <PatchNotesForm />}
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense>
      <AdminContent />
    </Suspense>
  )
}
