import './globals.css'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  metadataBase: new URL('https://eventspheresolutions.com'),
  title: {
    default: 'Sphere | Private Event Sales Platform for Hospitality',
    template: '%s | Sphere by Event Sphere Solutions',
  },
  description: 'Sphere helps restaurants, bars, and venues protect and grow their private event sales — instant proposals, digital BEOs, and AI that responds 24/7. Built for hospitality. Not adapted for it.',
  keywords: 'private event sales platform, restaurant event booking software, venue event management, private dining booking system, hospitality event software, BEO software, event sales automation, private event CRM',
  openGraph: {
    title: 'Sphere | Private Event Sales Platform for Hospitality',
    description: 'Sphere helps restaurants, bars, and venues protect and grow their private event sales — instant proposals, digital BEOs, and AI that responds 24/7. Built for hospitality. Not adapted for it.',
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
    description: 'Sphere helps restaurants, bars, and venues protect and grow their private event sales. Built for hospitality. Not adapted for it.',
    images: ['/feature-image.png'],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Event Sphere Solutions',
  url: 'https://eventspheresolutions.com',
  logo: 'https://eventspheresolutions.com/images/logo-main.png',
  description: 'Sphere is the private event sales platform built for restaurants, bars, and venues. Not adapted for it. Built for it.',
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'Samia Kohler',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Phoenix',
    addressRegion: 'AZ',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.linkedin.com/company/event-sphere-solutions',
    'https://www.instagram.com/eventspheresolutions',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"6a27294c9521fc0018ce08b6"})},
document.head.appendChild(o)}initApollo();`}
        </Script>
      </body>
    </html>
  )
}
