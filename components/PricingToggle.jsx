import Link from 'next/link'

const plans = [
  {
    name: 'Venue Essentials',
    tagline: 'Organize sales. Capture demand. Convert faster.',
    price: { monthly: 149, annual: 124 },
    target: 'Independent restaurants & small event venues',
    highlight: false,
    badge: null,
    features: [
      'Branded lead capture forms',
      'Visual sales pipeline',
      'Event calendar & conflict prevention',
      'Branded proposal & contract templates',
      'Digital agreements & e-signature',
      'Online payment collection',
      'Task reminders & notifications',
      'Reporting dashboard',
      'Internal team chatbox',
      'Email campaigns (1,000/mo)',
      'Email campaign analytics',
      'Promo codes (2 active)',
      'Guest review & feedback collection',
      '360° Virtual Tour (Add-On)',
      'Mobile app access (Coming Soon)',
      'OpenTable integration (Coming Soon)',
    ],
    limits: '1 location · 2 users (+$15/extra)',
    support: 'Email support',
    cta: 'Start Free Trial',
  },
  {
    name: 'Revenue Growth',
    tagline: 'Automate follow-up. Market smarter. Forecast revenue.',
    price: { monthly: 259, annual: 215 },
    target: 'High-volume venues focused on driving bookings',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Everything in Venue Essentials',
      'Automated email follow-up sequences',
      'Revenue forecasting dashboard',
      'Conversion tracking (lead → booked)',
      'Branded client portal',
      'Email campaigns (2,500/mo)',
      'Email campaign analytics',
      'Promo codes (3/month)',
      'Guest review & feedback collection',
      '360° Virtual Tour (Add-On)',
      'SMS credit bundle (Coming Soon)',
      'OpenTable integration (Coming Soon)',
    ],
    limits: '1 location · 5 users (+$15/extra)',
    support: 'Priority support',
    cta: 'Start Free Trial',
  },
  {
    name: 'Portfolio',
    tagline: 'Centralized visibility. Performance accountability. Scalable growth.',
    price: null,
    target: 'Venue groups & hospitality portfolios',
    highlight: false,
    badge: 'Enterprise',
    features: [
      'Everything in Revenue Growth',
      'Sales rep performance tracking',
      'Commission tracking',
      'Advanced analytics & forecasting',
      'Custom workflow builder',
      'API access',
      'Dedicated onboarding manager',
      'Advanced role permissions',
      'Email campaigns (5,000/mo per location)',
      'Email campaign analytics',
      'Promo codes (6/month per location)',
      'AI email support',
      'Guest review & feedback collection',
      '360° Virtual Tour (Add-On)',
      'OpenTable integration (Coming Soon)',
    ],
    limits: 'Multiple locations · Multiple users',
    support: 'Dedicated onboarding + strategic reviews',
    cta: 'Contact Sales',
  },
]

export default function PricingToggle() {
  return (
    <>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
              plan.highlight
                ? 'border-[#E07B20] shadow-xl shadow-[#E07B20]/10 scale-105'
                : 'border-gray-200 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Header */}
            <div className={`p-6 ${plan.highlight ? 'bg-[#E07B20]' : 'bg-white'}`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className={`font-bold font-display text-xl ${plan.highlight ? 'text-white' : 'text-[#222123]'}`}>
                  {plan.name}
                </h3>
                {plan.badge && (
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    plan.highlight
                      ? 'bg-white text-[#E07B20]'
                      : plan.badge === 'Enterprise'
                      ? 'bg-[#6a256f] text-white'
                      : 'bg-[#E07B20] text-white'
                  }`}>
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className={`text-sm mb-5 leading-snug ${plan.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                {plan.tagline}
              </p>
              {plan.price ? (
                <>
                  <div className="flex items-end gap-1">
                    <span className={`text-5xl font-bold font-display ${plan.highlight ? 'text-white' : 'text-[#222123]'}`}>
                      ${plan.price.monthly}
                    </span>
                    <span className={`text-sm mb-2 ${plan.highlight ? 'text-white/70' : 'text-gray-400'}`}>/mo</span>
                  </div>
                  <p className={`text-xs mt-2 ${plan.highlight ? 'text-white/70' : 'text-gray-500'}`}>
                    per location · {plan.limits}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-end gap-1">
                    <span className={`text-3xl font-bold font-display ${plan.highlight ? 'text-white' : 'text-[#222123]'}`}>
                      Contact Us
                    </span>
                  </div>
                  <p className={`text-xs mt-2 ${plan.highlight ? 'text-white/70' : 'text-gray-500'}`}>
                    {plan.limits}
                  </p>
                </>
              )}
            </div>

            {/* Features */}
            <div className="bg-white p-6">
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className={`mt-0.5 shrink-0 font-bold ${f.includes('Coming Soon') ? 'text-orange-400' : 'text-[#E07B20]'}`}>
                      {f.includes('Coming Soon') ? '○' : '✓'}
                    </span>
                    <span className={
                      f.includes('Everything in') ? 'text-[#6a256f] font-bold' :
                      f.includes('Coming Soon') ? 'text-gray-400' : ''
                    }>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <span className="text-[#E07B20]">🎧</span> {plan.support}
                </p>
              </div>

              <Link
                href="/contact"
                className={`w-full text-center block font-bold py-3.5 rounded-full transition-all text-sm ${
                  plan.highlight
                    ? 'bg-[#E07B20] text-white hover:bg-[#e08a20]'
                    : 'border-2 border-[#E07B20] text-[#E07B20] hover:bg-[#E07B20] hover:text-white'
                }`}
              >
                {plan.cta} →
              </Link>
              <p className="text-center text-xs text-gray-400 mt-3">Cancel anytime</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
