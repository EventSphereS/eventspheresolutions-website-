'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const slides = [
  {
    number: '01',
    tag: 'Proposals & Payments',
    title: 'One link closes the deal.',
    desc: 'Send a stunning branded proposal, collect the e-signature, and process the deposit — all in a single link. No back-and-forth, no chasing.',
    image: '/images/slide-proposal.png',
    objectPosition: 'center 30%',
    scale: 1.4,
  },
  {
    number: '02',
    tag: 'Team Communication',
    title: 'Your whole team, finally in sync.',
    desc: 'Stop losing event details across texts and emails. Every conversation, lead note, and team message lives in one place — visible to everyone who needs it.',
    image: '/images/platform-chatbox.png',
    objectFit: 'contain',
    scale: 1,
  },
  {
    number: '03',
    tag: 'Document Generation',
    title: 'Proposals, BEOs, Invoices — one click.',
    desc: 'Generate polished, on-brand documents in seconds. No copy-pasting, no formatting headaches — just professional docs that impress every client.',
    image: '/images/slide-beo.png',
    scale: 1.3,
    objectPosition: 'center top',
  },
  {
    number: '04',
    tag: 'Calendar & Leads',
    title: 'Zero double bookings. Zero missed leads.',
    desc: 'A smart calendar that protects every slot and a pipeline that captures every inquiry. Nothing slips through the cracks — ever.',
    image: '/images/platform-calendar.png',
    scale: 1.2,
    objectPosition: 'center top',
  },
  {
    number: '05',
    tag: 'Marketing & Campaigns',
    title: 'Fill slow seasons before they hit.',
    desc: 'Launch targeted email campaigns, drop promo codes, and drive repeat bookings — all from inside Sphere. No third-party tools needed.',
    image: '/images/platform-campaigns.png',
    scale: 1.2,
    objectPosition: 'center top',
  },
  {
    number: '06',
    tag: 'AI Assistant',
    title: 'Your venue sells itself — 24/7.',
    desc: 'Sphere\'s AI assistant responds to leads in real time, captures event details, and moves prospects toward a booking — even while you sleep.',
    image: '/images/slide-ai-assistant.png',
    scale: 1.2,
    objectPosition: 'center top',
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
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.25em] mb-4">Inside Sphere</p>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            Every tool your team needs<br />
            <span style={{ background: 'linear-gradient(90deg, #E07B20, #EF4561)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              to sell more events.
            </span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">
            From the first inquiry to the signed contract — Sphere handles every step of your private event sales process.
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
          <div className="grid md:grid-cols-2 min-h-[520px]">

            {/* Left — screenshot */}
            <div className="relative min-h-[300px] md:min-h-0 overflow-hidden" style={{ background: '#f0edf6' }}>
              <div className="absolute inset-x-0 top-0 h-12 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, #f0edf6, transparent)' }} />
              <div className="absolute inset-x-0 bottom-0 h-16 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #f0edf6, transparent)' }} />
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={slide.objectFit === 'contain' ? 'object-contain p-6' : 'object-cover'}
                style={{
                  objectPosition: slide.objectPosition || 'center center',
                  transform: `scale(${slide.scale || 1})`,
                  transformOrigin: 'center center',
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
                {slide.number}
              </div>

              <div className="relative z-10">
                <span className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-5 block">
                  {slide.tag}
                </span>

                <h3 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-white leading-tight mb-5">
                  {slide.title}
                </h3>

                <p className="text-white/55 text-base leading-relaxed mb-10 max-w-sm">
                  {slide.desc}
                </p>

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
