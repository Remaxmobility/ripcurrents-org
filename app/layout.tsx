import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rip Current Information Project | Know the Current. Stay Safe.',
  description:
    'The Rip Current Information Project educates Canadians about rip current dangers on the Great Lakes. Learn to identify, survive, and help prevent rip current drownings.',
  keywords: [
    'rip current',
    'rip current safety',
    'Great Lakes drowning prevention',
    'rip current awareness',
    'Ontario beach safety',
    'Great Lakes safety',
    'rip current education Canada',
    'Lake Huron rip current',
    'Lake Erie rip current',
  ],
  openGraph: {
    title: 'Rip Current Information Project — Know the Current. Stay Safe.',
    description:
      'Evidence-based rip current education for the Canadian Great Lakes.',
    url: 'https://www.ripcurrentinfo.org',
    siteName: 'Rip Current Information Project',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rip Current Information Project',
    description: 'Know the Current. Stay Safe. Great Lakes rip current education.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://www.ripcurrentinfo.org'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body className="bg-ocean-deep text-white font-body antialiased overflow-x-hidden">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
