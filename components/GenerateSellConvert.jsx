import Image from 'next/image'

const steps = [
  {
    logo: '/images/pev-mark.png',
    logoAlt: 'PEV logo',
    brand: 'PEV',
    brandHref: 'https://privateeventvenue.com',
    brandLabel: 'privateeventvenue.com',
    stage: 'Generate',
    title: 'Leads that come to you',
    points: ['Your venue listed and promoted', 'Hosts actively searching for a space', 'Inquiries sent straight to your pipeline'],
  },
  {
    logo: '/images/logo-mark.png',
    logoAlt: 'Event Sphere Solutions logo',
    brand: 'Event Sphere Solutions',
    brandHref: '/about',
    brandLabel: 'Our expert sales team',
    stage: 'Sell',
    title: 'We sell it for you',
    highlight: 'for FREE',
    optional: true,
    points: ['Every inquiry answered fast', 'Proposals, follow-up and site tours', '18 years of event sales expertise'],
  },
  {
    logo: '/images/sphere-logo.jpg',
    logoAlt: 'SPHERE logo',
    fullBleed: true,
    brand: 'SPHERE',
    brandHref: 'https://spherehost.io',
    brandLabel: 'spherehost.io',
    stage: 'Manage & Convert',
    title: 'Into revenue',
    points: ['One pipeline for every lead', 'E-signatures and deposits', 'Reporting by stage'],
  },
]

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 text-[#EF4561]/50 ${className}`} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export default function GenerateSellConvert() {
  return (
    <section className="py-24 bg-[#f8f3f9]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-[#3b1240] mb-4">
            Generate. Sell. Convert.
          </h2>
          <p className="text-gray-500 text-lg">One team, from first lead to signed, deposited event.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-4">
          {steps.map((s, i) => (
            <div key={s.stage} className="contents">
              <div className="flex-1 flex flex-col items-center text-center max-w-xs">
                <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-[#6A256F] via-[#EF4561] to-[#F99F33] shadow-lg shadow-[#6A256F]/15 mb-6">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {s.fullBleed ? (
                      <Image src={s.logo} alt={s.logoAlt} width={96} height={96} className="w-full h-full object-cover" />
                    ) : (
                      <Image src={s.logo} alt={s.logoAlt} width={68} height={80} className="w-[68px] h-[68px] object-contain" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-[#EF4561] text-xs font-bold uppercase tracking-[0.2em]">{s.stage}</p>
                  {s.optional && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A256F] bg-[#6A256F]/10 px-2 py-0.5 rounded-full">Optional</span>
                  )}
                </div>
                <h3 className="text-xl font-extrabold font-display text-[#3b1240] mb-1">
                  {s.title}
                  {s.highlight && (
                    <>
                      {' '}
                      <span className="bg-gradient-to-r from-[#EF4561] to-[#F99F33] bg-clip-text text-transparent">{s.highlight}</span>
                    </>
                  )}
                </h3>
                <a
                  href={s.brandHref}
                  {...(s.brandHref.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-sm font-semibold text-[#6A256F] hover:underline mb-4"
                >
                  {s.brand} <span className="text-gray-400 font-normal">· {s.brandLabel}</span>
                </a>
                <ul className="space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="text-gray-500 text-sm">{p}</li>
                  ))}
                </ul>
              </div>
              {i < steps.length - 1 && (
                <>
                  <Arrow className="hidden md:block mt-9 shrink-0" />
                  <Arrow className="md:hidden rotate-90" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
