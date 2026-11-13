import Link from 'next/link'
import V1V2CTA from '@/components/V1V2CTA'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is there an alternative to Tripleseat for restaurants and venues?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Sphere by Event Sphere Solutions is a private event sales platform built for restaurants, bars, boutique hotels and sports venues, with the option to add a dedicated sales team on top of the software.',
      },
    },
    {
      '@type': 'Question',
      name: "How does Sphere's pricing compare to Tripleseat?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Sphere publishes its pricing: $149/month for Essentials, $259/month for Growth. Tripleseat doesn't publish pricing publicly — quotes we've seen start around $300/month, so confirm directly with their sales team for a current number.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Sphere help migrate from Tripleseat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, free on every plan — Sphere moves your contacts, leads, events and history over from Tripleseat (or anywhere else) so you don't start from zero.",
      },
    },
  ],
}

const rows = [
  {
    label: 'Built for',
    sphere: 'Restaurants, bars & breweries, boutique hotels, catering & private chefs, sports venues',
    tripleseat: 'Restaurants, unique venues and hotels',
  },
  {
    label: 'Starting price',
    sphere: '$149/mo (Essentials), published',
    tripleseat: "Not published — quotes we've seen start around $300/mo, confirm directly with their sales team",
  },
  {
    label: 'Proposals, BEOs & contracts',
    sphere: 'Auto-generated, e-signature + deposit in one link',
    tripleseat: 'Built into every plan, auto-generated, updates in real time',
  },
  {
    label: 'Lead capture',
    sphere: 'Website/social capture forms, auto-routes and auto-responds to inquiries',
    tripleseat: 'Website/social capture forms, auto-routes and auto-responds to inquiries',
  },
  {
    label: 'Lead generation',
    sphere: "Every venue gets a free listing on privateeventvenue.com, Event Sphere Solutions' own lead-gen directory",
    tripleseat: '—',
  },
  {
    label: 'Client-facing portal',
    sphere: 'Live client-branded portal — view and download BEOs, sign, and pay',
    tripleseat: 'Client planning portal for viewing BEOs, signing, and paying',
  },
  {
    label: 'Full-service option',
    sphere: 'Optional dedicated sales team (Sphere + Sales Team) handles leads for you',
    tripleseat: 'Software only',
  },
  {
    label: 'Data migration',
    sphere: 'Free migration from Tripleseat, spreadsheets or anywhere else',
    tripleseat: '—',
  },
  {
    label: 'Scale',
    sphere: 'New, Phoenix-based, Founding Partner program',
    tripleseat: "20,000+ venues (per Tripleseat's own site)",
  },
]

export const metadata = {
  title: 'Event Sphere Solutions vs. Tripleseat: Private Event Software Compared',
  description: "How Event Sphere Solutions' Sphere platform compares to Tripleseat for restaurants, bars and venues — pricing, features and what's different. Last checked November 2026.",
  openGraph: {
    title: 'Sphere vs. Tripleseat: Private Event Software Compared',
    description: "Pricing, features and what's different between Sphere and Tripleseat for restaurants, bars and venues.",
    images: [{ url: '/feature-image.png', width: 1200, height: 630, alt: 'Sphere vs. Tripleseat comparison' }],
  },
}

export default function SphereVsTripleseatPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-4">Compare</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#6a256f] leading-tight mb-6">
            Sphere vs. Tripleseat
          </h1>
          <p className="text-gray-400 text-sm italic">
            Last checked November 2026. Pricing and features are based on each company's own published pages — contact either company directly to confirm current details before you decide.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 pr-4 text-gray-400 font-semibold uppercase text-xs tracking-wide w-1/4"></th>
                <th className="text-left py-4 px-4 text-[#6a256f] font-bold text-base">Sphere (Event Sphere Solutions)</th>
                <th className="text-left py-4 px-4 text-gray-600 font-bold text-base">Tripleseat</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-gray-100">
                  <td className="py-4 pr-4 font-semibold text-gray-700 align-top">{r.label}</td>
                  <td className="py-4 px-4 text-gray-600 align-top">{r.sphere}</td>
                  <td className="py-4 px-4 text-gray-500 align-top">{r.tripleseat}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="https://crm.eventspheresolutions.com/signup" target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-3.5">
              Start Free →
            </a>
            <Link href="/pricing" className="btn-outline text-base px-8 py-3.5">
              See full Sphere pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-t border-gray-100">
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
