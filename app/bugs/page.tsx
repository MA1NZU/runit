import { supabase, Bug } from '@/lib/supabase'
import BugCard from '@/components/BugCard'

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
  const activeBugs = bugs.filter(b => b.status !== 'fixed')
  const fixedBugs = bugs.filter(b => b.status === 'fixed')

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-2">
          🐛 Transparency
        </p>
        <h1 className="text-5xl font-fortnite font-bold text-white uppercase tracking-wide">
          Known Bugs
        </h1>
        <p className="text-gray-400 mt-2">
          We are aware of these issues and actively working on fixes.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Active Issues</h2>
      {activeBugs.length === 0 ? (
        <div className="bg-green-900 border border-green-500 rounded-xl p-6 mb-10 text-center">
          <p className="text-green-400 text-xl font-bold">🎉 No active bugs right now!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-10">
          {activeBugs.map((bug) => (
            <BugCard key={bug.id} bug={bug} />
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold text-white mb-4">✅ Recently Fixed</h2>
      {fixedBugs.length === 0 ? (
        <p className="text-gray-400">No fixed bugs yet.</p>
      ) : (
        <div className="flex flex-col gap-4 opacity-70">
          {fixedBugs.map((bug) => (
            <BugCard key={bug.id} bug={bug} />
          ))}
        </div>
      )}
    </div>
  )
}
