import PlaybookLeadForm from '@/components/PlaybookLeadForm'

export const metadata = {
  title: 'Free Playbook: Private Event Lead Generation | Event Sphere Solutions',
  description: 'Download the free Private Event Lead Generation Playbook — a step-by-step system covering PR, social content, email, SEO, and exposure partners for restaurants, bars, breweries, and hospitality venues.',
  openGraph: {
    title: 'Free Playbook: Private Event Lead Generation',
    description: 'A step-by-step system for hospitality venues to generate qualified private-event inquiries every day.',
    images: [{ url: '/feature-image.png', width: 1200, height: 630, alt: 'Private Event Lead Generation Playbook' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Playbook: Private Event Lead Generation',
    description: 'A step-by-step system for hospitality venues to generate qualified private-event inquiries every day.',
    images: ['/feature-image.png'],
  },
}

const pillars = [
  { num: '1', title: 'PR & Media', desc: 'Press releases, local media outreach, and influencer partnerships that build credibility before you spend on ads.' },
  { num: '2', title: 'Social + CTA System', desc: 'A content framework where every post, story, and reel carries a specific call to action.' },
  { num: '3', title: 'Email Marketing', desc: 'An automated monthly campaign that runs itself.' },
  { num: '4', title: 'SEO', desc: 'The keywords and local-search tactics that get your venue found.' },
  { num: '5', title: 'Exposure Partners', desc: 'The tourism sites, associations, and directories worth a listing.' },
]

export default function PlaybookPage() {
  return (
    <main className="pt-28 pb-20 bg-white">
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <span className="inline-block bg-[#E07B20] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
            Free Guide
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#222123] leading-tight mb-6">
            The Private Event Lead Generation Playbook
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            A step-by-step system for restaurants, bars, breweries, boutique hotels, country clubs, and other hospitality venues to generate qualified private-event inquiries — every day.
          </p>
          <div className="space-y-4">
            {pillars.map((p) => (
              <div key={p.num} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-[#6a256f]/10 text-[#6a256f] font-bold font-display flex items-center justify-center flex-shrink-0">
                  {p.num}
                </div>
                <div>
                  <h3 className="font-bold text-[#222123] text-sm">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:sticky md:top-28">
          <PlaybookLeadForm />
        </div>
      </section>
    </main>
  )
}
