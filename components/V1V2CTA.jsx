import Link from 'next/link'

export default function V1V2CTA() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <p className="text-[#E07B20] text-xs font-bold uppercase tracking-widest mb-3">Get Started</p>
        <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[#111827] mb-4">
          Start with <span className="text-[#6a256f]">Sphere</span>. Add what you need.
        </h2>
        <p className="text-gray-500 text-base mb-12 max-w-xl mx-auto">
          Sphere is the platform every venue starts with. Then choose to add a dedicated sales team or AI automation — or both.
        </p>

        {/* Sphere — Primary */}
        <div className="bg-gradient-to-br from-[#6a256f] to-[#2d0a35] rounded-2xl p-8 md:p-10 text-white mb-6 text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <div className="inline-block bg-[#E07B20] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                The Platform
              </div>
              <h3 className="text-3xl font-extrabold font-display tracking-tight mb-3">Sphere</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-lg">
                Everything your venue needs to capture leads, send proposals, manage your calendar, run email campaigns, and track every booking — all in one place.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/80 mb-6">
                {[
                  'Lead capture & pipeline',
                  'Proposals, BEOs & invoices',
                  'Smart calendar & conflict prevention',
                  'Email campaigns & promo codes',
                  'Online payments & e-signatures',
                  'Reporting dashboard',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#E07B20] font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="text-[#E07B20] font-bold text-sm">3 months free — Founding Partner Program</div>
            </div>
            <div className="shrink-0 text-center md:text-right">
              <Link href="/founding-partner"
                className="inline-block bg-white text-[#6a256f] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all text-sm">
                Get Sphere Free →
              </Link>
              <p className="text-white/40 text-xs mt-3">Cancel anytime</p>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Enhance Sphere With</p>
        <div className="grid md:grid-cols-2 gap-4">

          {/* Sphere + Sales Team */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col items-start text-left hover:border-[#6a256f]/20 hover:shadow-md transition-all">
            <div className="inline-block bg-[#E07B20]/10 text-[#E07B20] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
              Add-On
            </div>
            <h4 className="text-lg font-bold text-[#6a256f] mb-2">Sphere + Sales Team</h4>
            <p className="text-gray-400 text-sm mb-5 flex-1">Add a dedicated expert sales team that handles every inquiry, follow-up, proposal, and close — while you focus on running your venue.</p>
            <Link href="/contact"
              className="w-full bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all text-sm text-center">
              Learn More →
            </Link>
            <p className="text-xs text-gray-400 mt-2 text-center w-full">First month free</p>
          </div>

          {/* Sphere AI */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col items-start text-left hover:border-[#6a256f]/20 hover:shadow-md transition-all">
            <div className="inline-block bg-[#E07B20]/10 text-[#E07B20] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
              Add-On · Coming Soon
            </div>
            <h4 className="text-lg font-bold text-[#6a256f] mb-2">Sphere AI</h4>
            <p className="text-gray-400 text-sm mb-5 flex-1">Layer AI automation on top of Sphere — automated lead capture, smart follow-ups, and booking workflows that run 24/7 without lifting a finger.</p>
            <Link href="/contact"
              className="w-full bg-[#6a256f] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all text-sm text-center">
              Join the Waitlist →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
