import { supabase, Bug } from '@/lib/supabase'

async function getBugs() {
  const { data, error } = await supabase
    .from('bugs')
    .select('*')
    .order('reported_at', { ascending: false })

  if (error) return []
  return data as Bug[]
}

export default async function BugsPage() {
  const bugs = await getBugs()

  const severityConfig = {
    critical: { color: 'border-red-400 text-red-400', label: '🔴 Critical' },
    high:     { color: 'border-orange-400 text-orange-400', label: '🟠 High' },
    medium:   { color: 'border-yellow-400 text-yellow-400', label: '🟡 Medium' },
    low:      { color: 'border-green-400 text-green-400', label: '🟢 Low' },
  }

  const statusConfig = {
    known:         { color: 'bg-gray-700', label: 'Known' },
    investigating: { color: 'bg-yellow-700', label: '🔍 Investigating' },
    fixed:         { color: 'bg-green-700', label: '✅ Fixed' },
  }

  const activeBugs = bugs.filter(b => b.status !== 'fixed')
  const fixedBugs = bugs.filter(b => b.status === 'fixed')

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-white mb-2">🐛 Known Bugs</h1>
      <p className="text-gray-400 mb-8">We are aware of these issues and working on fixes.</p>

      <h2 className="text-2xl font-semibold text-white mb-4">Active Issues</h2>
      {activeBugs.length === 0 ? (
        <p className="text-gray-400 mb-8">No active bugs right now! 🎉</p>
      ) : (
        <div className="flex flex-col gap-4 mb-10">
          {activeBugs.map((bug) => (
            <div key={bug.id} className={`bg-gray-800 rounded-xl p-5 border-l-4 ${severityConfig[bug.severity].color}`}>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <h3 className="text-lg font-bold text-white">{bug.title}</h3>
                <div className="flex gap-2">
                  <span className={`text-xs font-bold border px-2 py-1 rounded ${severityConfig[bug.severity].color}`}>
                    {severityConfig[bug.severity].label}
                  </span>
                  <span className={`text-xs font-bold px-2 py-1 rounded text-white ${statusConfig[bug.status].color}`}>
                    {statusConfig[bug.status].label}
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mt-2">{bug.description}</p>
              <p className="text-gray-600 text-sm mt-3">
                Reported: {new Date(bug.reported_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-semibold text-white mb-4">✅ Recently Fixed</h2>
      {fixedBugs.length === 0 ? (
        <p className="text-gray-400">No fixed bugs yet.</p>
      ) : (
        <div className="flex flex-col gap-4 opacity-70">
          {fixedBugs.map((bug) => (
            <div key={bug.id} className="bg-gray-800 rounded-xl p-5 border-l-4 border-green-600">
              <h3 className="text-lg font-bold text-white line-through">{bug.title}</h3>
              <p className="text-gray-500 mt-1">{bug.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
