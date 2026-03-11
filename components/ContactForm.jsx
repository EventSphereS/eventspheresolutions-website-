'use client'
import { useState } from 'react'

const businessTypes = ['Restaurant', 'Bar / Nightlife', 'Venue', 'Hotel', 'Catering', 'Other']
const services = [
  'Full Event Sales Management',
  'Platform Only',
  'Event Strategy & Consulting',
  'Event Marketing & Promotion',
  'On-Site Event Support',
  'Brand Partnerships',
]

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#E07B20] focus:ring-2 focus:ring-[#E07B20]/20 transition-all bg-white placeholder:text-gray-400"
const labelClass = "block text-sm font-semibold text-[#222123] mb-1.5"

export default function ContactForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', businessName: '',
    businessType: '', servicesNeeded: [], eventDetails: '', timeline: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleServiceToggle = (service) => {
    setForm((prev) => ({
      ...prev,
      servicesNeeded: prev.servicesNeeded.includes(service)
        ? prev.servicesNeeded.filter((s) => s !== service)
        : [...prev.servicesNeeded, service],
    }))
  }

  const validateStep1 = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    if (!form.businessName.trim()) e.businessName = 'Required'
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
      const res = await fetch('/api/contact', {
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
      <div className="bg-gradient-to-br from-[#6a256f]/5 to-[#E07B20]/5 border border-[#E07B20]/20 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-gradient-to-br from-[#6a256f] to-[#E07B20] rounded-full flex items-center justify-center text-white text-2xl mb-6">✓</div>
        <h3 className="text-2xl font-bold text-[#222123] mb-3">You're all set, {form.name.split(' ')[0]}!</h3>
        <p className="text-gray-500 leading-relaxed max-w-sm">
          We'll review your info and reach out within 1 business day to schedule your free consultation.
        </p>
      </div>
    )
  }

  // ── Progress bar ──
  const Progress = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Step {step} of 2</span>
        <span className="text-xs font-semibold text-[#E07B20]">{step === 1 ? 'Your Info' : 'Your Business'}</span>
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
      <div>
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
            <label className={labelClass}>Business Name <span className="text-[#EF4561]">*</span></label>
            <input type="text" name="businessName" value={form.businessName} onChange={handleChange}
              placeholder="The Grand Hotel" className={`${inputClass} ${errors.businessName ? 'border-[#EF4561]' : ''}`} />
            {errors.businessName && <p className="text-[#EF4561] text-xs mt-1">{errors.businessName}</p>}
          </div>

          <button onClick={handleNext}
            className="w-full bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm mt-2">
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // ── Step 2: Business Details ──
  return (
    <form onSubmit={handleSubmit}>
      <Progress />
      <div className="space-y-6">

        <div>
          <label className={labelClass}>Business Type</label>
          <div className="flex flex-wrap gap-2">
            {businessTypes.map((type) => (
              <button key={type} type="button"
                onClick={() => setForm((prev) => ({ ...prev, businessType: type }))}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  form.businessType === type
                    ? 'bg-[#E07B20] text-white border-[#E07B20]'
                    : 'border-gray-200 text-gray-600 hover:border-[#E07B20] hover:text-[#E07B20]'
                }`}>
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Service Interested In</label>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <button key={service} type="button" onClick={() => handleServiceToggle(service)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  form.servicesNeeded.includes(service)
                    ? 'bg-[#6a256f] text-white border-[#6a256f]'
                    : 'border-gray-200 text-gray-600 hover:border-[#6a256f] hover:text-[#6a256f]'
                }`}>
                {service}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Tell us about your goals</label>
          <textarea name="eventDetails" value={form.eventDetails} onChange={handleChange} rows={3}
            placeholder="What are you hoping to achieve with your event program?"
            className={`${inputClass} resize-none`} />
        </div>

        <div>
          <label className={labelClass}>When are you looking to get started?</label>
          <div className="flex flex-wrap gap-2">
            {[
              { v: 'asap', l: 'ASAP' },
              { v: '1month', l: 'Within 1 month' },
              { v: '3months', l: 'Within 3 months' },
              { v: '6months', l: 'Within 6 months' },
              { v: 'planning', l: 'Just exploring' },
            ].map(({ v, l }) => (
              <button key={v} type="button"
                onClick={() => setForm((prev) => ({ ...prev, timeline: v }))}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  form.timeline === v
                    ? 'bg-[#E07B20] text-white border-[#E07B20]'
                    : 'border-gray-200 text-gray-600 hover:border-[#E07B20] hover:text-[#E07B20]'
                }`}>
                {l}
              </button>
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
            {loading ? 'Sending...' : 'Book My Free Consultation →'}
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center">We'll respond within 1 business day. No spam, ever.</p>
      </div>
    </form>
  )
}
