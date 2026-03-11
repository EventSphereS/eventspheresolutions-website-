import Link from 'next/link'
import Image from 'next/image'
import V1V2CTA from '@/components/V1V2CTA'

export const metadata = {
  title: 'Services | Event Sphere Solutions',
  description: 'Three ways to power your private event sales — fully managed, platform license, or AI-powered automation.',
}

const services = [
  {
    id: 'v1',
    version: 'V1.',
    title: 'Fully Managed Event Sales',
    subtitle: 'Outsourced event sales, executed by experts.',
    desc: 'Event Sphere operates as your commission-based event sales department. All private event inquiries are handled, qualified, and converted by our team using proven hospitality sales processes.',
    ideal: 'Venues without internal event sales resources or those seeking a hands-off solution.',
    includes: [
      { icon: '⚡', title: 'Event Sales Team', desc: 'A dedicated Event Sphere sales team managing all inquiries and bookings.' },
      { icon: '🖥️', title: 'Complete Software', desc: 'Our proprietary platform to track leads, proposals, and confirmed events.' },
      { icon: '✨', title: 'Flawless Service', desc: 'Full visibility into performance, calendars, and reporting.' },
    ],
    flip: false,
  },
  {
    id: 'v2',
    version: 'V2.',
    title: 'Event Sales Platform License',
    subtitle: 'Technology built specifically for hospitality event sales.',
    desc: 'This service provides your venue with full access to the Event Sphere platform, enabling your team to manage private events efficiently and independently.',
    ideal: 'Venues with an internal sales team that need a better system.',
    includes: [
      { icon: '🛠️', title: 'Complete Tool', desc: 'Full access to the Event Sphere event booking & management platform.' },
      { icon: '🌟', title: 'Special Features', desc: 'Tools with special features to promote, tour the space, and more.' },
      { icon: '🎓', title: 'Sales Training', desc: 'Onboarding and training for your in-house event sales team.' },
    ],
    flip: true,
  },
  {
    id: 'v3',
    version: 'V3.',
    title: 'Platform License with AI Automation',
    subtitle: 'Automated event sales workflows designed to save time.',
    desc: 'This service enhances the Event Sphere platform with AI-driven automation to reduce manual work while maintaining sales momentum.',
    ideal: 'High-volume or busy team members needing speed, efficiency, and scalability.',
    includes: [
      { icon: '🛠️', title: 'Complete Tool', desc: 'Full access to the Event Sphere event booking & management platform.' },
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
          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-white mb-6 leading-tight">
            Find Your Way to Power Your<br />
            <span className="text-[#E07B20]">Private Event Sales</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Whether you want us to handle everything, empower your internal team, or let AI take the heavy lifting — Event Sphere adapts to how your venue operates.
          </p>
          <Link href="/founding-partner" className="btn-primary text-lg px-8 py-4">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Three Ways */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[#E07B20] mb-3">
            Three Ways to Power<br />Your Private Events Sales
          </h2>
          <div className="w-16 h-0.5 bg-[#E07B20] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you want us to handle everything, empower your internal team, or let AI take the heavy lifting — Event Sphere adapts to how your venue operates.
          </p>
        </div>
      </section>

      {/* V1 / V2 / V3 — Full-width cards */}
      <section className="bg-[#0f0f0f] py-16">
        <div className="grid grid-cols-1 md:grid-cols-3">

          {/* V1 */}
          <div className="relative group overflow-hidden flex flex-col min-h-[600px]">
            <div className="absolute inset-0">
              <Image src="/images/team-working.jpg" alt="Fully Managed" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
            </div>
            <div className="relative z-10 flex flex-col h-full p-8 md:p-10 justify-end">
              <div className="mb-auto">
                <span className="inline-block text-[#E07B20] font-display font-black text-5xl leading-none opacity-30">V1</span>
              </div>
              <div>
                <span className="inline-block bg-[#E07B20] text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Full Service</span>
                <h3 className="text-white font-display font-extrabold text-2xl md:text-3xl tracking-tight mb-3 leading-tight">Fully Managed<br />Event Sales</h3>
                <p className="text-[#E07B20]/90 text-sm leading-relaxed mb-6">We become your event sales department — handling every inquiry, proposal, and booking end-to-end.</p>
                <div className="space-y-2 mb-8">
                  {['Dedicated sales team', 'Full platform access', 'Lead-to-close management'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E07B20] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-xs italic mb-6">Ideal for: Venues without internal event sales resources.</p>
                <Link href="/contact" className="inline-block bg-[#E07B20] text-black font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-all">
                  Get Started with V1 →
                </Link>
              </div>
            </div>
          </div>

          {/* V2 */}
          <div className="relative group overflow-hidden flex flex-col min-h-[600px] border-x border-white/10">
            <div className="absolute inset-0">
              <Image src="/images/dashboard-laptop.png" alt="Platform License" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
            </div>
            <div className="relative z-10 flex flex-col h-full p-8 md:p-10 justify-end">
              <div className="mb-auto">
                <span className="inline-block text-white font-display font-black text-5xl leading-none opacity-20">V2</span>
              </div>
              <div>
                <span className="inline-block bg-white text-[#6a256f] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Platform License</span>
                <h3 className="text-white font-display font-extrabold text-2xl md:text-3xl tracking-tight mb-3 leading-tight">Event Sales<br />Platform</h3>
                <p className="text-[#E07B20]/90 text-sm leading-relaxed mb-6">Your team, powered by our software. Manage leads, proposals, and bookings all in one place.</p>
                <div className="space-y-2 mb-8">
                  {['Full platform access', 'Special venue tools', 'Team onboarding & training'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-xs italic mb-6">Ideal for: Venues with an internal sales team needing a better system.</p>
                <Link href="/founding-partner" className="inline-block bg-white text-[#6a256f] font-bold text-sm px-6 py-3 rounded-full hover:bg-gray-100 transition-all">
                  Get Started with V2 →
                </Link>
              </div>
            </div>
          </div>

          {/* V3 */}
          <div className="relative group overflow-hidden flex flex-col min-h-[600px]">
            <div className="absolute inset-0">
              <Image src="/images/gala-table.jpg" alt="AI Automation" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
            </div>
            <div className="relative z-10 flex flex-col h-full p-8 md:p-10 justify-end">
              <div className="mb-auto flex justify-between items-start">
                <span className="inline-block text-white font-display font-black text-5xl leading-none opacity-20">V3</span>
                <span className="inline-block bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white text-xs font-bold px-3 py-1 rounded-full">Coming Soon</span>
              </div>
              <div>
                <span className="inline-block bg-gradient-to-r from-[#EF4561] to-[#E07B20] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">AI Powered</span>
                <h3 className="text-white font-display font-extrabold text-2xl md:text-3xl tracking-tight mb-3 leading-tight">Platform + AI<br />Automation</h3>
                <p className="text-[#E07B20]/90 text-sm leading-relaxed mb-6">Supercharge your platform with AI-driven workflows — automated follow-ups, smart lead capture, and zero manual tasks.</p>
                <div className="space-y-2 mb-8">
                  {['AI lead capture & follow-up', 'Automated booking workflows', 'Faster responses, less work'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E07B20] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-xs italic mb-6">Ideal for: High-volume venues needing speed and scalability.</p>
                <Link href="/contact" className="inline-block bg-gradient-to-r from-[#EF4561] to-[#E07B20] text-white font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-all">
                  Join the Waitlist →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <V1V2CTA />
    </>
  )
}
