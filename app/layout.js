import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  metadataBase: new URL('https://eventspheresolutions.com'),
  title: {
    default: 'Sphere | Private Event Sales Platform for Hospitality',
    template: '%s | Sphere by Event Sphere Solutions',
  },
  description: 'Sphere helps restaurants, bars, and venues sell more private events — instant proposals, digital BEOs, and AI that responds 24/7. Built for hospitality. Not adapted for it.',
  keywords: 'private event sales platform, restaurant event booking software, venue event management, private dining booking system, hospitality event software, BEO software, event sales automation, private event CRM',
  openGraph: {
    title: 'Sphere | Private Event Sales Platform for Hospitality',
    description: 'Sphere helps restaurants, bars, and venues sell more private events — instant proposals, digital BEOs, and AI that responds 24/7. Built for hospitality. Not adapted for it.',
    url: 'https://eventspheresolutions.com',
    siteName: 'Sphere by Event Sphere Solutions',
    type: 'website',
    images: [
      {
        url: '/feature-image.png',
        width: 1200,
        height: 630,
        alt: 'Sphere — Private Event Sales Platform for Hospitality',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sphere | Private Event Sales Platform for Hospitality',
    description: 'Sphere helps restaurants, bars, and venues sell more private events. Built for hospitality. Not adapted for it.',
    images: ['/feature-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
