'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    tag: 'Lead Capture',
    title: 'Never miss an inquiry again.',
    desc: 'Guests reach you three ways: your website inquiry form, a text message, or a call answered by Sarah, your optional sales concierge. Day or night, weekday or weekend.',
    timeline: [
      { when: 'Fri, 9:00 PM', what: 'A large group inquiry comes in.' },
      { when: 'Mon, 10:00 AM', what: 'You finally reply.' },
      { when: 'Sat', what: "They've already booked somewhere else." },
    ],
    closer: 'Speed wins large group events.',
    image: '/images/demo-lead-capture.png',
  },
  {
    tag: '360° Tours',
    title: 'Let them walk the room before they visit.',
    desc: 'A 360° tour of every space, right inside the inquiry flow. Sarah shortlists the spaces that fit the party, and the guest goes straight to an express proposal.',
    image: '/images/demo-360-tours.png',
  },
  {
    tag: 'Proposals & Payments',
    title: 'One link closes the deal.',
    desc: 'A branded proposal they can read on their phone. They review it, sign the contract and pay the deposit in one tap. Payments run on Stripe, secure and PCI-compliant.',
    image: '/images/demo-proposals.png',
    href: '/platform/digital-contracts',
  },
  {
    tag: 'Leads & BEOs',
    title: 'Every lead tracked. Every BEO ready.',
    desc: 'See every lead by stage, from new to booked, with your pipeline value at a glance. Once it books, the staff BEO is ready: timeline, kitchen prep and special requests for the whole team.',
    image: '/images/demo-leads-beo.png',
    href: '/platform/banquet-event-orders',
  },
  {
    tag: 'Calendar',
    title: 'Zero double bookings.',
    desc: 'Every space on one calendar, color-coded by room. Try to book the patio twice and SPHERE stops you before it becomes a problem.',
    image: '/images/demo-calendar.png',
    href: '/platform/venue-calendar',
  },
  {
    tag: 'Marketing & Campaigns',
    title: 'Fill slow seasons before they hit.',
    desc: 'Branded campaigns for holiday parties, graduations and summer buyouts. Pick the audience, schedule the send, and the inquiries come back into your pipeline.',
    image: '/images/demo-campaigns.png',
  },
  {
    tag: 'Dashboard & Reporting',
    title: 'Your event sales at a glance.',
    desc: 'Revenue, conversion rate and average event value up top. Confirmed, in process and lost deals, a 3-month revenue forecast, and follow-up reminders on your phone so no deal goes quiet.',
    image: '/images/demo-dashboard.png',
  },
]

export default function FeatureSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [dir, setDir] = useState('right')

  const goTo = useCallback((index, direction = 'right') => {
    if (animating || index === current) return
    setDir(direction)
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 250)
  }, [animating, current])

  const prev = () => goTo(Math.max(current - 1, 0), 'left')
  const next = () => goTo(Math.min(current + 1, slides.length - 1), 'right')

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, animating])

  const slide = slides[current]

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0f40 0%, #2d0a35 50%, #1a0f40 100%)' }}>

      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(106,37,111,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(224,123,32,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.25em] mb-4">Inside SPHERE</p>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            Every tool your team needs<br />
            <span style={{ background: 'linear-gradient(90deg, #E07B20, #EF4561)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              to sell more events.
            </span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">
            From the first inquiry to the signed contract, SPHERE handles every step of the large group event sales process.
          </p>
        </div>

        {/* Feature tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'right' : 'left')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 ${
                current === i
                  ? 'bg-[#E07B20] text-white shadow-lg shadow-[#E07B20]/30'
                  : 'bg-white/10 border border-white/15 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              {s.tag}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? `translateX(${dir === 'right' ? '16px' : '-16px'})` : 'translateX(0)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          <div className="grid md:grid-cols-[60%_40%] min-h-[520px]">

            {/* Left — screenshot */}
            <div className="relative min-h-[300px] md:min-h-0 overflow-hidden" style={{ background: 'transparent' }}>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4"
                style={{
                  objectPosition: slide.objectPosition || 'center center',
                  transform: `scale(${slide.scale || 1})`,
                  transformOrigin: slide.transformOrigin || 'center center',
                  transition: 'transform 0.3s ease',
                }}
              />
            </div>

            {/* Right — content */}
            <div className="flex flex-col justify-center px-10 py-14 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0f0a14 0%, #1a0535 100%)' }}>

              {/* Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(106,37,111,0.5) 0%, transparent 70%)', filter: 'blur(40px)' }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(224,123,32,0.2) 0%, transparent 70%)', filter: 'blur(30px)' }} />

              {/* Big slide number watermark */}
              <div className="absolute bottom-4 right-6 text-white/[0.04] font-display font-extrabold text-[100px] leading-none select-none pointer-events-none">
                {String(current + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10">
                <span className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-5 block">
                  {slide.tag}
                </span>

                <h3 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-white leading-tight mb-5">
                  {slide.title}
                </h3>

                <p className={`text-white/55 text-base leading-relaxed max-w-sm ${slide.timeline ? 'mb-6' : 'mb-10'}`}>
                  {slide.desc}
                </p>

                {slide.href && (
                  <Link href={slide.href} className="inline-block text-[#E07B20] font-semibold text-sm mb-6 hover:underline">
                    Learn more →
                  </Link>
                )}

                {slide.timeline && (
                  <div className="mb-8">
                    <ol className="relative border-l border-white/15 ml-1.5 space-y-3 mb-4">
                      {slide.timeline.map((t, i) => {
                        const last = i === slide.timeline.length - 1
                        return (
                          <li key={t.when} className="pl-5 relative">
                            <span className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${last ? 'bg-[#EF4561]' : 'bg-white/40'}`} />
                            <span className="text-white/35 text-[11px] font-bold uppercase tracking-widest mr-2">{t.when}</span>
                            <span className={`text-sm font-semibold ${last ? 'text-[#EF4561]' : 'text-white/80'}`}>{t.what}</span>
                          </li>
                        )
                      })}
                    </ol>
                    <p className="text-white font-bold">{slide.closer}</p>
                  </div>
                )}

                {/* Progress dots */}
                <div className="flex items-center gap-2 mb-6">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i, i > current ? 'right' : 'left')}
                      className={`rounded-full transition-all duration-300 ${
                        i === current ? 'w-6 h-2 bg-[#E07B20]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Nav buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    disabled={current === 0}
                    className="w-10 h-10 rounded-full border border-white/20 text-white/60 flex items-center justify-center hover:border-white/50 hover:text-white disabled:opacity-20 transition-all"
                  >←</button>
                  <button
                    onClick={next}
                    disabled={current === slides.length - 1}
                    className="w-10 h-10 rounded-full bg-[#E07B20] text-white flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-all shadow-lg shadow-[#E07B20]/30"
                  >→</button>
                  <span className="text-white/25 text-xs font-mono ml-2">
                    {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
