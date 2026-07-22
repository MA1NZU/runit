import { supabase, News } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'
import NewsCard from '@/components/NewsCard'
import { cookies } from 'next/headers'

async function getNews() {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) return []
  return data as News[]
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-2">
          📰 Stay Informed
        </p>
        <h1 className="text-5xl font-fortnite font-bold text-white uppercase tracking-wide">
          Latest News
        </h1>
      </div>
      {news.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">📭</p>
          <p className="text-gray-400 text-xl">No news yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
