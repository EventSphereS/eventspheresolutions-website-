import Link from 'next/link'
import Image from 'next/image'
import { Playfair_Display, Caveat } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-caveat',
})

export const metadata = {
  title: { absolute: 'Samia Kohler — Founder & CEO, Event Sphere Solutions' },
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
    <div className={`${playfair.variable} ${caveat.variable}`}>
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-[#F4EFE1]/95 backdrop-blur border-b border-[#5A2320]/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#top"
            className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#5A2320] tracking-wide uppercase"
          >
            Samia Kohler
          </a>
          <nav className="hidden sm:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2B221D]/70 hover:text-[#5A2320] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="bg-[#CBB89A] text-[#2B221D] text-xs font-bold uppercase tracking-[0.1em] px-5 py-2.5 rounded-full hover:bg-[#bfa989] transition-colors"
          >
            Book Me to Speak
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="top" className="relative min-h-[560px] md:min-h-[680px] flex items-end scroll-mt-16">
          <Image
            src="/images/founder.jpg"
            alt="Samia Kohler"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: '50% 15%' }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(90,35,32,0.15) 0%, rgba(43,34,29,0.85) 100%)' }}
          />
          <div className="relative z-10 max-w-3xl mx-auto px-6 pb-16 md:pb-24 text-center text-white">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl leading-[1.1] tracking-tight mb-6">
              Build <em className="italic">the</em> Life &amp; Career You Bet on Yourself For
            </h1>
            <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
              18 years building private-events revenue for hospitality — now building the
              platform for it.
            </p>
            <a
              href="#contact"
              className="inline-block bg-[#CBB89A] text-[#2B221D] font-bold uppercase text-xs tracking-[0.1em] px-8 py-4 rounded-full hover:bg-white transition-colors"
            >
              Book Me to Speak
            </a>
          </div>
        </section>

        {/* Retro Callout Band */}
        <section className="bg-[#F4EFE1] py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-6 mb-6 text-[#5A2320]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8z" />
              </svg>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="8" y1="22" x2="16" y2="22" />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-4xl text-[#5A2320] leading-tight mb-4">
              18 Years in Hospitality. One Company Built on Her Own Terms.
            </h2>
            <p className="text-[#2B221D]/70 text-base md:text-lg max-w-xl mx-auto mb-6">
              I spent nearly two decades solving the same revenue problem for other people&apos;s
              venues. Event Sphere Solutions is what happened when I decided to build with that
              expertise instead of lending it out.
            </p>
            <a href="#contact" className="font-[family-name:var(--font-caveat)] text-2xl text-[#5A2320] hover:underline">
              Let&apos;s talk today →
            </a>
          </div>
        </section>

        {/* Meet Samia */}
        <section id="story" className="bg-[#5A2320] text-white py-20 md:py-28 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[340px_1fr] gap-14 items-center">
            <div className="relative h-[380px] mx-auto w-full max-w-[300px]">
              <div className="absolute top-0 left-0 w-44 rotate-[-6deg] bg-white p-2 pb-8 shadow-xl">
                <div className="relative w-full h-52">
                  <Image
                    src="/images/founder.jpg"
                    alt="Samia Kohler"
                    fill
                    sizes="176px"
                    className="object-cover"
                    style={{ objectPosition: '50% 10%' }}
                  />
                </div>
              </div>
              <div className="absolute top-16 right-0 w-40 rotate-[5deg] bg-white p-2 pb-8 shadow-xl">
                <div className="relative w-full h-48">
                  <Image
                    src="/images/founder.jpg"
                    alt="Samia Kohler"
                    fill
                    sizes="160px"
                    className="object-cover"
                    style={{ objectPosition: '50% 40%' }}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-6 w-40 rotate-[3deg] bg-white p-2 pb-8 shadow-xl">
                <div className="relative w-full h-48">
                  <Image
                    src="/images/founder.jpg"
                    alt="Samia Kohler"
                    fill
                    sizes="160px"
                    className="object-cover"
                    style={{ objectPosition: '50% 70%' }}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#CBB89A] text-xs font-bold uppercase tracking-[0.2em] mb-4">Meet Samia</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl mb-8 leading-tight">
                I didn&apos;t come into hospitality from the outside — I was born into it.
              </h2>
              <div className="space-y-5 text-white/80 leading-relaxed">
                <p>
                  My grandmother was a cook. My mother owns a catering company and has produced
                  festivals and large-scale events for years. I grew up around the pressure and
                  choreography of live events before I even had words for what I was absorbing.
                </p>
                <p>
                  That turned into a career: 18 years working inside venues across Europe,
                  Shanghai, Hong Kong, and Phoenix. Everywhere I went, I saw the same thing —
                  venues underperforming on private events revenue, not because of low demand, but
                  because they lacked the systems and infrastructure to capture it.
                </p>
                <p>
                  It came out of a breaking point. I was at a company whose values no longer
                  matched mine, and I hit a wall — not just tired, genuinely depleted. I&apos;d
                  spent nearly two decades solving this exact problem for other people while
                  capping my own potential. Why was I lending it out instead of building with it?
                </p>
              </div>
              <blockquote className="mt-8 border-l-4 border-[#CBB89A] pl-6 font-[family-name:var(--font-playfair)] italic text-xl leading-snug">
                &ldquo;Starting Event Sphere Solutions wasn&apos;t a calculated pivot. It was an
                act of finally trusting myself enough to stop giving my best to others.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* Featured In */}
        <section className="bg-white py-14">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[#2B221D]/50 text-xs font-bold uppercase tracking-[0.25em] mb-5">Featured In</p>
            <a
              href="https://canvasrebel.com/meet-samia-kohler/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl tracking-[0.05em] text-[#2B221D] uppercase hover:text-[#5A2320] transition-colors"
            >
              CanvasRebel Magazine
            </a>
          </div>
        </section>

        {/* Results Band */}
        <section className="relative py-24 md:py-32">
          <Image
            src="/images/founder.jpg"
            alt="Samia Kohler"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: '30% 30%' }}
          />
          <div className="absolute inset-0 bg-[#2B221D]/75" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
            <p className="text-[#CBB89A] text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Venues I&apos;ve worked with have seen
            </p>
            <p className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl leading-tight">
              189%+ Increase in
              <br className="hidden md:block" /> Private Event Bookings
            </p>
          </div>
        </section>

        {/* What I Built: SPHERE */}
        <section className="bg-[#F4EFE1] py-20">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-[#5A2320] text-xs font-bold uppercase tracking-widest mb-3">What I Built</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#2B221D] mb-10 max-w-2xl leading-tight">
              SPHERE — the private events sales platform hospitality didn&apos;t have.
            </h2>
            <div className="grid md:grid-cols-[1fr_260px] gap-12 items-start">
              <div className="space-y-5 text-[#2B221D]/75 leading-relaxed text-lg">
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
                <p className="font-semibold text-[#2B221D]">
                  In hospitality, human connection isn&apos;t a nice extra — it&apos;s the actual
                  product. AI stays in the background, quietly clearing away the administrative
                  friction that eats up a team&apos;s time.
                </p>
              </div>
              <div className="bg-[#5A2320] rounded-2xl p-8 text-center shadow-lg">
                <div className="font-[family-name:var(--font-playfair)] text-5xl text-[#CBB89A] leading-none mb-3">
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
        <section id="speaking" className="bg-white py-20 scroll-mt-16">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-[#5A2320] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Speaking &amp; Leadership
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#2B221D] mb-6 leading-tight">
              Women in Tech &amp; Leadership
            </h2>
            <div className="space-y-5 text-[#2B221D]/75 leading-relaxed text-lg mb-8">
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
            <div className="bg-[#F4EFE1] rounded-2xl p-6 border border-[#5A2320]/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#5A2320] flex-shrink-0" />
              <div>
                <div className="font-bold text-[#5A2320]">AZ Tech Week — Panel</div>
                <div className="text-[#2B221D]/60 text-sm">Women in Tech and Leadership</div>
              </div>
            </div>
          </div>
        </section>

        {/* Press */}
        <section id="press" className="bg-[#F4EFE1] py-20 scroll-mt-16">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-[#5A2320] text-xs font-bold uppercase tracking-[0.2em] mb-3">Press</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#2B221D] mb-8 leading-tight">
              Featured
            </h2>
            <a
              href="https://canvasrebel.com/meet-samia-kohler/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-2xl p-8 border border-[#5A2320]/10 hover:shadow-md transition-all"
            >
              <div className="text-[#5A2320] text-xs font-bold uppercase tracking-widest mb-3">
                CanvasRebel Magazine · July 2026
              </div>
              <div className="font-[family-name:var(--font-playfair)] text-xl text-[#2B221D] mb-4">
                Meet Samia Kohler
              </div>
              <p className="text-[#2B221D]/70 italic leading-relaxed">
                &ldquo;I genuinely believe that the most difficult path is usually the one worth
                taking.&rdquo;
              </p>
              <span className="inline-block mt-4 text-sm font-semibold text-[#5A2320]">
                Read the feature →
              </span>
            </a>
          </div>
        </section>

        {/* Contact / Booking */}
        <section id="contact" className="bg-[#5A2320] text-white text-center py-20 scroll-mt-16">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl mb-6 leading-tight">
              Book Me for Your Podcast or Panel
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Speaking on women in tech and leadership, building a hospitality-tech company from
              the floor up, and what it takes to bet on yourself.
            </p>
            <a
              href="mailto:hello@eventspheresolutions.com"
              className="bg-[#CBB89A] text-[#2B221D] font-bold px-8 py-4 rounded-full hover:bg-white transition-colors inline-block shadow-lg mb-8"
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
      </main>
    </div>
  )
}
