import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { LayoutDashboard, FileText } from 'lucide-react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className="min-h-screen flex bg-ocean-deep">
      {/* Sidebar */}
      <aside className="w-60 flex flex-col flex-shrink-0 bg-ocean-abyss" style={{ borderRight: '1px solid rgba(0,180,216,0.12)' }}>
        {/* Logo */}
        <div className="p-6" style={{ borderBottom: '1px solid rgba(0,180,216,0.12)' }}>
          <Link href="/" className="flex flex-col group">
            <span className="font-display text-base tracking-[0.14em] text-white">
              RIP CURRENT INFO
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase mt-0.5 text-ocean-teal">
              Admin Dashboard
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/admin',         icon: LayoutDashboard, label: 'Dashboard'    },
            { href: '/admin/content', icon: FileText,        label: 'Site Content' },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200
                         text-ocean-foam/50 hover:text-ocean-teal hover:bg-ocean-teal/5 font-body"
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 flex items-center gap-3" style={{ borderTop: '1px solid rgba(0,180,216,0.12)' }}>
          <UserButton />
          <div>
            <p className="text-xs text-white font-body">Rip Current Info</p>
            <p className="text-[10px] text-ocean-foam/30 font-body">Administrator</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
