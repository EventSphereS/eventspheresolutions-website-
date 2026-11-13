import Link from 'next/link'
import V1V2CTA from '@/components/V1V2CTA'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a banquet event order (BEO)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A banquet event order is the internal document a restaurant, bar or venue uses to run a private event — room setup, timing, menu, staffing, AV and any special requests, all in one place so every department works from the same information.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Sphere generate banquet event orders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sphere generates a polished, on-brand BEO automatically from the details already captured in the proposal and booking — no re-typing event specs into a separate document or spreadsheet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize the BEO template?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — BEOs are branded to your venue and can be generated in seconds for any booking, from a small private dining room to a full buyout.',
      },
    },
  ],
}

export const metadata = {
  title: 'Banquet Event Order Software | Sphere by Event Sphere Solutions',
  description: 'Generate polished, on-brand banquet event orders in one click. Sphere pulls event details straight from the booking — no re-typing, no spreadsheets.',
  openGraph: {
    title: 'Banquet Event Order Software | Sphere',
    description: 'Generate polished, on-brand banquet event orders in one click, straight from your bookings.',
    images: [{ url: '/feature-image.png', width: 1200, height: 630, alt: 'Sphere banquet event order software' }],
  },
}

export default function BanquetEventOrdersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="pt-28 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-4">Sphere — Document Generation</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#6a256f] leading-tight mb-6">
            Banquet event order software built for restaurants and venues.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-2xl">
            A banquet event order (BEO) is how your kitchen, floor and events team all work off the same page for a private event — room setup, timing, menu, staffing and AV. Sphere generates yours automatically from the booking, so nobody re-types event specs into a separate document.
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
            What's on a Sphere banquet event order.
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
            {[
              'Room, setup style and guest count',
              'Menu, courses and dietary notes',
              'Timing — arrival, service and end time',
              'Staffing and AV requirements',
              'Deposit and payment status, synced from the proposal',
              'Branded to your venue, generated in one click',
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
