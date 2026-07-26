import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Samia Kohler — Founder & CEO, Event Sphere Solutions',
  description: '18 years building private-events revenue for hospitality — now building the platform for it. Book Samia Kohler for your next podcast or panel.',
  openGraph: {
    title: 'Samia Kohler — Founder & CEO, Event Sphere Solutions',
    description: '18 years building private-events revenue for hospitality — now building the platform for it.',
    images: [{ url: '/images/founder.jpg', width: 1200, height: 630, alt: 'Samia Kohler' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samia Kohler — Founder & CEO, Event Sphere Solutions',
    description: '18 years building private-events revenue for hospitality — now building the platform for it.',
    images: ['/images/founder.jpg'],
  },
}

const navLinks = [
  { href: '#story', label: 'Story' },
  { href: '#speaking', label: 'Speaking' },
  { href: '#press', label: 'Press' },
  { href: '#contact', label: 'Contact' },
]

export default function SamiaPage() {
  return (
    <>
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display font-extrabold text-[#6a256f] tracking-tight">
            Samia Kohler
          </a>
          <nav className="hidden sm:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-gray-600 hover:text-[#6a256f] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn-primary !px-5 !py-2 text-sm">
            Book Me
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="py-16 md:py-24 bg-gray-50 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[280px_1fr] gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-72 md:h-80 mx-auto w-72 md:w-full">
            <Image
              src="/images/founder.jpg"
              alt="Samia Kohler"
              fill
              className="object-cover"
              style={{ objectPosition: '50% 8%' }}
              priority
            />
          </div>
          <div>
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Founder &amp; CEO, Event Sphere Solutions · Phoenix, AZ
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#6a256f] mb-6 leading-tight">
              Samia Kohler
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
              18 years building private-events revenue for hospitality — now building the
              platform for it.
            </p>
            <a href="#contact" className="btn-primary">
              Book Me to Speak
            </a>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Story</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[#6a256f] mb-8">
            I didn&apos;t come into hospitality from the outside — I was born into it.
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
            <p>
              My grandmother was a cook. My mother owns a catering company and has produced
              festivals and large-scale events for years. I grew up around the pressure and
              choreography of live events before I even had words for what I was absorbing.
            </p>
            <p>
              That turned into a career: 18 years working inside venues across Europe,
              Shanghai, Hong Kong, and Phoenix. Everywhere I went, I saw the same thing —
              venues underperforming on private events revenue, not because of low demand, but
              because they lacked the systems and infrastructure to capture it. I&apos;d walk
              in, fix that gap, and move the business forward. I did that over and over, for
              other people&apos;s companies.
            </p>
            <p>
              Starting Event Sphere Solutions wasn&apos;t a calculated pivot. It came out of a
              breaking point. I was at a company whose values no longer matched mine, and I hit
              a wall — not just tired, genuinely depleted. In that moment I had the clearest
              thought of my career: I&apos;d spent nearly two decades solving this exact problem
              for other people while capping my own potential. I had the expertise, the track
              record, the instinct. Why was I lending it out instead of building with it?
            </p>
          </div>
          <blockquote className="mt-10 border-l-4 border-[#EF4561] pl-6 text-xl font-display font-semibold text-[#6a256f] leading-snug">
            &ldquo;Starting Event Sphere Solutions wasn&apos;t a calculated pivot. It was an act
            of finally trusting myself enough to stop giving my best to others.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* What I Built: SPHERE */}
      <section className="py-20 bg-[#6a256f] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#F99F33] text-xs font-bold uppercase tracking-widest mb-3">
            What I Built
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight mb-10 max-w-2xl">
            SPHERE — the private events sales platform hospitality didn&apos;t have.
          </h2>
          <div className="grid md:grid-cols-[1fr_260px] gap-12 items-start">
            <div className="space-y-5 text-white/80 leading-relaxed text-lg">
              <p>
                Venues lose a minimum of $250,000 a year in private events revenue — not from
                lack of space or lack of interest, but from lack of sales infrastructure.
                Inquiries go unanswered. Follow-up doesn&apos;t happen. Proposals are an
                afterthought or arrive too late.
              </p>
              <p>
                SPHERE is our private events sales solution for restaurants, bars, hotels, and
                breweries — automated proposals, 360° virtual tours, BEO generation,
                e-signatures, and pipeline management, backed by a dedicated expert sales team
                who can close bookings on a venue&apos;s behalf.
              </p>
              <p className="font-semibold text-white">
                In hospitality, human connection isn&apos;t a nice extra — it&apos;s the actual
                product. AI stays in the background, quietly clearing away the administrative
                friction that eats up a team&apos;s time.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 text-center border border-white/15">
              <div className="text-5xl font-extrabold font-display text-[#F99F33] leading-none mb-3">
                189%+
              </div>
              <div className="text-white/70 text-sm font-semibold uppercase tracking-widest">
                Avg. increase in private event bookings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking & Leadership */}
      <section id="speaking" className="py-20 bg-gray-50 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Speaking &amp; Leadership
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[#6a256f] mb-6">
            Women in Tech &amp; Leadership
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed text-lg mb-8">
            <p>
              I&apos;ve spent my career building in two male-dominated worlds at once —
              hospitality and tech. I&apos;ve walked into boardrooms, ownership meetings, and
              investor pitches where I was consistently the only woman, and often the only one
              who&apos;d actually worked the floor. That&apos;s never been a deterrent.
              It&apos;s been fuel.
            </p>
            <p>
              My resilience isn&apos;t tied to one story — it&apos;s constitutional, built daily
              across years of new countries, new cultures, and rooms where I had to prove I
              belonged. I&apos;ve rebuilt after professional betrayals, after burnout, after
              giving everything to something that didn&apos;t give it back — and come out
              stronger every time.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6a256f] via-[#EF4561] to-[#F99F33] flex-shrink-0" />
            <div>
              <div className="font-bold text-[#6a256f]">AZ Tech Week — Panel</div>
              <div className="text-gray-600 text-sm">Women in Tech and Leadership</div>
            </div>
          </div>
        </div>
      </section>

      {/* Press */}
      <section id="press" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Press</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[#6a256f] mb-8">
            Featured
          </h2>
          <a
            href="https://canvasrebel.com/meet-samia-kohler/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="text-[#E07B20] text-xs font-bold uppercase tracking-widest mb-3">
              CanvasRebel Magazine · July 2026
            </div>
            <div className="text-xl font-bold text-[#6a256f] mb-4">Meet Samia Kohler</div>
            <p className="text-gray-600 italic leading-relaxed">
              &ldquo;I genuinely believe that the most difficult path is usually the one worth
              taking.&rdquo;
            </p>
            <span className="inline-block mt-4 text-sm font-semibold text-[#6a256f]">
              Read the feature →
            </span>
          </a>
        </div>
      </section>

      {/* Contact / Booking */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white text-center scroll-mt-16"
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-6">
            Book Me for Your Podcast or Panel
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Speaking on women in tech and leadership, building a hospitality-tech company from
            the floor up, and what it takes to bet on yourself.
          </p>
          <a
            href="mailto:hello@eventspheresolutions.com"
            className="bg-white text-[#E07B20] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors inline-block shadow-lg mb-8"
          >
            hello@eventspheresolutions.com
          </a>
          <div className="flex items-center justify-center gap-6 text-sm font-semibold">
            <a
              href="https://linkedin.com/in/samia-kohler"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/eventspheresolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
            <Link href="/" className="hover:underline">
              eventspheresolutions.com
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
