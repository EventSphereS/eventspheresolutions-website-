'use client'
import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 'team',
    question: 'Do you have someone in-house handling private event sales?',
    options: [
      { label: "No — it's mostly me or we're stretched thin", points: { salesTeam: 2 } },
      { label: 'Yes — we have a coordinator or sales person', points: { sphere: 2 } },
    ],
  },
  {
    id: 'volume',
    question: 'How many private event inquiries do you receive per month?',
    options: [
      { label: 'A lot — we can barely keep up', points: { ai: 2 } },
      { label: 'A moderate amount — manageable but growing', points: { sphere: 1, ai: 1 } },
      { label: 'Not many yet — we want to grow', points: { salesTeam: 1, sphere: 1 } },
    ],
  },
  {
    id: 'challenge',
    question: "What's your biggest challenge right now?",
    options: [
      { label: "I don't have the bandwidth to chase and close leads", points: { salesTeam: 2 } },
      { label: 'Too much manual work — follow-ups, emails, admin', points: { ai: 2 } },
      { label: 'No system — everything is scattered across emails and spreadsheets', points: { sphere: 2 } },
    ],
  },
  {
    id: 'response',
    question: 'How quickly do you typically respond to a new event inquiry?',
    options: [
      { label: 'Within the hour — we\'re on it', points: { sphere: 2 } },
      { label: 'Same day, usually', points: { sphere: 1, ai: 1 } },
      { label: 'It varies — sometimes days go by', points: { salesTeam: 1, ai: 1 } },
      { label: 'Honestly, some fall through the cracks', points: { salesTeam: 2 } },
    ],
  },
  {
    id: 'goal',
    question: 'What would have the biggest impact on your event revenue?',
    options: [
      { label: 'Having an expert team close more deals for me', points: { salesTeam: 2 } },
      { label: 'Automating the repetitive tasks so I can focus on guests', points: { ai: 2 } },
      { label: 'A better system to manage and track everything', points: { sphere: 2 } },
    ],
  },
  {
    id: 'hours',
    question: 'How many hours per week does your team spend on event admin (emails, proposals, follow-ups)?',
    options: [
      { label: 'Less than 5 hours — it\'s under control', points: { sphere: 2 } },
      { label: '5–10 hours — it\'s eating into our time', points: { ai: 1, sphere: 1 } },
      { label: 'More than 10 hours — it\'s a real problem', points: { ai: 2 } },
      { label: 'We don\'t have anyone dedicated to it at all', points: { salesTeam: 2 } },
    ],
  },
  {
    id: 'afterhours',
    question: 'When a lead comes in after hours or on a weekend, what typically happens?',
    options: [
      { label: 'Someone on our team picks it up quickly', points: { sphere: 2 } },
      { label: 'It waits until the next business day', points: { ai: 1, salesTeam: 1 } },
      { label: 'Honestly, some probably get missed', points: { ai: 2 } },
      { label: 'We have no one to handle it at all', points: { salesTeam: 2 } },
    ],
  },
  {
    id: 'vision',
    question: 'What best describes your vision for private events at your venue?',
    options: [
      { label: 'I want full control and visibility over every booking', points: { sphere: 2 } },
      { label: 'I want to grow but need the right team to make it happen', points: { salesTeam: 2 } },
      { label: 'I want to scale efficiently with smart tools and automation', points: { ai: 2 } },
      { label: 'I want a bit of everything — tools, support, and efficiency', points: { sphere: 1, salesTeam: 1, ai: 1 } },
    ],
  },
]

