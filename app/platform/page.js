import Link from 'next/link'
import Image from 'next/image'
import FeatureSlider from '@/components/FeatureSlider'

const SIGNUP_URL = 'https://crm.eventspheresolutions.com/signup'

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SPHERE',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description: 'SPHERE takes every large group event inquiry, semi-private and fully private, from first message to a signed, deposited event, in one pipeline. Built for hospitality businesses.',
  offers: [
    {
      '@type': 'Offer',
      name: 'SPHERE Essentials',
      price: '149',
      priceCurrency: 'USD',
      priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' },
    },
    {
      '@type': 'Offer',
      name: 'SPHERE Growth',
      price: '259',
      priceCurrency: 'USD',
      priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' },
    },
  ],
  url: 'https://eventspheresolutions.com/platform',
}

export const metadata = {
  title: 'SPHERE | Large Group Event Sales, In One Place',
  description: 'SPHERE takes every large group inquiry, semi-private and fully private, from first message to a signed, deposited event, in one pipeline. Built for hospitality businesses, not big hotel chains.',
  openGraph: {
    title: 'SPHERE | Large Group Event Sales, In One Place',
    description: 'Your large group events book revenue. Your inbox loses the leads. SPHERE puts every inquiry in one pipeline, from first message to deposit.',
    images: [{ url: '/feature-image.png', width: 1200, height: 630, alt: 'SPHERE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPHERE | Large Group Event Sales, In One Place',
    description: 'Every large group inquiry in one pipeline, from first message to deposit. Built for hospitality.',
    images: ['/feature-image.png'],
  },
}

const stats = [
  { value: 'Up to 20 hrs/week', label: 'Save labor', desc: 'One pipeline instead of three inboxes and a spreadsheet.' },
  { value: '5-star experience', label: 'Better client experience', desc: 'Fast replies and a proposal that looks sharp, every time.' },
  { value: 'Up to 189% more', label: 'Make more revenue', desc: 'No lead sits long enough to book somewhere else.' },
]

const audiences = [
  {
    label: 'Bars & restaurants',
    image: '/images/who-bars-restaurants.jpg',
    headline: 'Your bar and dining room book large group events. Your inbox loses them.',
    points: ['Every inquiry lands in one place', 'Your private room, patio or bar on one calendar', 'Deposit in before the date is locked'],
  },
  {
    label: 'Breweries & wineries',
    image: '/images/who-breweries-wineries.jpg',
    headline: 'Your taproom or tasting room is the party spot. Is your booking process?',
    points: ['Every group inquiry tracked from first message', 'Packages and pricing in a branded proposal', 'Follow-up that never forgets'],
  },
  {
    label: 'Boutique hotels',
    image: '/images/who-boutique-hotels.jpg',
    headline: "Rooms are handled. Who's handling the event inquiries?",
    points: ['Every event lead tracked from first contact', "Proposals branded in your hotel's look", 'BEOs your whole team can actually use'],
  },
  {
    label: 'Sports & entertainment venues',
    image: '/images/who-sports-entertainment.jpg',
    headline: 'Suites, buyouts and group nights deserve their own pipeline.',
    points: ['Every group and suite inquiry in one view', 'Multi-space calendars for suites and lounges', 'E-signatures and payment collection built in'],
  },
]

const flow = [
  {
    stage: 'Capture',
    title: 'Every inquiry, one place',
    points: ['Web forms', 'Phone & walk-ins', 'Sarah, your concierge'],
    icon: <path d="M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />,
  },
  {
    stage: 'Manage',
    title: 'Nothing sits, nothing slips',
    points: ['Visual pipeline', 'Branded proposals', 'Automated follow-up'],
    icon: <><rect x="4" y="4" width="4" height="16" rx="1" /><rect x="10" y="4" width="4" height="10" rx="1" /><rect x="16" y="4" width="4" height="6" rx="1" /></>,
  },
  {
    stage: 'Convert',
    title: 'Into revenue',
    points: ['E-signatures', 'Payment collection', 'Reporting by stage'],
    icon: <><circle cx="12" cy="12" r="9" /><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6.5v11" /></>,
  },
]

const plans = [
  {
    name: 'Essentials',
    fit: 'A single-location restaurant or event space',
    price: '$149',
    users: '2 users included · +$15/extra user',
    features: ['Lead capture forms', 'Sales pipeline & event calendar', 'Proposals & e-signatures', 'Payment collection', 'Email campaigns (1,000/mo)', 'Reporting dashboard'],
    cta: 'Try free for 30 days',
    href: SIGNUP_URL,
  },
  {
    name: 'Growth',
    fit: 'A busy events team at one location',
    price: '$259',
    users: '5 users included · +$15/extra user',
    features: ['Everything in Essentials', 'Leads call system', 'Automated email follow-up', 'Revenue forecasting & conversion tracking', 'Branded client portal', '2,500 emails/mo · priority support'],
    cta: 'Try free for 30 days',
    href: SIGNUP_URL,
    popular: true,
  },
  {
    name: 'Hospitality',
    fit: 'Hotel groups, multi-location groups & clubs',
    price: 'Contact sales',
    users: 'Multiple locations',
    features: ['Everything in Growth', 'Sales rep performance & commission tracking', 'Advanced analytics', 'Custom workflow builder & API access', 'Dedicated onboarding', '5,000 emails/mo per location'],
    cta: 'Book a call',
    href: '/contact',
    dark: true,
  },
]

function Check({ className = 'text-[#6a256f]' }) {
  return <span className={`font-bold shrink-0 ${className}`}>✓</span>
}

function CtaLink({ href, className, children }) {
  return href.startsWith('http') ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  )
}

export default function PlatformPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        <Image src="/images/hero-venue.jpg" alt="" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d0a35]/95 via-[#6a256f]/85 to-[#2d0a35]/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-[#E07B20] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            Large group events, semi-private & fully private
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-tight mb-6">
            Your large group events book revenue.<br />
            <span className="text-[#F99F33]">Your inbox loses the leads.</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-9">
            SPHERE takes every large group inquiry, semi-private and fully private, from first message to a signed, deposited event, in one pipeline. Built for hospitality businesses, not big hotel chains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4">
              Try SPHERE free for 30 days
            </a>
            <Link href="/pricing" className="inline-flex items-center justify-center text-base font-bold px-8 py-4 rounded-full border-2 border-white/40 text-white hover:bg-white/10 transition-all">
              See pricing
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-5">Sarah, your concierge, is included in the trial.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {stats.map((s) => (
            <div key={s.label} className="py-10 md:px-8 text-center">
              <p className="text-3xl md:text-4xl font-extrabold font-display bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#F99F33] bg-clip-text text-transparent mb-2">
                {s.value}
              </p>
              <p className="text-[#111827] font-bold mb-1">{s.label}</p>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section id="who-its-for" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Who it&apos;s for</p>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-[#6a256f] mb-4">
              Built for hospitality businesses
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Semi-private and fully private events for bars and restaurants, breweries and wineries, boutique hotels, and sports and entertainment venues. Not big hotel chains.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {audiences.map((a) => (
              <div key={a.label} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md flex flex-col">
                <div className="relative h-52">
                  <Image src={a.image} alt={a.label} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  <span className="absolute top-4 left-4 bg-white/95 text-[#6a256f] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {a.label}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-[#111827] mb-4">{a.headline}</h3>
                  <ul className="space-y-2.5">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-gray-600 text-sm">
                        <Check className="text-[#EF4561]" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capture. Manage. Convert. */}
      <section id="platform" className="py-24 bg-[#f8f3f9]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-[#3b1240] mb-4">
              Capture. Manage. Convert.
            </h2>
            <p className="text-gray-500 text-lg">One pipeline, from first inquiry to deposit.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-4">
            {flow.map((f, i) => (
              <div key={f.stage} className="contents">
                <div className="flex-1 flex flex-col items-center text-center max-w-xs">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6a256f] via-[#6a256f] to-[#F99F33] shadow-lg shadow-[#6a256f]/20 flex items-center justify-center mb-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
                      {f.icon}
                    </svg>
                  </div>
                  <p className="text-[#EF4561] text-xs font-bold uppercase tracking-[0.2em] mb-2">{f.stage}</p>
                  <h3 className="text-xl font-extrabold font-display text-[#3b1240] mb-4">{f.title}</h3>
                  <ul className="space-y-2">
                    {f.points.map((p) => (
                      <li key={p} className="text-gray-500 text-sm">{p}</li>
                    ))}
                  </ul>
                </div>
                {i < flow.length - 1 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#EF4561]/50 shrink-0 md:mt-7 rotate-90 md:rotate-0" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inside SPHERE */}
      <FeatureSlider />

      {/* Founder */}
      <section className="py-24 bg-[#f8f3f9]">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-center">
          <div className="relative mx-auto md:mx-0 w-56 md:w-full">
            <div className="absolute -inset-3 bg-gradient-to-br from-[#6a256f]/15 to-[#F99F33]/15 rounded-3xl rotate-3" />
            <Image src="/images/samia-founder.jpg" alt="Samia Kohler, Founder" width={400} height={500} className="relative rounded-2xl shadow-xl w-full h-auto object-cover" />
          </div>
          <div>
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Built by event sales people</p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-[#3b1240] leading-tight mb-5">
              We built SPHERE because we lived the chaos.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-3">
              18 years selling large group events across three continents. Spreadsheets, three inboxes and sticky notes. We watched great events go to the venue that simply replied first.
            </p>
            <p className="text-[#6a256f] font-bold mb-8">Samia Kohler, Founder</p>
            <div className="bg-white border-l-4 border-[#EF4561] rounded-xl p-6 shadow-sm">
              <p className="text-[#EF4561] text-xs font-bold uppercase tracking-widest mb-2">Quick test</p>
              <p className="text-gray-700 leading-relaxed">
                How many large group leads are waiting on a proposal right now? If you&apos;d have to check three places to answer, that&apos;s the problem. <strong className="text-[#111827]">SPHERE shows every deal by stage.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-[#111827] mb-4">
              Simple, per-location pricing
            </h2>
            <p className="text-gray-500 text-lg">Start free for 30 days.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  p.dark
                    ? 'bg-[#6a256f]'
                    : p.popular
                      ? 'bg-white border-2 border-[#E07B20] shadow-xl shadow-[#E07B20]/10'
                      : 'bg-gray-50 border border-gray-200'
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E07B20] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                    Most popular
                  </div>
                )}
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${p.dark ? 'text-white/60' : p.popular ? 'text-[#E07B20]' : 'text-gray-400'}`}>{p.name}</p>
                <p className={`text-sm mb-4 ${p.dark ? 'text-white/70' : 'text-gray-500'}`}>{p.fit}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl font-extrabold font-display ${p.dark ? 'text-white' : 'text-[#111827]'}`}>{p.price}</span>
                  {p.price.startsWith('$') && <span className="text-gray-400 text-sm mb-1.5">/mo</span>}
                </div>
                <p className={`text-xs mb-6 ${p.dark ? 'text-white/50' : 'text-gray-400'}`}>{p.users}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${p.dark ? 'text-white/85' : 'text-gray-600'}`}>
                      <Check className={p.dark ? 'text-[#F99F33]' : p.popular ? 'text-[#E07B20]' : 'text-[#6a256f]'} /> {f}
                    </li>
                  ))}
                </ul>
                <CtaLink
                  href={p.href}
                  className={
                    p.dark
                      ? 'block text-center bg-white text-[#6a256f] font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all text-sm'
                      : p.popular
                        ? 'btn-primary text-sm text-center'
                        : 'btn-outline text-sm text-center'
                  }
                >
                  {p.cta}
                </CtaLink>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-8">
            <Link href="/pricing" className="text-[#6a256f] font-semibold hover:underline">See full plan comparison →</Link>
            {' · '}
            <Link href="/platform/sphere-vs-tripleseat" className="text-[#6a256f] font-semibold hover:underline">SPHERE vs. Tripleseat →</Link>
          </p>
        </div>
      </section>

      {/* 360° Virtual Tours */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#6a256f]/10 text-[#6a256f] text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              Exclusive Feature
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-[#6a256f] leading-tight mb-5">
              Let clients explore your venue before they ever visit.
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Immersive 360° virtual tours embedded directly in your booking flow, so prospects can walk every room, picture their event, and book with confidence. No site visits required.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Higher booking confidence: clients know exactly what they're getting",
                'Fewer "can we come see the space?" calls',
                'Stand out from every competitor in your market',
                'Works on desktop, mobile, and VR headsets',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#F99F33]/15 text-[#F99F33] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex justify-center">
            <Image
              src="/images/360-phone-mockup.png"
              alt="360° Virtual Tour on mobile"
              width={480}
              height={480}
              quality={100}
              className="w-full max-w-sm md:max-w-md h-auto object-contain drop-shadow-2xl rounded-3xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-[#F99F33] text-white font-extrabold font-display text-xl px-8 py-4 rounded-full shadow-lg shadow-[#F99F33]/30">
              360° Immersive
            </div>
          </div>
        </div>
      </section>

      {/* App teaser */}
      <section className="relative overflow-hidden bg-[#2d0a35] py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, #E07B20 0%, #EF4561 40%, transparent 70%)', filter: 'blur(80px)', opacity: 0.5 }} />
          <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, #EF4561 0%, #6a256f 50%, transparent 70%)', filter: 'blur(60px)', opacity: 0.6 }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-8"
              style={{ background: 'linear-gradient(135deg, rgba(239,69,97,0.2), rgba(249,159,51,0.2))', border: '1px solid rgba(249,159,51,0.4)', borderRadius: '999px', padding: '6px 16px' }}>
              <span className="w-2 h-2 rounded-full bg-[#E07B20] animate-pulse" />
              <span className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em]">Launching Soon</span>
            </div>
            <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-[72px] tracking-tight text-white leading-[1.0] mb-6">
              Your Events.<br />Your Sales.<br />
              <span style={{ background: 'linear-gradient(90deg, #E07B20, #EF4561)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Anywhere.
              </span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-sm">
              Manage leads, send proposals, track bookings, and message clients, all from the SPHERE mobile app.
            </p>
            <div className="flex flex-wrap gap-3">
              {['📲 Real-time Notifications', '📋 Send Proposals', '📅 Calendar Management', '💬 Client Messaging'].map((f) => (
                <span key={f} className="text-white/70 text-xs font-semibold bg-white/8 border border-white/10 px-4 py-2 rounded-full">{f}</span>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center md:justify-end items-center">
            <Image
              src="/images/app-mockup.png"
              alt="SPHERE mobile app"
              width={500}
              height={990}
              className="relative z-10 h-auto object-contain max-h-[680px] md:max-h-[810px] drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Bigger toolkit */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Need something else?</p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-[#3b1240]">
              SPHERE is part of a bigger toolkit
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-gray-100 shadow-md p-8 flex flex-col">
              <Image src="/images/pev-mark.png" alt="PEV logo" width={48} height={56} className="h-14 w-auto mb-5 self-start" />
              <h3 className="text-xl font-extrabold font-display text-[#111827] mb-2">Need more inquiries to fill the pipeline?</h3>
              <p className="text-gray-500 mb-6 flex-1">PEV lists and promotes your space to people actively searching for a large group event venue.</p>
              <a href="https://privateeventvenue.com/list-your-space" target="_blank" rel="noopener noreferrer" className="text-[#6a256f] font-bold hover:underline">
                Get listed on PEV →
              </a>
            </div>
            <div className="rounded-3xl border border-gray-100 shadow-md p-8 flex flex-col">
              <Image src="/images/logo-mark.png" alt="Event Sphere Solutions logo" width={64} height={54} className="h-14 w-auto mb-5 self-start" />
              <h3 className="text-xl font-extrabold font-display text-[#111827] mb-2">Need a sales team, not just software?</h3>
              <p className="text-gray-500 mb-6 flex-1">Event Sphere Solutions runs your large group event sales for you, on SPHERE, with a team that has sold events for 18 years.</p>
              <Link href="/services" className="text-[#6a256f] font-bold hover:underline">
                Talk to Event Sphere Solutions →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-[#2d0a35] via-[#6a256f] to-[#2d0a35] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white leading-tight mb-5">
            Ready to stop losing large group events to a slow inbox?
          </h2>
          <p className="text-white/70 text-lg mb-9">See SPHERE on your own inquiries, in a 15-minute walkthrough.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4">
              Try SPHERE free for 30 days
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center text-base font-bold px-8 py-4 rounded-full border-2 border-white/40 text-white hover:bg-white/10 transition-all">
              Book a 15-minute walkthrough
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
