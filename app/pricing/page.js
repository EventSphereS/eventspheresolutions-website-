import Link from 'next/link'
import Image from 'next/image'
import PricingToggle from '@/components/PricingToggle'
import PricingQuiz from '@/components/PricingQuiz'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the 30-day trial really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. No credit card required. You get full access to your chosen tier for 30 days. If you love it, you stay. If not, you walk away with no charge.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I change plans later?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately. Downgrades take effect at the next billing cycle.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does "per location" mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each physical venue or location is billed separately. If you have multiple locations, each gets its own dashboard and tools. The Sphere Hospitality tier gives you a centralized view across all of them.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Sphere cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sphere Essentials starts at $149/month. Sphere Growth is $259/month. Sphere Hospitality is custom pricing for multi-location groups. Founding Partners get 3 months completely free.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you help migrate our existing data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — full migration is completely free on every plan. We move your contacts, leads, events, and history from Tripleseat, Gather, spreadsheets, or wherever you currently live. You don\'t lift a finger.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are payments processed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We partner with Stripe, the industry-leading payment platform, to process all payments securely. Your subscription billing and the online payments and deposits you collect from your clients are handled through Stripe — so card data is encrypted and PCI-compliant, and you never have to manage sensitive payment information yourself.',
      },
    },
  ],
}

