'use client'
import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 'team',
    question: 'Do you have someone handling private event sales in-house?',
    options: [
      { label: "No — it's mostly me or we're stretched thin", value: 'no', points: 'v1' },
      { label: 'Yes — we have a sales person or coordinator', value: 'yes', points: 'v2' },
    ],
  },
  {
    id: 'involvement',
    question: 'How involved do you want to be in the day-to-day sales process?',
    options: [
      { label: 'As little as possible — I want it handled for me', value: 'low', points: 'v1' },
      { label: 'I want full control with the right tools', value: 'high', points: 'v2' },
    ],
  },
  {
    id: 'challenge',
    question: "What's your biggest challenge right now?",
    options: [
      { label: "I don't have the time or team to chase leads", value: 'time', points: 'v1' },
      { label: 'I need a better system — the process is scattered', value: 'system', points: 'v2' },
    ],
  },
]

const results = {
  v1: {
    version: 'V1',
    label: 'Full Service',
    headline: 'You need V1 — Platform + Expert Sales Team.',
    desc: 'You\'re running a busy venue and don\'t have the bandwidth to chase every lead, follow up on every inquiry, and close every deal. That\'s exactly what our expert sales team does — so you can focus on your guests.',
    perks: [
      'Dedicated sales team handles your private events end-to-end',
      'Lead capture, follow-up, proposals & contract management',
      'Full platform access included',
      'First month free',
    ],
    cta: 'Get Started with V1',
    href: '/contact',
    free: '1 month free',
    color: 'from-[#6a256f] via-[#EF4561] to-[#E07B20]',
  },
  v2: {
    version: 'V2',
    label: 'Self-Serve Platform',
    headline: 'You need V2 — The Platform, Your Way.',
    desc: 'You have the team or the drive — you just need the right system. Event Sphere gives you everything to capture leads, send proposals, manage your calendar, and run email campaigns, all in one place.',
    perks: [
      'Full platform access — all features',
      'Lead pipeline, proposals, BEOs & invoices',
      'Smart calendar & email campaigns',
      '3 months free',
    ],
    cta: 'Get Started with V2',
    href: '/founding-partner',
    free: '3 months free',
    color: 'from-[#6a256f] to-[#222123]',
  },
}

export default function PricingQuiz() {
  const [step, setStep] = useState(0) // 0 = intro, 1-3 = questions, 4 = result
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)

  function handleAnswer(points) {
    const next = [...answers, points]
    setAnswers(next)
    setSelected(null)
    if (next.length === questions.length) {
      setStep(4)
    } else {
      setStep(step + 1)
    }
  }

  function getResult() {
    const v1 = answers.filter(a => a === 'v1').length
    const v2 = answers.filter(a => a === 'v2').length
    return v1 >= v2 ? results.v1 : results.v2
  }

  function reset() {
    setStep(0)
    setAnswers([])
    setSelected(null)
  }

  const currentQ = questions[step - 1]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Intro */}
      {step === 0 && (
        <div className="text-center">
          <div className="inline-block bg-[#E07B20]/15 text-[#E07B20] text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            3 quick questions
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-[#6a256f] mb-4">
            Not sure which is right for you?
          </h3>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Answer 3 questions and we'll tell you exactly which version fits your business — V1 with our expert sales team, or V2 with just the platform.
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
      {step >= 1 && step <= 3 && (
        <div>
          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i < step ? 'bg-[#E07B20]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">
            Question {step} of {questions.length}
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-display text-[#6a256f] mb-8 leading-snug">
            {currentQ.question}
          </h3>

          <div className="flex flex-col gap-4">
            {currentQ.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.points)}
                className="w-full text-left px-6 py-5 rounded-xl border-2 border-gray-100 bg-white hover:border-[#6a256f] hover:bg-[#6a256f]/5 transition-all group font-medium text-gray-700 hover:text-[#6a256f] flex items-center justify-between"
              >
                <span>{opt.label}</span>
                <span className="text-gray-300 group-hover:text-[#6a256f] text-lg">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {step === 4 && (() => {
        const r = getResult()
        return (
          <div className="text-center">
            <div className={`inline-block bg-gradient-to-r ${r.color} text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest`}>
              {r.version} — {r.label}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-[#6a256f] mb-4 leading-snug">
              {r.headline}
            </h3>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-lg mx-auto">
              {r.desc}
            </p>
            <ul className="text-left space-y-3 mb-8 max-w-sm mx-auto">
              {r.perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="text-[#E07B20] font-bold mt-0.5">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={r.href}
                className={`bg-gradient-to-r ${r.color} text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-lg inline-block`}
              >
                {r.cta} — {r.free} →
              </Link>
              <button
                onClick={reset}
                className="text-gray-400 text-sm hover:text-gray-600 transition-colors px-4 py-4"
              >
                Start over
              </button>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
