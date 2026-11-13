import Link from 'next/link'
import V1V2CTA from '@/components/V1V2CTA'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Sphere prevent double-booking a room?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sphere holds a room or space the moment a booking is confirmed, so the same slot can\'t be offered to a second client by mistake — across every room, every date, in one shared calendar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I see leads and confirmed bookings in the same view?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — the calendar shows your pipeline of open inquiries alongside confirmed events, so nothing slips through while a date is still being negotiated.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the calendar work across multiple rooms or locations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Single-location venues get one shared calendar across all their private rooms and patios; multi-location groups on the Sphere Hospitality plan get a centralized view across every location.',
      },
    },
  ],
}

export const metadata = {
  title: 'Venue & Event Calendar Management Software | Sphere',
  description: 'A shared calendar that protects every room and every date — zero double bookings, zero missed leads, across your whole team.',
  openGraph: {
    title: 'Venue & Event Calendar Management Software | Sphere',
    description: 'Zero double bookings. Zero missed leads. One calendar for every room and every lead.',
    images: [{ url: '/feature-image.png', width: 1200, height: 630, alt: 'Sphere venue calendar management' }],
  },
}

export default function VenueCalendarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="pt-28 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-4">Sphere — Calendar &amp; Leads</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#6a256f] leading-tight mb-6">
            Venue calendar management without the double bookings.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-2xl">
            A smart calendar that protects every slot, and a pipeline that captures every inquiry — in the same view. Nothing slips through the cracks, whether it's a confirmed event or a lead you're still negotiating with.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://crm.eventspheresolutions.com/signup" target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-3.5">
              Start Free →
            </a>
            <Link href="/platform" className="btn-outline text-base px-8 py-3.5">
              See the full platform
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-[#111827] mb-10">
            What the calendar handles.
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
            {[
              'Every room and patio in one shared calendar',
              'Automatic conflict prevention — no overlapping bookings',
              'Open leads and confirmed events in the same view',
              'Centralized view across locations on Sphere Hospitality',
              'Synced with proposals, contracts and BEOs for each date',
              'Built for restaurants, bars, hotels and event venues',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 text-gray-600 text-base">
                <span className="text-[#6a256f] font-bold mt-0.5">✓</span>
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-[#111827] mb-10">
            Frequently asked questions.
          </h2>
          <div className="space-y-8">
            {faqSchema.mainEntity.map((f) => (
              <div key={f.name}>
                <h3 className="font-bold text-[#6a256f] text-lg mb-2">{f.name}</h3>
                <p className="text-gray-500 leading-relaxed">{f.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <V1V2CTA />
    </>
  )
}
