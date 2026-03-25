import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vila i Vila — Doner Kebab & Pizzeria Barcelona',
  description: 'Authentic doner kebab and fresh pizza in Barcelona. 100% Halal. Delivery available. Minimum order 15€.',
  keywords: ['doner kebab', 'pizzeria', 'barcelona', 'halal', 'delivery', 'vila i vila'],
  openGraph: {
    title: 'Vila i Vila — Doner Kebab & Pizzeria',
    description: 'Fresh. Hot. Delicious. Barcelona\'s favourite doner kebab & pizza.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
