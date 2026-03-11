'use client'

import { useState } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    quote: "Having Event Sphere Solutions take the reins on our private event sales has been such a relief. We can finally focus on our day-to-day operations knowing that side of the business is in great hands!",
    name: "Kim Hayashi",
    role: "Operation Manager, Cheeky Concept",
  },
  {
    quote: "We love working with Event Sphere Solutions because they handle everything and we still get to enjoy the results!",
    name: "David Tyda",
    role: "Owner, Balcna Agaveria",
  },
]

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const t = testimonials[current]

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/candle-table.jpg"
          alt="Elegant private event"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Client Stories</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-white">They trust us.</h2>
        </div>

        <div className="relative px-14 md:px-20">
          {/* Left arrow — outside card */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:border-[#E07B20] hover:text-[#E07B20] transition-colors z-10"
            aria-label="Previous"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-10 lg:p-14 text-center">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-[#E07B20] fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed font-serif italic mb-8 max-w-2xl mx-auto">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Attribution */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E07B20] flex items-center justify-center text-white font-bold font-display text-base shrink-0">
                {t.name.charAt(0)}
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-sm">{t.name}</div>
                <div className="text-white/50 text-xs">{t.role}</div>
              </div>
            </div>
          </div>

          {/* Right arrow — outside card */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:border-[#E07B20] hover:text-[#E07B20] transition-colors z-10"
            aria-label="Next"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-[#E07B20] w-6' : 'bg-white/40 w-2'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
