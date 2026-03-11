import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Event Sphere Solutions | Event Planning & Marketing for Hospitality',
  description: 'We help restaurants, bars, venues, and hotels create unforgettable events — from planning and technology to marketing and on-site execution.',
  keywords: 'event planning, event management, restaurant events, hotel events, venue events, bar events, hospitality events, event marketing',
  openGraph: {
    title: 'Event Sphere Solutions',
    description: 'Full-service event solutions for hospitality businesses.',
    url: 'https://eventspheresolutions.com',
    siteName: 'Event Sphere Solutions',
    type: 'website',
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
