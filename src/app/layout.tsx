import './globals.css'
import 'react-datepicker/dist/react-datepicker.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'

// Optimize font loading
const inter = Outfit({ 
  subsets: ['latin'],
  display: 'swap', // Add display swap for better performance
  preload: true,
  adjustFontFallback: true 
})

// Optimize metadata
export const metadata: Metadata = {
  title: 'samir - Exclusive Tours & Activities in Morocco',
  description: 'Discover authentic Moroccan experiences with samir. Book desert tours, city excursions, and traditional activities with expert local guides.',
  metadataBase: new URL('https://samir.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'VIP Marrakech Trips - Exclusive Tours & Activities in Morocco',
    description: 'Discover authentic Moroccan experiences with VIP Marrakech Trips. Book desert tours, city excursions, and cultural activities with expert local guides.',
    url: 'https://vipmarrakechtrips.com',
    siteName: 'VIP Marrakech Trips',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIP Marrakech Trips - Exclusive Tours & Activities in Morocco',
    description: 'Discover authentic Moroccan experiences with VIP Marrakech Trips. Book desert tours, city excursions, and cultural activities with expert local guides.',
  },
  // Add performance-related meta tags
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        {/* Add preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Add preload for critical assets */}
        <link rel="preload" as="image" href="/tripadvisor.jpeg" />
        <link rel="preload" as="image" href="/getyourguide.jpg" />
        
        {/* Add viewport meta with performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className="bg-sand-50">
        {children}
      </body>
    </html>
  )
} 