const results = {
  sphere: {
    label: 'Sphere',
    badge: 'The Platform',
    badgeColor: 'bg-[#6a256f] text-white',
    headline: 'Start with Sphere — your complete event sales platform.',
    desc: 'You have the team and the drive. You just need the right system. Sphere gives you everything to capture leads, send proposals, manage your calendar, and run campaigns — all in one place.',
    perks: ['Lead pipeline & proposals', 'Smart calendar & payments', 'Email campaigns', '3 months free'],
    cta: 'Get Sphere Free →',
    href: '/founding-partner',
    gradient: 'from-[#6a256f] to-[#2d0a35]',
  },
  salesTeam: {
    label: 'Sphere + Sales Team',
    badge: 'Full Service',
    badgeColor: 'bg-[#E07B20] text-white',
    headline: 'Sphere + Sales Team — we handle everything for you.',
    desc: "You're running a busy venue without the bandwidth to chase every lead and close every deal. Our expert sales team does it all — while you focus on your guests.",
    perks: ['Full Sphere platform included', 'Dedicated sales team', 'Lead-to-close management', 'First month free'],
    cta: 'Contact Us →',
    href: '/contact',
    gradient: 'from-[#6a256f] via-[#EF4561] to-[#E07B20]',
  },
  ai: {
    label: 'Sphere AI',
    badge: 'Coming Soon',
    badgeColor: 'bg-gradient-to-r from-[#EF4561] to-[#E07B20] text-white',
    headline: 'Sphere AI — automate the repetitive, focus on what matters.',
    desc: 'High volume, not enough hours. Sphere AI layers automation on top of Sphere — AI lead capture, smart follow-ups, and 24/7 booking workflows that never sleep.',
    perks: ['Full Sphere platform included', 'AI lead capture & follow-up', 'Automated booking workflows', 'Join the waitlist'],
    cta: 'Join the Waitlist →',
    href: '/contact',
    gradient: 'from-[#EF4561] to-[#E07B20]',
  },
}

export default function V1V2CTA() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState({ sphere: 0, salesTeam: 0, ai: 0 })

  function handleAnswer(points) {
    const next = {
      sphere: scores.sphere + (points.sphere || 0),
      salesTeam: scores.salesTeam + (points.salesTeam || 0),
      ai: scores.ai + (points.ai || 0),
    }
    setScores(next)
    if (step + 1 >= questions.length) {
      setStep(questions.length + 1)
    } else {
      setStep(step + 1)
    }
  }

  function getResult() {
    const { sphere, salesTeam, ai } = scores
    if (salesTeam >= sphere && salesTeam >= ai) return results.salesTeam
    if (ai > sphere && ai > salesTeam) return results.ai
    return results.sphere
  }

  function reset() {
    setStep(0)
    setScores({ sphere: 0, salesTeam: 0, ai: 0 })
  }

  const isDone = step > questions.length - 1 && step !== 0
  const currentQ = questions[step]

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-2xl mx-auto px-6 text-center">

        <p className="text-[#E07B20] text-xs font-bold uppercase tracking-widest mb-3">Find Your Fit</p>
        <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[#111827] mb-10">
          Which Sphere is right for you?
        </h2>

        {/* Intro */}
        {step === 0 && (
          <div className="text-center">
            <p className="text-gray-500 text-base mb-8 max-w-md mx-auto">
              Answer 3 quick questions and we'll tell you exactly which option fits your venue.
            </p>
            <button
              onClick={() => setStep(1)}
              className="bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-lg text-base"
            >
              Let's find out →
            </button>
          </div>
        )}

        {/* Questions */}
        {step >= 1 && !isDone && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              {questions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < step ? 'bg-[#E07B20]' : 'bg-gray-200'}`} />
              ))}
            </div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">Question {step} of {questions.length}</p>
            <h3 className="text-xl md:text-2xl font-bold font-display text-[#6a256f] mb-8 leading-snug">
              {currentQ.question}
            </h3>
            <div className="flex flex-col gap-4">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.points)}
                  className="w-full text-left px-6 py-5 rounded-xl border-2 border-gray-100 bg-white hover:border-[#6a256f] hover:bg-[#6a256f]/5 transition-all font-medium text-gray-700 hover:text-[#6a256f] flex items-center justify-between group"
                >
                  <span>{opt.label}</span>
                  <span className="text-gray-300 group-hover:text-[#6a256f] text-lg">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {isDone && (() => {
          const r = getResult()
          return (
            <div className="text-center">
              <div className={`inline-block bg-gradient-to-r ${r.gradient} text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest`}>
                {r.label}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-[#6a256f] mb-4 leading-snug">
                {r.headline}
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8 max-w-lg mx-auto">{r.desc}</p>
              <ul className="text-left space-y-3 mb-8 max-w-sm mx-auto">
                {r.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="text-[#E07B20] font-bold mt-0.5">✓</span> {p}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={r.href} className={`bg-gradient-to-r ${r.gradient} text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-lg inline-block`}>
                  {r.cta}
                </Link>
                <button onClick={reset} className="text-gray-400 text-sm hover:text-gray-600 transition-colors px-4 py-4">
                  Start over
                </button>
              </div>
            </div>
          )
        })()}

        <p className="text-gray-400 text-xs mt-10">Cancel anytime · No credit card required</p>
      </div>
    </section>
  )
}
