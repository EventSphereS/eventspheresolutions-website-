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
        <Script id="apollo-form-enrichment" strategy="beforeInteractive">
          {`(function initApolloInbound(){var TIMEOUT_MS=15000;var timeoutId;var style=document.createElement('style');style.id='apollo-form-prehide-css';style.textContent='form:has(input[type="email" i]),form:has(input[name="email" i]),.hs-form-iframe{position:relative!important}form:has(input[type="email" i])::before,form:has(input[name="email" i])::before,.hs-form-iframe::before{content:"";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:50px;height:50px;margin:auto;border:2.5px solid #e1e1e1;border-top:2.5px solid #9ea3a6;border-radius:50%;animation:spin 1s linear infinite;background-color:transparent;pointer-events:auto;z-index:999999;opacity:1}form:has(input[type="email" i]) *,form:has(input[name="email" i]) *,.hs-form-iframe *{opacity:0!important;user-select:none!important;pointer-events:none!important}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';(document.head || document.documentElement).appendChild(style);function cleanup(){var styleEl=document.getElementById('apollo-form-prehide-css');if(styleEl)styleEl.remove();if(timeoutId)clearTimeout(timeoutId);}timeoutId=setTimeout(function(){console.warn('[Apollo] Form enrichment timeout after 5s - revealing forms. Check network and console for errors.');cleanup();},TIMEOUT_MS);var nocache=Math.random().toString(36).substring(7);var script=document.createElement('script');script.src='https://assets.apollo.io/js/apollo-inbound.js?nocache=' + nocache;script.defer=true;script.onerror=function(){console.error('[Apollo] Failed to load form enrichment script');cleanup();};script.onload=function(){try{window.ApolloInbound.formEnrichment.init({appId: '6a28e16fc77cc3000cb78b76',onReady: function(){cleanup();},onError: function(err){console.error('[Apollo] Form enrichment init error:',err);cleanup();}});}catch(err){console.error('[Apollo] Error initializing form enrichment:',err);cleanup();}};document.head.appendChild(script);})();`}
        </Script>
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
