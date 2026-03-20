import Link from 'next/link'
import Image from 'next/image'
import FoundingPartnerForm from '@/components/FoundingPartnerForm'

export const metadata = {
  title: 'Founding Partner Program | Event Sphere Solutions',
  description: 'Join the Event Sphere Founding Partner Program — 3 months free access to Sphere Revenue Growth in exchange for your feedback. Limited to 20 venues.',
}

const perks = [
  {
    icon: '🎁',
    gradient: 'from-[#6a256f] to-[#8a3a8f]',
    title: '3 Months Free Access',
    desc: 'Full Sphere Revenue Growth tier — automated follow-ups, revenue forecasting, branded portal, email campaigns, and more. Zero cost for 90 days.',
  },
  {
    icon: '🔒',
    gradient: 'from-[#EF4561] to-[#E07B20]',
    title: 'Founder Pricing — Locked In Forever',
    desc: 'After your free period, you keep a permanently discounted rate that never increases. Regular price is $259/mo — you pay less, always.',
  },
  {
    icon: '⚡',
    gradient: 'from-[#E07B20] to-[#f7b733]',
    title: 'First Access to Every New Feature',
    desc: 'Early access to every feature we build — including OpenTable integration and upcoming AI tools — before anyone else.',
  },
  {
    icon: '🏆',
    gradient: 'from-[#6a256f] to-[#EF4561]',
    title: 'Founding Partner Badge',
    desc: 'A permanent "Founding Partner" designation on your account and in any public-facing materials.',
  },
  {
    icon: '🎯',
    gradient: 'from-[#EF4561] to-[#6a256f]',
    title: 'Dedicated Onboarding Support',
    desc: 'We set everything up with you — pipeline, proposal templates, lead capture forms, and campaigns — fully configured in your first week.',
  },
  {
    icon: '📊',
    gradient: 'from-[#E07B20] to-[#EF4561]',
    title: 'Your Results, Amplified',
    desc: 'We document and promote your success story. Your venue gets featured in our case studies, reaching thousands of hospitality professionals.',
  },
]

const whatWeAsk = [
  'A 30-minute onboarding call to set up your account together',
  'Brief monthly check-in (15 min) to share what\'s working and what isn\'t',
  'Honest feedback on features, UX, and anything that could be better',
  'A testimonial or case study if your results are strong (no pressure)',
]

const spots = { total: 20, taken: 13 }
const remaining = spots.total - spots.taken

export default function FoundingPartnerPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/gala-candle.jpg" alt="Elegant private event" fill className="object-cover object-center" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,3,14,0.88) 0%, rgba(106,37,111,0.80) 60%, rgba(10,3,14,0.75) 100%)' }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Scarcity Banner */}
          <div className="inline-flex items-center gap-2 bg-[#E07B20]/20 border border-[#E07B20]/40 text-[#E07B20] text-sm font-bold px-5 py-2.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#E07B20] rounded-full animate-pulse"></span>
            Only {remaining} of {spots.total} spots remaining
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight leading-tight mb-6">
            Become a <span className="text-[#E07B20]">Founding Partner</span> of Event Sphere
          </h1>

          <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Get 3 months of Sphere completely free — in exchange for your honest feedback. We build better. You grow faster. Everyone wins.
          </p>

          {/* Stats Row */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10">
            {[
              { value: '189%', label: 'avg. event sales increase' },
              { value: '3 months', label: 'completely free' },
              { value: '20', label: 'total spots ever' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold font-display text-[#E07B20]">{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#apply"
              className="btn-primary text-lg px-10 py-4 inline-block shadow-2xl shadow-[#E07B20]/30">
              Apply for a Founding Partner Spot →
            </a>
            <a href="/founding-partner-program.html" target="_blank"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors inline-block text-lg">
              ⬇ Download PDF One-Pager
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-4">Cancel anytime · 15-min application</p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="section-title">What Founding Partners Get</h2>
            <p className="section-subtitle">This isn't a standard free trial. It's a partnership — and we treat it like one.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {perks.map((perk) => (
              <div key={perk.title} className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-[#6a256f]/20 hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${perk.gradient} flex items-center justify-center text-xl shrink-0 shadow-sm`}>
                  {perk.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#222123] mb-1">{perk.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Ask */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="section-title mb-6">What We Ask In Return</h2>
              <ul className="space-y-3">
                {[
                  '30-min onboarding call',
                  '15-min monthly check-in',
                  'Honest feedback on the product',
                  'A testimonial if results are strong',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#E07B20]/15 text-[#E07B20] font-bold text-sm flex items-center justify-center shrink-0">✓</span>
                    <span className="text-gray-700 text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#6a256f] rounded-2xl p-8 text-white">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-extrabold font-display tracking-tight mb-3">A partnership, not a pitch.</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5">We're selective. We want venues serious about growing event revenue — and willing to be honest with us.</p>
              <div className="bg-white/10 rounded-xl p-4 border border-white/15">
                <p className="text-[#E07B20] font-bold text-xs uppercase tracking-widest mb-2">Not for you if:</p>
                <ul className="text-white/50 text-sm space-y-1.5">
                  <li>• You just want a free tool with no feedback</li>
                  <li>• You're not actively booking events</li>
                  <li>• You can't do a 15-min monthly call</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spot Counter */}
      <section className="py-16 bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20]">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-extrabold font-display tracking-tight mb-4">Spots Are Limited — By Design</h2>
          <p className="text-white/90 mb-8 text-lg">
            We're capping the Founding Partner program at 20 venues total. When they're gone, they're gone — there will be no second cohort at this level.
          </p>

          {/* Progress Bar */}
          <div className="max-w-sm mx-auto">
            <div className="flex justify-between text-sm text-white/80 mb-2">
              <span>{spots.taken} spots claimed</span>
              <span>{remaining} remaining</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div
                className="bg-white h-4 rounded-full transition-all duration-500"
                style={{ width: `${(spots.taken / spots.total) * 100}%` }}
              />
            </div>
            <p className="text-white/70 text-sm mt-2">{spots.total} total founding partner spots</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="section-title">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Apply', desc: 'Fill out the short application below. We review within 48 hours.' },
              { step: '02', title: 'Onboarding Call', desc: 'We set up your entire account together — pipeline, forms, templates, campaigns.' },
              { step: '03', title: 'Use It & Grow', desc: '90 days of full Revenue Growth access. Run events. Track results. Share feedback monthly.' },
              { step: '04', title: 'Stay at Founder Rate', desc: 'After 3 months, continue at your permanently locked Founding Partner price.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#E07B20]/10 text-[#E07B20] font-bold text-xl font-serif flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#222123] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Application Form */}
      <section id="apply" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/60 p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#E07B20]/10 text-[#E07B20] text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 bg-[#E07B20] rounded-full animate-pulse"></span>
                {remaining} spots left
              </div>
              <h2 className="section-title">Apply for a Founding Partner Spot</h2>
              <p className="section-subtitle max-w-xl mx-auto">
                Takes 5 minutes. We review every application personally and respond within 48 hours.
              </p>
            </div>
            <FoundingPartnerForm />
          </div>
        </div>
      </section>
    </>
  )
}
