'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    number: '01',
    tag: 'Proposals & Payments',
    title: 'One link closes the deal.',
    desc: 'Send a branded proposal, collect the e-signature, and process the deposit — all in one link.',
    image: '/images/slide-proposal.png',
    blend: 'multiply',
    pocketBg: '#f0edf5',
  },
  {
    number: '02',
    tag: 'Team Communication',
    title: 'No more scattered texts.',
    desc: 'Every conversation, every lead, every team message in one place. Your whole team, in sync.',
    image: '/images/platform-chatbox.png',
    blend: 'normal',
    objectFit: 'contain',
    objectPosition: 'center center',
    pocketBg: '#f5f3f7',
  },
  {
    number: '03',
    tag: 'Document Generation',
    title: 'Proposals, BEOs, Invoices — one click.',
    desc: 'Professional documents generated instantly. No copy-paste, no manual formatting.',
    image: '/images/slide-beo.png',
    blend: 'normal',
    pocketBg: '#ffffff',
  },
  {
    number: '04',
    tag: 'Calendar & Leads',
    title: 'No double bookings. No missed leads.',
    desc: 'Smart calendar with conflict prevention built in. Every inquiry tracked, every slot protected.',
    image: '/images/platform-calendar.png',
    blend: 'multiply',
  },
  {
    number: '05',
    tag: 'Marketing & Campaigns',
    title: 'Fill slow seasons. Drive repeat bookings.',
    desc: 'Email campaigns, promo codes, and targeted outreach — all automated inside the platform.',
    image: '/images/platform-campaigns.png',
    blend: 'multiply',
  },
  {
    number: '06',
    tag: 'AI Assistant',
    title: 'Your venue, always on.',
    desc: 'Our AI assistant chats with leads in real time — answering questions, capturing event details, and moving them toward a booking. 24/7, zero staff required.',
    image: '/images/slide-ai-assistant.png',
    blend: 'normal',
  },
]

const BG = '#ffffff'

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
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-widest mb-3">Platform Features</p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-[#6a256f] leading-tight">
            Everything in one place.
          </h2>
        </div>

        {/* Wrapper — arrows + card + floating image */}
        <div className="relative" style={{ minHeight: '520px' }}>

          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-30 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-400 hover:border-[#6a256f] hover:text-[#6a256f] disabled:opacity-20 transition-all"
          >←</button>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-30 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-400 hover:border-[#6a256f] hover:text-[#6a256f] disabled:opacity-20 transition-all"
          >→</button>

          {/* ── Dark card — full width ── */}
          <div
            className="absolute inset-0 bg-[#1e0d24] rounded-3xl shadow-2xl hidden md:block overflow-hidden"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? `translateX(${dir === 'right' ? '16px' : '-16px'})` : 'translateX(0)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
          >
            <div className="absolute bottom-2 right-6 text-white/5 font-display font-extrabold text-[110px] leading-none select-none pointer-events-none">
              {slide.number}
            </div>
          </div>

          {/* ── Floating image — fills the pocket edge to edge ── */}
          <div
            className="absolute left-[-20px] bottom-0 w-[55%] h-[546px] z-20 hidden md:block rounded-2xl overflow-hidden"
            style={{
              opacity: animating ? 0 : 1,
              transition: 'opacity 0.25s ease',
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, 55vw"
              className={slide.objectFit === 'contain' ? 'object-contain' : 'object-cover'}
              style={{ objectPosition: slide.objectPosition || 'left center' }}
            />
          </div>

          {/* ── Content — right 45% of card ── */}
          <div
            className="absolute inset-y-0 right-0 w-[45%] hidden md:flex flex-col justify-center px-10 py-12 z-10"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? `translateX(${dir === 'right' ? '16px' : '-16px'})` : 'translateX(0)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-5">
                {slide.v3 && (
                  <span className="bg-[#E07B20] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    V3
                  </span>
                )}
                <span className="text-[#E07B20] text-xs font-bold uppercase tracking-widest">
                  {slide.tag}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-white leading-tight mb-4">
                {slide.title}
              </h3>

              <p className="text-white/50 text-base leading-relaxed mb-8 max-w-sm">
                {slide.desc}
              </p>

              {slide.cta ? (
                <Link
                  href={slide.cta.href}
                  className="inline-flex items-center gap-2 bg-[#E07B20] text-white font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-all"
                >
                  {slide.cta.label}
                </Link>
              ) : (
                <button
                  onClick={next}
                  disabled={current === slides.length - 1}
                  className="inline-flex items-center gap-2 border border-[#E07B20] text-[#E07B20] font-semibold text-sm px-7 py-3 rounded-full bg-transparent hover:bg-[#E07B20]/10 disabled:opacity-30 transition-all"
                >
                  Next →
                </button>
              )}
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden bg-[#1e0d24] rounded-3xl p-8 shadow-xl">
            <div className="relative w-full h-52 mb-6">
              <Image src={slide.image} alt={slide.title} fill quality={100} sizes="100vw" className="object-contain" />
            </div>
            <span className="text-[#E07B20] text-xs font-bold uppercase tracking-widest">{slide.tag}</span>
            <h3 className="text-xl font-extrabold font-display text-white mt-2 mb-3">{slide.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{slide.desc}</p>
          </div>

        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8 px-1">
          <div className="flex gap-2 items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 'right' : 'left')}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: current === i ? '28px' : '8px',
                  background: current === i ? '#6a256f' : '#c4b5d4',
                }}
              />
            ))}
          </div>
          <span className="text-[#6a256f]/40 text-xs font-mono">
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>

      </div>
    </section>
  )
}
