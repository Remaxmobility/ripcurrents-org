import SchoolsClient from './SchoolsClient'
import { supabase } from '@/lib/supabase'

async function getContent(): Promise<Record<string, string>> {
  try {
    const { data } = await supabase.from('site_content').select('key, value')
    const c: Record<string, string> = {}
    for (const row of data || []) c[row.key] = row.value
    return c
  } catch { return {} }
}

export default async function SchoolsPage() {
  const content = await getContent()
  return <SchoolsClient content={content} />
}
