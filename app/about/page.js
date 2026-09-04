import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'About | Event Sphere Solutions — Built for Hospitality',
  description: 'Event Sphere Solutions was built by a hospitality operator who lived the chaos. Sphere is the private event sales platform we wished existed — built for restaurants, bars, and venues.',
  openGraph: {
    title: 'About | Event Sphere Solutions — Built for Hospitality',
    description: 'Built by a hospitality operator who lived the chaos. Sphere is the private event sales platform we wished existed.',
    images: [{ url: '/feature-image.png', width: 1200, height: 630, alt: 'About Event Sphere Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Event Sphere Solutions',
    description: 'Built by a hospitality operator who lived the chaos.',
    images: ['/feature-image.png'],
  },
}

const values = [
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-hosp" x1="0" y1="64" x2="64" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6a256f"/>
            <stop offset="50%" stopColor="#EF4561"/>
            <stop offset="100%" stopColor="#F99F33"/>
          </linearGradient>
        </defs>
        <g stroke="url(#grad-hosp)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="15" y1="10" x2="15" y2="24"/>
          <line x1="20" y1="10" x2="20" y2="24"/>
          <line x1="25" y1="10" x2="25" y2="24"/>
          <path d="M15 24 Q20 30 25 24"/>
          <line x1="20" y1="30" x2="20" y2="54"/>
          <line x1="44" y1="10" x2="44" y2="54"/>
          <path d="M38 10 L44 10 Q52 16 52 26 L44 26"/>
        </g>
      </svg>
    ),
    title: 'Hospitality-First',
    desc: 'Everything we do is built around the unique needs of restaurants, bars, venues, and hotels. We speak your language.',
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-part" x1="0" y1="64" x2="64" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6a256f"/>
            <stop offset="50%" stopColor="#EF4561"/>
            <stop offset="100%" stopColor="#F99F33"/>
          </linearGradient>
        </defs>
        <g stroke="url(#grad-part)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="20" r="8"/>
          <path d="M4 54 C4 40 10 36 18 36 C22 36 26 37.5 29 40"/>
          <circle cx="46" cy="20" r="8"/>
          <path d="M60 54 C60 40 54 36 46 36 C42 36 38 37.5 35 40"/>
          <path d="M29 40 L35 40"/>
        </g>
      </svg>
    ),
    title: 'True Partnership',
    desc: 'We embed ourselves in your team. Your success is our success — and we operate with that mindset every single day.',
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-res" x1="0" y1="64" x2="64" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6a256f"/>
            <stop offset="50%" stopColor="#EF4561"/>
            <stop offset="100%" stopColor="#F99F33"/>
          </linearGradient>
        </defs>
        <g stroke="url(#grad-res)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="10" x2="12" y2="52"/>
          <line x1="12" y1="52" x2="54" y2="52"/>
          <polyline points="16,44 26,34 36,38 50,18"/>
          <polyline points="45,13 50,18 45,23"/>
        </g>
      </svg>
    ),
    title: 'Results-Driven',
    desc: 'We measure our work by your outcomes: attendance, sales, and guest satisfaction. No vanity metrics here.',
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-exec" x1="0" y1="64" x2="64" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6a256f"/>
            <stop offset="50%" stopColor="#EF4561"/>
            <stop offset="100%" stopColor="#F99F33"/>
          </linearGradient>
        </defs>
        <g stroke="url(#grad-exec)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 8 L52 16 L52 34 C52 46 43 54 32 58 C21 54 12 46 12 34 L12 16 Z"/>
          <polyline points="22,32 29,39 42,24"/>
        </g>
      </svg>
    ),
    title: 'Flawless Execution',
    desc: 'From the first planning call to the last guest out the door, we hold ourselves to the highest standards of delivery.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[420px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/dinner-table.jpg"
            alt="Private event dinner setup"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,15,64,0.88) 0%, rgba(106,37,111,0.80) 100%)' }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 pt-20 pb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white mb-6">
            We're Built for <span className="text-[#E07B20]">Hospitality</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Event Sphere Solutions is a full-service event company dedicated exclusively to the hospitality industry — because the best results come from specialists who truly understand your world.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[#6a256f] mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Event Sphere Solutions was founded with a simple insight: hospitality businesses are sitting on untapped event potential. Restaurants with beautiful private dining rooms hosting one event a month. Hotels with stunning ballrooms that sit empty most weekends. Bars with perfect atmospheres but no strategy to fill them.
              </p>
              <p>
                We built Event Sphere Solutions to change that. Our team brings together deep expertise in event planning, marketing, technology, and hospitality operations — creating a unique B2B2C model that serves both our business clients and the guests they serve.
              </p>
              <p>
                When you partner with Event Sphere Solutions, you're not hiring a vendor. You're gaining a dedicated team that cares as much about your guests' experience as you do — and has the skills and systems to deliver it, every time.
              </p>
            </div>
            <Link href="/contact" className="btn-primary mt-8 inline-block">Let's Work Together</Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 relative rounded-2xl overflow-hidden h-64 shadow-lg">
              <Image
                src="/images/dinner-table.jpg"
                alt="Private event dinner setup"
                fill
                className="object-cover"
              />
            </div>
            {[
              { v: '189%', l: 'Avg. Sales Increase' },
              { v: '120', l: 'Days to Results' },
              { v: '5+', l: 'Partners in Year 1' },
              { v: '100%', l: 'Satisfaction Rate' },
            ].map((s) => (
              <div key={s.l} className="bg-[#6a256f] rounded-2xl p-6 text-center shadow-lg shadow-[#6a256f]/30">
                <div className="text-4xl font-extrabold font-display text-[#E07B20] leading-none mb-2">{s.v}</div>
                <div className="text-white/70 text-xs font-semibold uppercase tracking-widest">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[300px] md:min-h-[500px]">
              <Image
                src="/images/founder.jpg"
                alt="Samia Kohler - Founder of Event Sphere Solutions"
                fill
                className="object-cover"
                style={{ objectPosition: '50% 8%' }}
              />
            </div>
            <div>
              <div className="text-[#E07B20] font-bold text-xs uppercase tracking-widest mb-3">Meet the Founder</div>
              <h2 className="text-3xl font-bold font-display tracking-tight text-[#6a256f] mb-4">Samia Kohler</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                <p>
                  Originally from France, I bring over 18 years of hands-on experience in hospitality and private event sales across China, Hong Kong, France, and the U.S. My background spans the full spectrum of the hospitality business — restaurants, bars, nightclubs, luxury hotels, private yacht clubs, event venues, and catering — giving me a deep understanding of what it takes to drive event sales while delivering five-star guest experiences.
                </p>
                <p>
                  My expertise lies in building and leading sales teams, optimizing venue operations, and developing strategic sales systems that convert inquiries into booked events. From concept to close, I specialize in creating sales-driven solutions that streamline the process for venues and provide clients with a seamless, elevated experience.
                </p>
                <p>
                  Resourceful, detail-obsessed, and passionate about hospitality, I launched Event Sphere Solutions to help venues unlock their full potential. We don't just manage leads — we turn them into lasting relationships and profitable results.
                </p>
                <p>
                  With Sphere — our powerful platform — and an experienced sales team behind the scenes, Event Sphere Solutions offers a smarter, more profitable way to run private events — designed by industry pros, for industry pros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[#6a256f] mb-3">What We Stand For</h2>
            <p className="text-gray-500 text-lg">The principles that guide every event we touch.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-all text-center border border-gray-100">
                <div className="mb-4 flex justify-center">{v.icon}</div>
                <h3 className="text-xl font-bold text-[#6a256f] mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B2C Explained */}
      <section className="py-24 bg-[#6a256f] text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-[#F99F33] text-xs font-bold uppercase tracking-widest mb-4">Our Approach</p>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight leading-tight max-w-xl">
              We think beyond<br />the event.
            </h2>
          </div>

          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/15">
            {[
              { label: 'Your Sales', desc: 'More bookings, fuller calendars, higher spend per event. Events become your most reliable sales channel.' },
              { label: 'Your Guests', desc: 'Experiences they share, remember, and come back for. Loyalty that outlasts any single night.' },
              { label: 'Your Brand', desc: 'Every event makes your venue the place to be. Reputation compounds — we help you build it.' },
            ].map((item) => (
              <div key={item.label} className="flex-1 py-8 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0">
                <div className="text-[#F99F33] font-extrabold font-display text-2xl mb-3">{item.label}</div>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-6">Ready to Partner With Us?</h2>
          <p className="text-white/90 mb-8 text-lg">Let's talk about your venue and how we can help you build an event program that drives real results.</p>
          <Link href="/contact"
            className="bg-white text-[#E07B20] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors inline-block shadow-lg">
            Book a Free Consultation →
          </Link>
        </div>
      </section>
    </>
  )
}
