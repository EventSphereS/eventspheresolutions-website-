import Link from 'next/link'
import PricingToggle from '@/components/PricingToggle'
import PricingQuiz from '@/components/PricingQuiz'

export const metadata = {
  title: 'Pricing | Event Sphere Solutions',
  description: 'Simple, transparent pricing for restaurants, bars, venues, and hotels. Start free for 30 days.',
}

export default function PricingPage() {
  return (
    <>
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
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-sm text-gray-300">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Cancel anytime
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
          <div className="bg-gradient-to-r from-[#6a256f] to-[#222123] rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="text-6xl">🏛️</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold font-display">360° Virtual Tour Add-On</h3>
                <span className="bg-[#E07B20] text-white text-xs font-bold px-3 py-1 rounded-full">Popular</span>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Let prospects virtually walk through your space before they ever pick up the phone.
                Immersive 360° tours increase booking inquiries by giving clients the confidence to commit.
                Available for any tier.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                {[
                  'Professional 360° photography',
                  'Hosted & embedded in your portal',
                  'Mobile & desktop compatible',
                  'Unlimited views, no extra fees',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#E07B20]">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center shrink-0">
              <p className="text-gray-300 text-sm mb-4 max-w-[180px]">Pricing depends on your venue size & setup. Let's chat.</p>
              <Link href="/contact" className="btn-primary block text-center text-sm">
                Let's Discuss →
              </Link>
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
                    <div>Venue Essentials</div>
                    <div className="text-[#E07B20] font-bold">$149/mo</div>
                  </th>
                  <th className="p-5 text-center bg-[#E07B20]/5 border-x border-[#E07B20]/20">
                    <div className="text-[#222123] font-bold">Revenue Growth</div>
                    <div className="text-[#E07B20] font-bold">$259/mo</div>
                  </th>
                  <th className="p-5 text-center text-[#222123] font-bold">
                    <div>Portfolio</div>
                    <div className="text-[#E07B20] font-bold">Contact Us</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  // — Plan limits —
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
                  { feature: 'Cross-location revenue analytics', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Email campaigns', e: '1,000/mo', g: '2,500/mo', p: '5,000/mo per location' },
                  { feature: 'Email campaign analytics', e: '✓', g: '✓', p: '✓' },
                  { feature: 'Promo codes', e: '2 active', g: '3/month', p: '6/month per location' },
                  { feature: 'Support', e: 'Email', g: 'Priority', p: 'Dedicated' },
                  // — Revenue Growth+ —
                  { feature: 'Automated email follow-up', e: '—', g: '✓', p: '✓' },
                  { feature: 'AI email support', e: '—', g: '—', p: '✓' },
                  { feature: 'Revenue forecasting dashboard', e: '—', g: '✓', p: '✓' },
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
              { q: 'Is the 30-day trial really free?', a: 'Yes. No credit card required. You get full access to your chosen tier for 30 days. If you love it, you stay. If not, you walk away with no charge.' },
              { q: 'Can I change plans later?', a: 'Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately. Downgrades take effect at the next billing cycle.' },
              { q: 'What does "per location" mean?', a: 'Each physical venue or location is billed separately. If you have multiple locations, each gets its own dashboard and tools. The Portfolio tier gives you a centralized view across all of them.' },
              { q: 'What is the OpenTable integration?', a: "We're actively working on OpenTable integration. It's coming to Revenue Growth and Portfolio tiers. Existing customers will get it added automatically at no extra charge when it's live." },
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
              Choose How You Want to Start
            </h2>
            <p className="text-gray-300 text-lg">
              Two ways to grow your private event revenue — pick what fits your business best.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* V1 */}
            <div className="bg-white rounded-2xl p-8 flex flex-col">
              <div className="inline-block bg-[#E07B20] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest w-fit">
                V1 — Full Service
              </div>
              <h3 className="text-2xl font-bold font-display text-[#6a256f] mb-2">Sphere + Expert Sales Team</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                We do it all. Our expert sales team handles your private event inquiries, follow-ups, proposals, and closings — while you focus on running your venue. Best for businesses that want hands-on support from day one.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'Full platform access',
                  'Dedicated expert sales team',
                  'Lead handling & follow-up',
                  'Proposal & contract management',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-[#E07B20] font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-100 pt-6">
                <div className="text-[#E07B20] font-bold text-sm mb-4">First month free</div>
                <Link href="/contact"
                  className="w-full bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all text-center block">
                  Get Started with V1 →
                </Link>
              </div>
            </div>

            {/* V2 */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-8 flex flex-col">
              <div className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest w-fit">
                V2 — Sphere
              </div>
              <h3 className="text-2xl font-bold font-display text-white mb-2">Sphere</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                The full Sphere platform in your hands. Capture leads, send proposals, manage your calendar, run email campaigns, and track every booking — no sales team needed. Best for venues with an existing sales team or owner-operators who want the tools.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'Full platform access',
                  'Lead capture & pipeline',
                  'Proposals, BEOs & invoices',
                  'Email campaigns & smart calendar',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-[#E07B20] font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-6">
                <div className="text-[#E07B20] font-bold text-sm mb-4">3 months free</div>
                <Link href="/founding-partner"
                  className="w-full bg-white text-[#6a256f] font-bold py-3.5 rounded-xl hover:bg-gray-100 transition-all text-center block">
                  Get Started with V2 →
                </Link>
              </div>
            </div>
          </div>
          <p className="text-white/40 text-xs text-center mt-8">Cancel anytime</p>
        </div>
      </section>
    </>
  )
}
