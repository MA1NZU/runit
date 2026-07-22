import { supabase, PatchNote } from '@/lib/supabase'
export const revalidate = 0

async function getPatchNotes() {
  const { data, error } = await supabase
    .from('patch_notes')
    .select('*')
    .order('released_at', { ascending: false })

  if (error) return []
  return data as PatchNote[]
}

export default async function PatchNotesPage() {
  const patches = await getPatchNotes()

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-white mb-8">Patch Notes</h1>
      {patches.length === 0 ? (
        <p className="text-gray-400">No patch notes yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {patches.map((patch) => (
            <div key={patch.id} className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-yellow-400">v{patch.version}</h2>
                <span className="text-gray-500 text-sm">
                  {new Date(patch.released_at).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{patch.title}</h3>
              <ul className="flex flex-col gap-2">
                {patch.changes?.map((change, index) => (
                  <li key={index} className="text-gray-400 flex gap-2">
                    <span className="text-yellow-400">•</span>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
