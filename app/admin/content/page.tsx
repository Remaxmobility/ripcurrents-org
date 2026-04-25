import { supabaseAdmin } from '@/lib/supabase'
import ContentEditor from '@/components/admin/ContentEditor'

async function getSiteContent(): Promise<Record<string, string>> {
  const { data } = await supabaseAdmin.from('site_content').select('key, value')
  const content: Record<string, string> = {}
  for (const row of data || []) content[row.key] = row.value
  return content
}

export default async function ContentPage() {
  const content = await getSiteContent()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white tracking-widest">SITE CONTENT</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(173,232,244,0.5)' }}>
          Edit homepage text, contact info, and footer.
        </p>
      </div>
      <ContentEditor initialContent={content} />
    </div>
  )
}
