import Link from 'next/link'

export default function V1V2CTA() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <p className="text-[#E07B20] text-xs font-bold uppercase tracking-widest mb-3">Find Your Fit</p>
        <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[#111827] mb-12">
          Which one are you?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* V1 */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#6a256f]/20 hover:shadow-md transition-all">
            <div className="text-[#E07B20] text-xs font-bold uppercase tracking-widest mb-4">V1 — Full Service</div>
            <p className="text-[#6a256f] text-xl font-bold leading-snug mb-2">
              "I need someone to handle events for me."
            </p>
            <p className="text-gray-400 text-sm mb-8">We own the entire process — leads to close.</p>
            <Link href="/contact"
              className="w-full bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm">
              Get Started with V1 →
            </Link>
            <p className="text-xs text-gray-400 mt-3">First month free</p>
          </div>

          {/* V2 */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#6a256f]/20 hover:shadow-md transition-all">
            <div className="text-[#E07B20] text-xs font-bold uppercase tracking-widest mb-4">V2 — Platform Only</div>
            <p className="text-[#6a256f] text-xl font-bold leading-snug mb-2">
              "I just need a better system to manage everything."
            </p>
            <p className="text-gray-400 text-sm mb-8">Your team, our tools. All in one place.</p>
            <Link href="/founding-partner"
              className="w-full bg-[#6a256f] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm">
              Get Started with V2 →
            </Link>
            <p className="text-xs text-gray-400 mt-3">3 months free</p>
          </div>

        </div>

        <p className="text-gray-400 text-xs mt-8">Cancel anytime</p>
      </div>
    </section>
  )
}
