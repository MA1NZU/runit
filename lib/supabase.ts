import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type News = {
  id: string
  title: string
  content: string
  category: string
  image_url: string | null
  published_at: string
  is_published: boolean
}

export type Bug = {
  id: string
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'known' | 'investigating' | 'fixed'
  reported_at: string
  fixed_at: string | null
}

export type PatchNote = {
  id: string
  version: string
  title: string
  changes: string[]
  released_at: string
}
