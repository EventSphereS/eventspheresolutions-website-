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
    objectPosition: 'left top',
  },
  {
    number: '02',
    tag: 'Team Communication',
    title: 'No more scattered texts.',
    desc: 'Every conversation, every lead, every team message in one place. Your whole team, in sync.',
    image: '/images/platform-chatbox.png',
    objectFit: 'contain',
  },
  {
    number: '03',
    tag: 'Document Generation',
    title: 'Proposals, BEOs, Invoices — one click.',
    desc: 'Professional documents generated instantly. No copy-paste, no manual formatting.',
    image: '/images/slide-beo.png',
  },
  {
    number: '04',
    tag: 'Calendar & Leads',
    title: 'No double bookings. No missed leads.',
    desc: 'Smart calendar with conflict prevention built in. Every inquiry tracked, every slot protected.',
    image: '/images/platform-calendar.png',
  },
  {
    number: '05',
    tag: 'Marketing & Campaigns',
    title: 'Fill slow seasons. Drive repeat bookings.',
    desc: 'Email campaigns, promo codes, and targeted outreach — all automated inside the platform.',
    image: '/images/platform-campaigns.png',
  },
  {
    number: '06',
    tag: 'AI Assistant',
    title: 'Your venue, always on.',
    desc: 'Our AI assistant chats with leads in real time — answering questions, capturing event details, and moving them toward a booking. 24/7, zero staff required.',
    image: '/images/slide-ai-assistant.png',
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
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-widest mb-3">Sphere Features</p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-[#111827]">
            Everything in one place.
          </h2>
        </div>

        {/* Feature tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'right' : 'left')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 ${
                current === i
                  ? 'bg-[#6a256f] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-[#6a256f] hover:text-[#6a256f]'
              }`}
            >
              {s.tag}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? `translateX(${dir === 'right' ? '12px' : '-12px'})` : 'translateX(0)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          <div className="grid md:grid-cols-2 min-h-[480px]">

            {/* Left — screenshot */}
            <div className="relative bg-[#f5f3f8] min-h-[300px] md:min-h-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={slide.objectFit === 'contain' ? 'object-contain p-6' : 'object-cover'}
                style={{ objectPosition: slide.objectPosition || 'left center' }}
              />
            </div>

            {/* Right — content */}
            <div className="bg-[#0f0a14] flex flex-col justify-center px-10 py-14 relative overflow-hidden">
              {/* Subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(106,37,111,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(224,123,32,0.15) 0%, transparent 70%)', filter: 'blur(30px)' }} />

              {/* Slide number */}
              <div className="absolute bottom-4 right-6 text-white/[0.04] font-display font-extrabold text-[100px] leading-none select-none pointer-events-none">
                {slide.number}
              </div>

              <div className="relative z-10">
                <span className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                  {slide.tag}
                </span>

                <h3 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-white leading-tight mb-4">
                  {slide.title}
                </h3>

                <p className="text-white/50 text-base leading-relaxed mb-8 max-w-sm">
                  {slide.desc}
                </p>

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
                    className="w-10 h-10 rounded-full bg-[#E07B20] text-white flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-all"
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
