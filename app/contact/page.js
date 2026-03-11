import ContactForm from '@/components/ContactForm'
import Image from 'next/image'

export const metadata = {
  title: 'Book a Free Consultation | Event Sphere Solutions',
  description: 'Stop losing private event revenue. Book a free consultation and we\'ll show you exactly how to fix it.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[360px] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/hero-celebration.jpg" alt="Private event" fill className="object-cover object-center" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,3,14,0.93) 0%, rgba(106,37,111,0.85) 55%, rgba(10,3,14,0.75) 100%)' }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-gray-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#E07B20] rounded-full animate-pulse"></span>
            Free 30-Minute Consultation
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white mb-5 leading-tight">
            Every empty date is<br />revenue <span className="text-[#E07B20]">walking out the door.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Book a free call and we'll show you exactly how much your venue is leaving on the table — and how to fix it.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Left — Why Book */}
          <div className="md:sticky md:top-28">
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-widest mb-3">Free 30-Min Call</p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-[#222123] leading-tight mb-4">
              In one call, you'll know exactly<br />
              <span className="text-[#6a256f]">what you're leaving on the table.</span>
            </h2>
            <p className="text-gray-500 text-base mb-10 leading-relaxed">
              No pitch. No pressure. Just a clear picture of your event revenue potential and a roadmap to capture it.
            </p>

            {/* Value cards */}
            <div className="space-y-4 mb-10">
              {[
                {
                  gradient: 'from-[#6a256f] to-[#8a3a8f]',
                  icon: '🎯',
                  title: 'Custom Revenue Audit',
                  desc: 'We analyze your current setup and show you exactly how much private event revenue you could be generating.',
                },
                {
                  gradient: 'from-[#EF4561] to-[#E07B20]',
                  icon: '💡',
                  title: 'Expert Strategy',
                  desc: 'Get a tailored action plan from specialists who work exclusively with hospitality businesses.',
                },
                {
                  gradient: 'from-[#E07B20] to-[#f7b733]',
                  icon: '✅',
                  title: '100% Free, No Obligation',
                  desc: "You'll walk away with clarity and a roadmap — whether we work together or not.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#6a256f]/20 hover:shadow-md transition-all group">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-lg shrink-0 shadow-sm`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#222123] mb-1 text-sm">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="mailto:hello@eventspheresolutions.com"
                className="flex items-center justify-center gap-2 bg-[#6a256f] text-white font-semibold text-sm px-5 py-3 rounded-full hover:opacity-90 transition-all">
                <span className="text-base">✉</span>
                hello@eventspheresolutions.com
              </a>
              <a href="https://wa.me/16028263834"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm px-5 py-3 rounded-full hover:opacity-90 transition-all">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/80 p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
