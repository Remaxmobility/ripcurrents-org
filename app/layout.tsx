import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RIP Currents Info | Know the Current. Save Your Life.',
  description:
    'Rip current education and awareness for the Great Lakes and beyond. Learn to identify, survive, and help prevent rip current drownings.',
  keywords: [
    'rip current',
    'rip current safety',
    'Great Lakes drowning prevention',
    'rip current awareness',
    'beach safety',
    'ocean safety',
    'flip float follow',
    'Nathan MacIntyre',
  ],
  openGraph: {
    title: 'RIP Currents Info — Know the Current. Save Your Life.',
    description:
      'Evidence-based rip current education for the Great Lakes and beyond.',
    url: 'https://www.ripcurrents.org',
    siteName: 'RIP Currents Info',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RIP Currents Info',
    description: 'Know the Current. Save Your Life.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://www.ripcurrents.org'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-ocean-deep text-white font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
