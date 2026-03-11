'use client'
import { useState } from 'react'

const businessTypes = ['Restaurant', 'Bar / Nightlife', 'Venue', 'Hotel', 'Multiple locations']
const eventFrequency = ['< 1/month', '1–3/month', '4–8/month', '8+/month']
const currentTools = ['Spreadsheets / email', 'Tripleseat', 'Gather', 'Planning Pod', 'Another CRM', 'Nothing — we wing it']

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#E07B20] focus:ring-2 focus:ring-[#E07B20]/20 transition-all bg-white placeholder:text-gray-400"
const labelClass = "block text-sm font-semibold text-[#222123] mb-1.5"

export default function FoundingPartnerForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    businessName: '', businessType: '', eventFrequency: '',
    currentTool: '', biggestChallenge: '', whyPartner: '', canProvideTestimonial: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSelect = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep1 = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/founding-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please email us at hello@eventspheresolutions.com')
    } finally {
      setLoading(false)
    }
  }

  // ── Success ──
  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-[#6a256f] to-[#222123] rounded-2xl p-14 flex flex-col items-center justify-center text-center text-white max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-[#6a256f] to-[#E07B20] rounded-full flex items-center justify-center text-white text-2xl mb-6">✓</div>
        <h3 className="text-2xl font-extrabold font-display tracking-tight mb-3">Application Received!</h3>
        <p className="text-gray-300 leading-relaxed max-w-md mb-6">
          Thank you, <strong className="text-white">{form.name.split(' ')[0]}</strong>. We review every application personally and will be in touch within <strong className="text-[#E07B20]">48 hours</strong>.
        </p>
        <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-sm text-gray-300 text-left max-w-sm">
          <p className="font-bold text-white mb-2">What happens next:</p>
          <ol className="space-y-1 list-decimal list-inside">
            <li>We review your application</li>
            <li>You get an email from our team</li>
            <li>We schedule a 30-min onboarding call</li>
            <li>Your account goes live — free for 90 days</li>
          </ol>
        </div>
      </div>
    )
  }

  // ── Progress bar ──
  const Progress = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Step {step} of 2</span>
        <span className="text-xs font-semibold text-[#E07B20]">{step === 1 ? 'Your Info' : 'Your Venue'}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#6a256f] to-[#E07B20] rounded-full transition-all duration-500"
          style={{ width: step === 1 ? '50%' : '100%' }}
        />
      </div>
    </div>
  )

  // ── Step 1: Contact Info ──
  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto">
        <Progress />
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Full Name <span className="text-[#EF4561]">*</span></label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="Jane Smith" className={`${inputClass} ${errors.name ? 'border-[#EF4561]' : ''}`} />
            {errors.name && <p className="text-[#EF4561] text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className={labelClass}>Email Address <span className="text-[#EF4561]">*</span></label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="jane@yourvenue.com" className={`${inputClass} ${errors.email ? 'border-[#EF4561]' : ''}`} />
            {errors.email && <p className="text-[#EF4561] text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
              placeholder="+1 (555) 000-0000" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>City / Market <span className="text-[#EF4561]">*</span></label>
            <input type="text" name="city" value={form.city} onChange={handleChange}
              placeholder="New York, NY" className={`${inputClass} ${errors.city ? 'border-[#EF4561]' : ''}`} />
            {errors.city && <p className="text-[#EF4561] text-xs mt-1">{errors.city}</p>}
          </div>

          <button onClick={handleNext}
            className="w-full bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm mt-2">
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // ── Step 2: Venue Details ──
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <Progress />
      <div className="space-y-6">

        <div>
          <label className={labelClass}>Venue / Business Name <span className="text-[#EF4561]">*</span></label>
          <input type="text" name="businessName" required value={form.businessName} onChange={handleChange}
            placeholder="The Grand Venue" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Business Type</label>
          <div className="flex flex-wrap gap-2">
            {businessTypes.map((t) => (
              <button key={t} type="button" onClick={() => handleSelect('businessType', t)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  form.businessType === t
                    ? 'bg-[#E07B20] text-white border-[#E07B20]'
                    : 'border-gray-200 text-gray-600 hover:border-[#E07B20] hover:text-[#E07B20]'
                }`}>{t}</button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>How often do you currently host events?</label>
          <div className="flex flex-wrap gap-2">
            {eventFrequency.map((f) => (
              <button key={f} type="button" onClick={() => handleSelect('eventFrequency', f)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  form.eventFrequency === f
                    ? 'bg-[#E07B20] text-white border-[#E07B20]'
                    : 'border-gray-200 text-gray-600 hover:border-[#E07B20] hover:text-[#E07B20]'
                }`}>{f}</button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>What do you currently use to manage event sales?</label>
          <div className="flex flex-wrap gap-2">
            {currentTools.map((t) => (
              <button key={t} type="button" onClick={() => handleSelect('currentTool', t)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  form.currentTool === t
                    ? 'bg-[#6a256f] text-white border-[#6a256f]'
                    : 'border-gray-200 text-gray-600 hover:border-[#6a256f] hover:text-[#6a256f]'
                }`}>{t}</button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Biggest challenge with event sales right now? <span className="text-[#EF4561]">*</span></label>
          <textarea name="biggestChallenge" required value={form.biggestChallenge} onChange={handleChange} rows={3}
            placeholder="E.g. We lose leads because we don't follow up fast enough..."
            className={`${inputClass} resize-none`} />
        </div>

        <div>
          <label className={labelClass}>If your results are strong, would you be open to a case study?</label>
          <div className="flex flex-wrap gap-2">
            {['Yes, absolutely', 'Maybe — depends on results', 'Prefer to stay private'].map((opt) => (
              <button key={opt} type="button" onClick={() => handleSelect('canProvideTestimonial', opt)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  form.canProvideTestimonial === opt
                    ? 'bg-[#E07B20] text-white border-[#E07B20]'
                    : 'border-gray-200 text-gray-600 hover:border-[#E07B20] hover:text-[#E07B20]'
                }`}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => setStep(1)}
            className="px-6 py-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-all">
            ← Back
          </button>
          <button type="submit" disabled={loading}
            className="flex-1 bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm disabled:opacity-70">
            {loading ? 'Submitting...' : 'Submit My Application →'}
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center">We review every application personally and respond within 48 hours. No credit card ever required.</p>
      </div>
    </form>
  )
}
