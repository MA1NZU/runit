// app/news/page.tsx
import { supabase, News } from '@/lib/supabase'

async function getNews() {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) throw error
  return data as News[]
}

export default async function NewsPage() {
  const news = await getNews()

  const categoryColors: Record<string, string> = {
    update: 'bg-blue-600',
    event: 'bg-purple-600',
    general: 'bg-gray-600',
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-white mb-8">📰 Latest News</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition">
            <span className={`text-xs font-bold px-2 py-1 rounded ${categoryColors[item.category]}`}>
              {item.category.toUpperCase()}
            </span>
            <h2 className="text-xl font-bold text-white mt-3">{item.title}</h2>
            <p className="text-gray-400 mt-2 line-clamp-3">{item.content}</p>
            <p className="text-gray-500 text-sm mt-4">
              {new Date(item.published_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
