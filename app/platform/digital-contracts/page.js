import Link from 'next/link'
import V1V2CTA from '@/components/V1V2CTA'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can clients sign a private event contract online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Sphere sends a branded proposal with a built-in e-signature, so a client can review and sign a private event contract from their phone or laptop without printing, scanning or a separate e-signature tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I collect the deposit at the same time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. The signature and the deposit happen in the same link, processed through Stripe, so the contract and the payment land together instead of two separate back-and-forth steps.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is the e-signature legally binding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Sphere's e-signature captures a timestamped, attributable signature on the exact document the client reviewed. For questions about what's enforceable in your state, check with your own counsel — we don't give legal advice.",
      },
    },
  ],
}

export const metadata = {
  title: 'Digital Event Contracts & E-Signatures | Sphere by Event Sphere Solutions',
  description: 'Send a branded private event contract, collect the e-signature and process the deposit — all in one link. No printing, no separate e-signature tool.',
  openGraph: {
    title: 'Digital Event Contracts & E-Signatures | Sphere',
    description: 'One link: a branded contract, an e-signature, and the deposit — done.',
    images: [{ url: '/feature-image.png', width: 1200, height: 630, alt: 'Sphere digital contracts and e-signatures' }],
  },
}

export default function DigitalContractsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="pt-28 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-4">Sphere — Proposals &amp; Payments</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#6a256f] leading-tight mb-6">
            Digital contracts and e-signatures for private events.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-2xl">
            Send a stunning, branded proposal, collect the e-signature, and process the deposit — all in a single link. No back-and-forth, no chasing down a printed contract. Payments run through Stripe, so every transaction is secure and PCI-compliant.
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
            How it works.
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
            {[
              'One branded link — proposal, contract and payment together',
              'Client signs from any device, no account needed',
              'Deposit collected the moment the contract is signed',
              'Signed contract and payment status sync automatically to the booking',
              'Secure, PCI-compliant payments powered by Stripe',
              'No printing, scanning or separate e-signature tool',
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
