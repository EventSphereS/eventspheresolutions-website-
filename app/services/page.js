import Link from 'next/link'
import Image from 'next/image'
import V1V2CTA from '@/components/V1V2CTA'

export const metadata = {
  title: 'Services | Private Event Sales Solutions for Hospitality',
  description: 'Three ways to protect and grow your private event sales — fully managed event sales team, Sphere platform, or AI-powered automation. Built for restaurants, bars, and venues.',
  openGraph: {
    title: 'Services | Private Event Sales Solutions for Hospitality',
    description: 'Fully managed event sales, Sphere platform, or AI automation — three ways to protect and grow your private event sales.',
    images: [{ url: '/feature-image.png', width: 1200, height: 630, alt: 'Sphere Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Private Event Sales Solutions for Hospitality',
    description: 'Three ways to protect and grow your private event sales. Built for hospitality.',
    images: ['/feature-image.png'],
  },
}

const services = [
  {
    id: 'v1',
    version: 'V1.',
    title: 'Fully Managed Event Sales',
    subtitle: 'Outsourced event sales, executed by experts.',
    desc: 'Event Sphere Solutions operates as your commission-based event sales department. All private event inquiries are handled, qualified, and converted by our team using proven hospitality sales processes.',
    ideal: 'Venues without internal event sales resources or those seeking a hands-off solution.',
    includes: [
      { icon: '⚡', title: 'Event Sales Team', desc: 'A dedicated Event Sphere Solutions sales team managing all inquiries and bookings.' },
      { icon: '🖥️', title: 'Complete Software', desc: 'Our proprietary platform to track leads, proposals, and confirmed events.' },
      { icon: '✨', title: 'Flawless Service', desc: 'Full visibility into performance, calendars, and reporting.' },
    ],
    flip: false,
  },
  {
    id: 'v2',
    version: 'V2.',
    title: 'Sphere — Event Sales Platform',
    subtitle: 'Technology built specifically for hospitality event sales.',
    desc: 'This service provides your venue with full access to Sphere, enabling your team to manage private events efficiently and independently.',
    ideal: 'Venues with an internal sales team that need a better system.',
    includes: [
      { icon: '🛠️', title: 'Complete Tool', desc: 'Full access to Sphere — our event booking & management platform.' },
      { icon: '🌟', title: 'Special Features', desc: 'Tools with special features to promote, tour the space, and more.' },
      { icon: '🎓', title: 'Sales Training', desc: 'Onboarding and training for your in-house event sales team.' },
    ],
    flip: true,
  },
  {
    id: 'v3',
    version: 'V3.',
    title: 'Sphere AI — Platform with AI Automation',
    subtitle: 'Automated event sales workflows designed to save time.',
    desc: 'This service enhances Sphere with AI-driven automation to reduce manual work while maintaining sales momentum.',
    ideal: 'High-volume or busy team members needing speed, efficiency, and scalability.',
    includes: [
      { icon: '🛠️', title: 'Complete Tool', desc: 'Full access to Sphere — our event booking & management platform.' },
      { icon: '🤖', title: 'AI Powered', desc: 'AI-powered lead capture, follow-ups, and booking automation.' },
      { icon: '⚡', title: 'Easy & Quick', desc: 'Faster response times, fewer manual tasks, and smarter sales workflows.' },
    ],
    flip: false,
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/dinner-table.jpg" alt="Private event" fill className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,15,64,0.92) 0%, rgba(45,27,107,0.85) 100%)' }} />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 60% 50%, #E07B20 0%, transparent 55%)' }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block bg-[#E07B20] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            The Platform
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-6 leading-tight">
            <span className="text-[#E07B20]">Sphere</span> — Your Private Event Sales Platform
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Start with Sphere and run your entire private event operation from one platform. Then add a dedicated sales team or AI automation when you're ready to scale.
          </p>
          <a href="https://crm.eventspheresolutions.com/signup" target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-8 py-4">
            Start Free
          </a>
          <p className="text-gray-400 text-sm mt-3">No credit card required</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Sphere + Add-Ons</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[#6a256f] mb-3">
            Start with Sphere.<br />Enhance When You're Ready.
          </h2>
          <div className="w-16 h-0.5 bg-[#E07B20] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every venue starts with Sphere. Add a dedicated expert sales team or AI automation to take your event sales to the next level.
          </p>
        </div>
      </section>

      {/* Sphere — Hero Card */}
      <section className="bg-[#2d0a35] py-16">
        <div className="max-w-6xl mx-auto px-6">

          {/* Sphere full-width hero */}
          <div className="relative group overflow-hidden rounded-2xl min-h-[500px] mb-6">
            <div className="absolute inset-0">
              <Image src="/images/dashboard-laptop.png" alt="Sphere Platform" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row h-full p-10 md:p-14 items-end md:items-center gap-8">
              <div className="flex-1">
                <span className="inline-block bg-white text-[#6a256f] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">The Platform</span>
                <h3 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4 leading-tight" style={{ background: 'linear-gradient(90deg, #6a256f, #EF4561, #E07B20)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sphere</h3>
                <p className="text-white/70 text-base leading-relaxed mb-6 max-w-lg">Your complete private event sales platform. Capture leads, send proposals, manage your calendar, run email campaigns, and track every booking — all in one place.</p>
                <div className="grid grid-cols-2 gap-2 mb-8 max-w-md">
                  {['Lead capture & pipeline', 'Proposals, BEOs & invoices', 'Smart calendar', 'Email campaigns', 'Online payments', 'Reporting dashboard'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E07B20] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <a href="https://crm.eventspheresolutions.com/signup" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#6a256f] font-bold text-sm px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all">
                  Start Free →
                </a>
                <p className="text-white/40 text-xs mt-3">No credit card required</p>
              </div>
            </div>
          </div>

          {/* Add-ons row */}
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest text-center mb-5">Enhance Sphere With</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Sphere + Sales Team */}
            <div className="relative group overflow-hidden rounded-2xl flex flex-col min-h-[420px]">
              <div className="absolute inset-0">
                <Image src="/images/team-working.jpg" alt="Sphere + Sales Team" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
              </div>
              <div className="relative z-10 flex flex-col h-full p-8 justify-end">
                <span className="inline-block bg-[#E07B20] text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit">Add-On</span>
                <h3 className="text-white font-display font-extrabold text-2xl md:text-3xl tracking-tight mb-3 leading-tight">Sphere +<br />Sales Team</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-5">Add a dedicated expert sales team that handles every inquiry, follow-up, proposal, and close — while you focus on running your venue.</p>
                <div className="space-y-2 mb-6">
                  {['Dedicated sales team', 'Lead-to-close management', 'Full Sphere access included'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E07B20] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-block bg-[#E07B20] text-black font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-all w-fit">
                  Contact Us →
                </Link>
              </div>
            </div>

            {/* Sphere AI */}
            <div className="relative group overflow-hidden rounded-2xl flex flex-col min-h-[420px]">
              <div className="absolute inset-0">
                <Image src="/images/gala-table.jpg" alt="Sphere AI" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
              </div>
              <div className="relative z-10 flex flex-col h-full p-8 justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-gradient-to-r from-[#EF4561] to-[#E07B20] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Add-On</span>
                  <span className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full">Coming Soon</span>
                </div>
                <h3 className="text-white font-display font-extrabold text-2xl md:text-3xl tracking-tight mb-3 leading-tight">Sphere AI</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-5">Layer AI automation on top of Sphere — automated lead capture, smart follow-ups, and 24/7 booking workflows with zero manual work.</p>
                <div className="space-y-2 mb-6">
                  {['AI lead capture & follow-up', 'Automated booking workflows', 'Full Sphere access included'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E07B20] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-block bg-gradient-to-r from-[#EF4561] to-[#E07B20] text-white font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-all w-fit">
                  Join the Waitlist →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <V1V2CTA />

      {/* Free Playbook */}
      <section className="py-20 bg-gradient-to-br from-[#faf7ff] to-[#fff8f0] border-t border-gray-100 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div className="relative mx-auto md:mx-0 w-full max-w-xs">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#6a256f]/10 to-[#E07B20]/10 rounded-3xl rotate-3" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl -rotate-2 border-4 border-white">
              <Image
                src="/images/playbook-cover-food-photo.jpg"
                alt="The Private Event Lead Generation Marketing Playbook"
                width={500}
                height={650}
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#E07B20] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Free Guide
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-widest mb-3">Not ready to talk yet?</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-[#6a256f] mb-4">
              Grab the Private Event Lead Generation Marketing Playbook
            </h2>
            <p className="text-gray-600 mb-6">
              A step-by-step system covering PR, social content, email, SEO, and exposure partners — tactics you can start using today, no matter which option above you pick.
            </p>
            <ul className="space-y-2 mb-7">
              {['PR & media outreach', 'Social content + CTA system', 'Email & SEO tactics', 'Exposure partner list'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-[#E07B20] font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/playbook" className="btn-primary inline-block">
              Get the Free Playbook →
            </Link>
          </div>

        </div>
      </section>
    </>
  )
}
