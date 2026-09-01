import Link from 'next/link'
import Image from 'next/image'
import V1V2CTA from '@/components/V1V2CTA'
import CountUp from '@/components/CountUp'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'

const partners = [
  { name: 'BARCOA Agaveria', logo: '/images/logo-barcoa.png' },
  { name: 'XICO Arte y Cultura', logo: '/images/logo-xico.png' },
  { name: 'RECREO Cantina', logo: '/images/logo-recreo.png' },
  { name: 'The Uncommon', logo: '/images/logo-uncommon.png' },
  { name: 'Tipsy Egg', logo: '/images/logo-tipsy.png' },
  { name: 'Tokyo Lima', logo: '/images/logo-tokyolima.png' },
  { name: 'Lomas Cocina de México', logo: '/images/logo-lomas.png' },
  { name: 'Padeland', logo: '/images/logo-padeland.png' },
  { name: 'Course Restaurant', logo: '/images/logo-course.png' },
  { name: 'Shiso Sushi Sake', logo: '/images/logo-shiso.jpg' },
  { name: 'TAMC', logo: '/images/logo-tamc.jpg' },
  { name: 'Hundred Mile Brewing Co.', logo: '/images/logo-hundredmile.jpeg' },
]


export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-celebration.jpg"
            alt="Private event celebration"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,15,64,0.88) 0%, rgba(45,27,107,0.80) 50%, rgba(26,15,64,0.75) 100%)' }} />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 40%, #E07B20 0%, transparent 55%)' }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 pt-32 pb-24">
          <div className="inline-flex items-center gap-2.5 bg-white/8 border border-white/15 text-white/70 text-xs px-5 py-2 rounded-full mb-8 backdrop-blur-sm tracking-wide font-medium">
            <span className="w-1.5 h-1.5 bg-[#E07B20] rounded-full animate-pulse shrink-0"></span>
            Now accepting Founding Partners
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tight text-white mb-6">
            The Future of Private
            Event Booking for{' '}
            <span className="text-[#E07B20]">Hospitality & Venues</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Event Sphere Solutions gives hospitality businesses <span className="text-white font-semibold">Sphere</span> — the expert sales team and smart tools to turn empty calendars into consistent, high-performing event sales programs.
          </p>
          <Link href="/founding-partner"
            className="inline-block bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold text-base md:text-lg px-8 md:px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-2xl">
            Start Free — Founding Partner Program →
          </Link>
          <p className="text-gray-500 text-sm mt-3">3 months free*</p>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="py-14 bg-[#6a256f] overflow-hidden">
        <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] text-center mb-8">Trusted By</p>
        <div className="flex items-center animate-marquee gap-16 w-max">
          {[...partners, ...partners].map((p, i) => (
            <div key={i} className="flex items-center justify-center shrink-0" style={{ height: 112 }}>
              {p.logo.includes('hundredmile') || p.logo.includes('tokyolima') || p.logo.includes('lomas') || p.logo.includes('shiso') || p.logo.includes('tamc') ? (
                <div className="rounded-full overflow-hidden" style={{ width: 112, height: 112 }}>
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : p.logo.includes('course') ? (
                <div className="bg-white rounded-xl px-6 py-4 flex items-center justify-center">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={200}
                    height={98}
                    className="object-contain w-auto max-h-[72px]"
                  />
                </div>
              ) : (
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={258}
                  height={128}
                  className={`object-contain w-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.85)] drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] ${
                    p.logo.includes('tipsy') || p.logo.includes('recreo') || p.logo.includes('uncommon')
                      ? 'max-h-[140px] scale-125'
                      : 'max-h-[112px]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── THREE RESULTS ── */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Why Sphere</p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-[#6a256f] leading-tight">
              One system. Three results.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                title: 'More Bookings',
                desc: 'Our expert sales team and automated follow-up system capture every lead and convert them into confirmed bookings, fast.',
                stat: '189%',
                statLabel: 'avg. increase in event sales',
              },
              {
                number: '02',
                title: 'No Manual Work',
                desc: 'Proposals, contracts, follow-ups, and reporting all run automatically. Your team focuses on hospitality, not paperwork.',
                stat: '14+',
                statLabel: 'hours saved every week',
              },
              {
                number: '03',
                title: 'Happier Guests',
                desc: 'Seamless booking experiences and flawlessly executed events turn one-time guests into regulars who rave about your venue.',
                stat: '5★',
                statLabel: 'guest retention & reviews',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 hover:border-[#6a256f]/20 hover:shadow-lg transition-all group bg-white overflow-hidden flex flex-col">
                <div className="p-8 flex-1">
                  <div className="text-[#E07B20] font-display font-bold text-sm mb-6">{item.number}</div>
                  <h3 className="text-xl font-bold text-[#6a256f] mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="bg-[#E07B20] px-8 py-5 flex items-center gap-3 min-h-[72px]">
                  <span className="text-white font-extrabold font-display text-3xl leading-none shrink-0">{item.stat}</span>
                  <span className="text-white/80 font-semibold text-xs uppercase tracking-wide leading-tight">{item.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT PHOTO BREAK ── */}
      <section className="relative h-80 md:h-[480px] overflow-hidden">
        <Image
          src="/images/event-table.jpg"
          alt="Elegant private event setup"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#6a256f]/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <p className="font-display font-extrabold text-white text-2xl sm:text-3xl md:text-6xl leading-tight tracking-tight max-w-3xl px-4">
            Every empty date is lost sales{' '}
            <span className="text-[#E07B20]">walking out the door.</span>
          </p>
        </div>
      </section>

      {/* ── 189% STAT ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-4">Proven Results</p>
            <CountUp target={189} suffix="%" className="font-display font-extrabold text-7xl sm:text-8xl md:text-[140px] leading-none mb-2 block" style={{ background: 'linear-gradient(90deg, #6a256f, #EF4561, #E07B20)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
            <p className="text-[#6a256f] text-xl font-semibold">average increase in event sales</p>
            <p className="text-gray-400 text-sm mt-2">Across our first clients in under 120 days</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsCarousel />


      {/* ── HOW IT WORKS ── */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-20">
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Simple by Design</p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-[#6a256f] leading-tight">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { step: '01', title: 'We set everything up', desc: 'We migrate all your existing data for free, then configure your pipeline, proposals, lead forms, and campaigns — fully ready in a single onboarding call.' },
              { step: '02', title: 'You start taking bookings', desc: 'Leads come in, follow-ups go out automatically, and your calendar fills with confirmed events.' },
              { step: '03', title: 'Sales grow', desc: 'Track every lead, booking, and dollar in one dashboard. Watch your event sales compound month after month.' },
            ].map((item) => (
              <div key={item.step}>
                <div className="font-display font-black text-[#ee6603] text-[88px] leading-none mb-1 select-none">{item.step}</div>
                <div className="w-6 h-0.5 bg-[#E07B20] mb-5" />
                <h3 className="text-base font-bold text-[#222123] mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR ── */}
      <section className="py-28 bg-[#6a256f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-[#ee6603] text-xs font-bold uppercase tracking-[0.25em] mb-4">Built Exclusively For</p>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white leading-tight max-w-2xl">
              The hospitality industry,<br className="hidden md:block" /> and no one else.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                label: 'Restaurants',
                sub: 'Fine dining to casual',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 2v5c0 1.5 1.5 3 3 3s3-1.5 3-3V2"/><path d="M6 2v20"/><path d="M16 22V12.5c1.5-.5 4-2 4-6V2"/><path d="M20 2h-4"/>
                  </svg>
                ),
              },
              {
                label: 'Bars & Breweries',
                sub: 'Taprooms to nightlife',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 22h8"/><path d="M12 11v11"/><path d="M5 2h14l-3.5 9a5.5 5.5 0 01-11 0L5 2z"/>
                  </svg>
                ),
              },
              {
                label: 'Venues',
                sub: 'Event spaces & halls',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 22h18"/><path d="M4 22V11L12 4l8 7v11"/><path d="M9 22v-6h6v6"/><path d="M9 9h.01M12 9h.01M15 9h.01"/>
                  </svg>
                ),
              },
              {
                label: 'Hotels',
                sub: 'Ballrooms to boutiques',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 22h18"/><path d="M4 22V4a1 1 0 011-1h14a1 1 0 011 1v18"/><path d="M7 8h2v2H7zM7 13h2v2H7zM15 8h2v2h-2zM15 13h2v2h-2zM11 18h2v4h-2z"/>
                  </svg>
                ),
              },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center text-center py-10 px-6">
                <div className="w-12 h-12 mb-6 text-[#ee6603]">{c.icon}</div>
                <div className="font-bold text-white text-base mb-1.5">{c.label}</div>
                <div className="text-white/50 text-sm leading-relaxed">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <V1V2CTA />
    </>
  )
}
