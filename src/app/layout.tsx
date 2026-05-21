import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Glowly — AI Booking for Beauty & Wellness',
  description: 'Book appointments with your favorite salon, spa, or wellness professional. AI-powered scheduling, 24/7 availability, instant confirmations.',
  keywords: 'salon booking, hair appointment, spa booking, wellness, AI scheduling',
  openGraph: {
    title: 'Glowly — AI Booking for Beauty & Wellness',
    description: 'Discover and book with top beauty & wellness professionals near you.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-dark min-h-screen antialiased">{children}</body>
    </html>
  )
}
