import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white tracking-widest">DASHBOARD</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(173,232,244,0.5)' }}>
          Manage your site content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/content"
          className="group flex items-start gap-4 p-6 rounded-2xl border transition-all duration-200"
          style={{ background: 'rgba(0,180,216,0.04)', borderColor: 'rgba(0,180,216,0.15)' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.2)' }}
          >
            <FileText size={18} style={{ color: '#00B4D8' }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white font-body mb-1">Site Content</p>
            <p className="text-xs font-body" style={{ color: 'rgba(173,232,244,0.45)' }}>
              Edit hero text, stats, ticker, contact info, and footer.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
