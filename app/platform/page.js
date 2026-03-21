import Link from 'next/link'
import Image from 'next/image'
import V1V2CTA from '@/components/V1V2CTA'
import FeatureSlider from '@/components/FeatureSlider'

export const metadata = {
  title: 'Sphere | Event Sphere Solutions',
  description: 'Sphere by Event Sphere Solutions — the private event sales platform built for restaurants, bars, venues, and hotels.',
}


const pillars = [
  {
    icon: '📈',
    stat: '189%',
    statLabel: 'avg. increase in event sales',
    title: 'More Bookings',
    accent: 'from-[#6a256f] to-[#9b3aa0]',
    iconBg: 'bg-[#6a256f]/10',
    points: [
      'Expert sales team captures every lead',
      'Automated follow-up converts inquiries fast',
      'Avg. 189% increase in event sales',
    ],
  },
  {
    icon: '⚙️',
    stat: '10hrs',
    statLabel: 'saved per week per team',
    title: 'Less Manual Work',
    accent: 'from-[#E07B20] to-[#F99F33]',
    iconBg: 'bg-[#E07B20]/10',
    points: [
      'Proposals, contracts & BEOs auto-generated',
      'Follow-ups and campaigns run automatically',
      'Hours saved every week for your team',
    ],
  },
  {
    icon: '⭐',
    stat: '4.9★',
    statLabel: 'average guest review score',
    title: 'Happier Guests',
    accent: 'from-[#EF4561] to-[#E07B20]',
    iconBg: 'bg-[#EF4561]/10',
    points: [
      'Seamless booking experience from first inquiry',
      '360° virtual tours build confidence before arrival',
      'Higher guest retention & glowing reviews',
    ],
  },
]


export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#6a256f]/10 text-[#6a256f] text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              Built for Restaurants, Bars & Venues
            </div>
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-4">Sphere — Private Event Platform by Event Sphere Solutions</p>
            <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#6a256f] leading-tight mb-5">
              <span className="text-[#E07B20]">Sphere</span> — Your private event<br />sales platform
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Sphere gives your hospitality business the expert sales team and smart tools to turn empty calendars into consistent, high-revenue event programs — without the overhead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/founding-partner" className="btn-primary text-base px-8 py-3.5">
                Get 3 Months Free →
              </Link>
              <Link href="/pricing" className="btn-outline text-base px-8 py-3.5">
                See Pricing
              </Link>
            </div>
            <p className="text-gray-400 text-xs mt-4">Founding Partner spots are limited · Cancel anytime</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/dashboard-laptop.png"
              alt="Event Sphere dashboard"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Built For */}
      <section className="py-10 bg-[#6a256f]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-6">Built Exclusively For</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🍽️', label: 'Restaurants' },
              { icon: '🍺', label: 'Bars & Breweries' },
              { icon: '🏛️', label: 'Venues' },
              { icon: '🏨', label: 'Hotels' },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-2">
                <div className="text-4xl">{c.icon}</div>
                <span className="text-white font-semibold text-sm">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One system. Three results. */}
      <section className="py-24 bg-[#f4f0f5] border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Why Sphere</p>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-[#111827] mb-4">
              One system. Three results.
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Everything you need to make events your most profitable revenue channel.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="relative bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
                {/* Gradient top bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${p.accent}`} />
                <div className="p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl ${p.iconBg} flex items-center justify-center text-2xl mb-6`}>
                    {p.icon}
                  </div>
                  {/* Stat */}
                  <div className="mb-1">
                    <span className={`text-5xl font-extrabold font-display bg-gradient-to-r ${p.accent} bg-clip-text text-transparent`}>
                      {p.stat}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-5">{p.statLabel}</p>
                  <h3 className="text-lg font-bold text-[#111827] mb-4">{p.title}</h3>
                  <ul className="space-y-2.5 mt-auto">
                    {p.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-gray-500 text-sm">
                        <span className="w-4 h-4 rounded-full bg-gray-100 text-gray-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Slider */}
      <FeatureSlider />

      {/* 360° Virtual Tours */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#6a256f]/10 text-[#6a256f] text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              Exclusive Feature
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-[#6a256f] leading-tight mb-5">
              Let clients explore your venue before they ever visit.
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Immersive 360° virtual tours embedded directly in your booking flow — so prospects can walk every room, visualize their event, and book with confidence. No site visits required.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Higher booking confidence — clients know exactly what they're getting",
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
            <Link href="/founding-partner" className="btn-primary inline-block">
              Get This Feature Free →
            </Link>
          </div>

          {/* Right — visual */}
          <div className="relative flex justify-center">
            <Image
              src="/images/360-phone-mockup.png"
              alt="360° Virtual Tour on mobile"
              width={480}
              height={480}
              quality={100}
              className="w-full max-w-sm md:max-w-md h-auto object-contain drop-shadow-2xl rounded-3xl"
            />
            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#F99F33] text-white font-extrabold font-display text-sm px-5 py-3 rounded-2xl shadow-lg shadow-[#F99F33]/30">
              360° Immersive
            </div>
          </div>
        </div>
      </section>

      {/* App teaser — launch hype */}
      <section className="relative overflow-hidden bg-[#2d0a35] py-24 md:py-32">

        {/* Multi-layer glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, #E07B20 0%, #EF4561 40%, transparent 70%)', filter: 'blur(80px)', opacity: 0.5 }} />
          <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, #EF4561 0%, #6a256f 50%, transparent 70%)', filter: 'blur(60px)', opacity: 0.6 }} />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, #6a256f 0%, transparent 70%)', filter: 'blur(80px)', opacity: 0.4 }} />
        </div>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            {/* Launch badge */}
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
              Manage leads, send proposals, track bookings, and message clients — all from the Sphere mobile app.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {['📲 Real-time Notifications', '📋 Send Proposals', '📅 Calendar Management', '💬 Client Messaging'].map(f => (
                <span key={f} className="text-white/70 text-xs font-semibold bg-white/8 border border-white/10 px-4 py-2 rounded-full">{f}</span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/contact"
                className="inline-flex items-center gap-2 font-bold text-sm px-7 py-4 rounded-full transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #E07B20, #EF4561)', color: 'white' }}>
                Get Early Access →
              </Link>
              <div className="flex items-center gap-2 text-white/40 text-sm pt-1">
                <span>iOS & Android</span>
                <span>·</span>
                <span>Free for partners</span>
              </div>
            </div>
          </div>

          {/* Right — phone */}
          <div className="relative flex justify-center md:justify-end items-center">
            {/* Glow ring behind phone */}
            <div className="absolute w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(239,69,97,0.4) 0%, rgba(249,159,51,0.2) 50%, transparent 70%)', filter: 'blur(40px)' }} />
            <Image
              src="/images/app-mockup.png"
              alt="Event Sphere mobile app"
              width={500}
              height={990}
              className="relative z-10 h-auto object-contain max-h-[680px] md:max-h-[810px] drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <V1V2CTA />
    </>
  )
}