export const metadata = {
  title: 'Pricing | Sphere Private Event Sales Platform',
  description: 'Simple, transparent pricing for restaurants, bars, and venues. Start free — 3 months for Founding Partners. Plans that scale with your private event sales.',
  openGraph: {
    title: 'Pricing | Sphere Private Event Sales Platform',
    description: 'Simple pricing for restaurants, bars, and venues. Start free — 3 months for Founding Partners.',
    images: [{ url: '/feature-image.png', width: 1200, height: 630, alt: 'Sphere Pricing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | Sphere Private Event Sales Platform',
    description: 'Simple pricing for restaurants, bars, and venues. Start free — 3 months for Founding Partners.',
    images: ['/feature-image.png'],
  },
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-[#6a256f] to-[#222123] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          {/* BETA Badge */}
          <span className="inline-block bg-[#E07B20] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            Beta — Limited Spots Available
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight mb-6">
            Pricing That Pays For Itself
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Our clients average a{' '}
            <span className="text-[#E07B20] font-bold text-2xl">189% increase</span>{' '}
            in event sales within 90 days. At these prices, the ROI is immediate.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-sm text-gray-300">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Cancel anytime
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-sm text-gray-300">
              <span className="w-2 h-2 bg-[#E07B20] rounded-full"></span>
              Free full migration included
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <PricingQuiz />
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <PricingToggle />
        </div>
      </section>

      {/* 360 Tour Add-on */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#6a256f] to-[#222123] rounded-2xl overflow-hidden text-white">
            <div className="flex flex-col md:flex-row items-center gap-0">

              {/* Left — text */}
              <div className="flex-1 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold font-display">360° Virtual Tour Add-On</h3>
                  <span className="bg-[#E07B20] text-white text-xs font-bold px-3 py-1 rounded-full shrink-0">Popular</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Let clients explore your venue before they ever visit. Immersive 360° tours embedded directly
                  in your booking flow — so prospects can walk every room, visualize their event, and book with
                  confidence. Available for any tier.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300 mb-8">
                  {[
                    'Professional 360° photography',
                    'Hosted & embedded in your portal',
                    'Mobile, desktop & VR headsets',
                    'Unlimited views, no extra fees',
                    'Higher booking confidence',
                    'Fewer "can we see the space?" calls',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#F99F33]/20 text-[#F99F33] font-bold text-[10px] flex items-center justify-center shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link href="/contact" className="btn-primary text-sm shrink-0">
                    Let's Discuss →
                  </Link>
                  <p className="text-gray-400 text-xs">Pricing depends on your venue size & setup.</p>
                </div>
              </div>

              {/* Right — phone mockup */}
              <div className="relative shrink-0 flex items-end justify-center md:justify-end w-full md:w-auto px-8 md:px-0 pb-8 md:pb-0 md:pr-10">
                <div className="relative">
                  <Image
                    src="/images/360-phone-mockup.png"
                    alt="360° Virtual Tour on mobile"
                    width={260}
                    height={260}
                    quality={100}
                    className="h-auto object-contain drop-shadow-2xl max-h-64 md:max-h-72"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#F99F33] text-white font-extrabold font-display text-sm px-4 py-2 rounded-full shadow-lg shadow-[#F99F33]/30 whitespace-nowrap">
                    360° Immersive
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Side by Side</p>
            <h2 className="section-title">Compare Plans</h2>
            <p className="section-subtitle">Everything you need to know, side by side.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100">
            <table className="w-full bg-white text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-5 text-[#222123] font-bold w-2/5">Feature</th>
                  <th className="p-5 text-center text-[#222123] font-bold">
                    <div>Sphere Essentials</div>
                    <div className="text-[#E07B20] font-bold">$149/mo</div>
                  </th>
                  <th className="p-5 text-center bg-[#E07B20]/5 border-x border-[#E07B20]/20">
                    <div className="text-[#222123] font-bold">Sphere Growth</div>
                    <div className="text-[#E07B20] font-bold">$259/mo</div>
                  </th>
                  <th className="p-5 text-center text-[#222123] font-bold">
                    <div>Sphere Hospitality</div>
                    <div className="text-[#E07B20] font-bold">Contact Us</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  // — Plan limits —
                  { feature: 'Free data migration', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Locations', e: '1', g: '1', p: 'Multiple' },
                  { feature: 'Users', e: '2 (+$15 each)', g: '5 (+$15 each)', p: 'Multiple' },
                  // — Included in all —
                  { feature: 'Branded lead capture forms', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Visual sales pipeline', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Event calendar & conflict prevention', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Branded proposals & contracts', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Digital agreements & e-signature', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Online payment collection', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Task reminders & notifications', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Reporting dashboard', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Internal team chatbox', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Multi-location dashboard', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Cross-location sales analytics', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Email campaigns', e: '1,000/mo', g: '2,500/mo', p: '5,000/mo per location' },
                  { feature: 'Email campaign analytics', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Promo codes', e: '2 active', g: '3/month', p: '6/month per location' },
                  { feature: 'Support', e: 'Email', g: 'Priority', p: 'Dedicated' },
                  // — Revenue Growth+ —
                  { feature: 'Leads call system', e: '—', g: '✓', p: '✓' },
                  { feature: 'Automated email follow-up', e: '—', g: '✓', p: '✓' },
                  { feature: 'AI email support', e: '—', g: '—', p: '✓' },
                  { feature: 'Sales forecasting dashboard', e: '—', g: '✓', p: '✓' },
                  { feature: 'Conversion tracking (lead → booked)', e: '—', g: '✓', p: '✓' },
                  { feature: 'Branded client portal', e: '—', g: '✓', p: '✓' },
                  // — Portfolio only —
                  { feature: 'Sales rep performance tracking', e: '—', g: '—', p: '✓' },
                  { feature: 'Commission tracking', e: '—', g: '—', p: '✓' },
                  { feature: 'Custom workflow builder', e: '—', g: '—', p: '✓' },
                  { feature: 'API access', e: '—', g: '—', p: '✓' },
                  { feature: 'Dedicated onboarding manager', e: '—', g: '—', p: '✓' },
                  { feature: 'Strategic review sessions', e: '—', g: '—', p: '✓' },
                  // — Coming Soon —
                  { feature: '360° Virtual Tour', e: 'Add-On', g: 'Add-On', p: 'Add-On' },
                  { feature: 'Guest review & feedback collection', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Mobile app access', e: 'Coming Soon', g: 'Coming Soon', p: 'Coming Soon' },
                  { feature: 'SMS credit bundle', e: '—', g: 'Coming Soon', p: 'Coming Soon' },
                  { feature: 'OpenTable integration', e: 'Coming Soon', g: 'Coming Soon', p: 'Coming Soon' },
                ].map((row, i) => (
                  <tr key={row.feature} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4 text-gray-700 font-medium">{row.feature}</td>
                    <td className={`p-4 text-center ${row.e === 'Coming Soon' ? 'text-orange-400 text-xs font-medium' : row.e === 'Add-On' ? 'text-[#6a256f] text-xs font-bold' : 'text-gray-600'}`}>{row.e}</td>
                    <td className={`p-4 text-center bg-[#E07B20]/5 border-x border-[#E07B20]/10 ${row.g === 'Coming Soon' ? 'text-orange-400 text-xs font-medium' : row.g === 'Add-On' ? 'text-[#6a256f] text-xs font-bold' : 'text-gray-600'}`}>{row.g}</td>
                    <td className={`p-4 text-center ${row.p === 'Coming Soon' ? 'text-orange-400 text-xs font-medium' : row.p === 'Add-On' ? 'text-[#6a256f] text-xs font-bold' : 'text-gray-600'}`}>{row.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title font-display tracking-tight text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Do you help migrate our existing data?', a: "Yes — full migration is completely free on every plan. We move your contacts, leads, events, and history from Tripleseat, Gather, spreadsheets, or wherever you currently live. You don't lift a finger." },
              { q: 'Is the 30-day trial really free?', a: 'Yes. No credit card required. You get full access to your chosen tier for 30 days. If you love it, you stay. If not, you walk away with no charge.' },
              { q: 'Can I change plans later?', a: 'Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately. Downgrades take effect at the next billing cycle.' },
              { q: 'What does "per location" mean?', a: 'Each physical venue or location is billed separately. If you have multiple locations, each gets its own dashboard and tools. The Sphere Hospitality tier gives you a centralized view across all of them.' },
              { q: 'What is the OpenTable integration?', a: "We're actively working on OpenTable integration. It's coming to Sphere Growth and Sphere Hospitality tiers. Existing customers will get it added automatically at no extra charge when it's live." },
              { q: 'How are payments processed?', a: 'We partner with Stripe, the industry-leading payment platform, to process all payments securely. Your subscription billing and the online payments and deposits you collect from your clients are handled through Stripe — so card data is encrypted and PCI-compliant, and you never have to manage sensitive payment information yourself.' },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-[#222123] mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#6a256f]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-white mb-4">
              Start with Sphere. Add What You Need.
            </h2>
            <p className="text-gray-300 text-lg">
              Sphere is the platform every venue starts with — then enhance it with a sales team or AI.
            </p>
          </div>

          {/* Sphere — Primary */}
          <div className="bg-white rounded-2xl p-8 mb-6 shadow-xl shadow-black/10">
            <div className="inline-block bg-[#E07B20] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              The Platform
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <h3 className="text-3xl font-extrabold font-display text-[#1a0f40] mb-1">Sphere</h3>
                <p className="text-[#6a256f] font-semibold text-sm mb-3">Your complete private event sales platform.</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  Everything your venue needs to capture leads, send proposals, manage your calendar, run email campaigns, and track every booking — all in one place.
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {['Lead capture & pipeline', 'Proposals, BEOs & invoices', 'Smart calendar & conflict prevention', 'Email campaigns & promo codes', 'Online payments & e-signatures', 'Reporting dashboard'].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-[#E07B20] font-bold text-base">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 text-center min-w-[200px]">
                <Link href="/founding-partner"
                  className="block bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-all text-center text-base shadow-lg shadow-[#6a256f]/30">
                  Get Sphere Free →
                </Link>
                <p className="text-gray-400 text-xs mt-2">Cancel anytime</p>
                <p className="text-[#E07B20] font-bold text-xs mt-1">
                  <Link href="/founding-partner" className="hover:underline">3 months free — Founding Partner Program</Link>
                </p>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest text-center mb-6">Enhance Sphere With</p>
          <div className="grid md:grid-cols-2 gap-5">

            {/* Sphere + Sales Team */}
            <div className="relative rounded-2xl p-px overflow-hidden" style={{ background: 'linear-gradient(135deg, #E07B20, #EF4561, #6a256f)' }}>
              <div className="relative bg-[#4a1555] rounded-2xl p-7 flex flex-col h-full">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(224,123,32,0.25) 0%, transparent 70%)', filter: 'blur(30px)' }} />
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E07B20] to-[#EF4561] flex items-center justify-center text-2xl shadow-lg shadow-[#E07B20]/30">
                    🎯
                  </div>
                  <span className="bg-[#E07B20] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Add-On</span>
                </div>
                <h4 className="text-xl font-extrabold font-display text-white mb-2">Sphere + Sales Team</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-5">A dedicated expert sales team handles every inquiry, follow-up, proposal, and close — on your behalf.</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {['Every lead captured & followed up', 'Proposals written & sent for you', 'Closes deals while you run your venue'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="text-[#E07B20] font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className="w-full bg-gradient-to-r from-[#E07B20] to-[#EF4561] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all text-sm text-center shadow-lg shadow-[#E07B20]/30">
                  Contact Us →
                </Link>
              </div>
            </div>

            {/* Sphere AI */}
            <div className="relative rounded-2xl p-px overflow-hidden" style={{ background: 'linear-gradient(135deg, #6a256f, #EF4561, #9b3aa0)' }}>
              <div className="relative bg-[#2d0a35] rounded-2xl p-7 flex flex-col h-full">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(239,69,97,0.25) 0%, transparent 70%)', filter: 'blur(30px)' }} />
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EF4561] to-[#6a256f] flex items-center justify-center text-2xl shadow-lg shadow-[#EF4561]/30">
                    ✨
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-white/10 text-white/70 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Coming Soon</span>
                  </div>
                </div>
                <h4 className="text-xl font-extrabold font-display text-white mb-2">Sphere AI</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-5">Layer AI automation on Sphere — so your venue captures leads, follows up, and books events 24/7 without lifting a finger.</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {['Automated lead capture & replies', 'Smart follow-up sequences', '24/7 booking workflows'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="text-[#EF4561] font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className="w-full bg-white/10 border border-white/20 text-white font-bold py-3.5 rounded-xl hover:bg-white/20 transition-all text-sm text-center">
                  Join the Waitlist →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
