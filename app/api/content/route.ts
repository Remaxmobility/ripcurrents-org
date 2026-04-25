import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin.from('site_content').select('key, value')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const content: Record<string, string> = {}
  for (const row of data || []) content[row.key] = row.value
  return NextResponse.json(content)
}

export async function PUT(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const rows: Array<{ key: string; value: string; updated_at: string }> = []

  if (body.updates && Array.isArray(body.updates)) {
    for (const u of body.updates) {
      rows.push({ key: u.key, value: u.value, updated_at: new Date().toISOString() })
    }
  } else if (body.key) {
    rows.push({ key: body.key, value: body.value, updated_at: new Date().toISOString() })
  } else {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('site_content')
    .upsert(rows, { onConflict: 'key' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
