'use client'
import { useState } from 'react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const CURRENCIES = ['USD', 'CAD', 'EUR', 'GBP', 'AUD']

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#E07B20] focus:ring-2 focus:ring-[#E07B20]/20 transition-all bg-white placeholder:text-gray-400"
const labelClass = "block text-sm font-semibold text-[#222123] mb-1.5"

const initialForm = {
  adminName: '', adminEmail: '', adminPhone: '', businessName: '', subdomain: '',
  totalCapacity: '', description: '', currency: 'USD', address: '',
  businessHours: DAYS.map((day) => ({ day, closed: false, open: '09:00', close: '18:00' })),
  spaces: [{ name: '', capacity: '' }],
  logoUrl: '', brandColors: '', policiesUrl: '', menuUrl: '', taxAndFees: '',
  welcomeEmail: '', firstResponseEmail: '', followUpEmail: '',
  teamMembers: '', contactsExportUrl: '', upcomingEvents: '', templatesUrls: [], notes: '',
}

const TOTAL_STEPS = 5
const STEP_LABELS = ['Your Info', 'Venue Basics', 'Spaces & Branding', 'Emails', 'Team & Migration']

export default function PartnerOnboardingForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const updateBusinessHour = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      businessHours: prev.businessHours.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    }))
  }

  const validateStep1 = () => {
    const e = {}
    if (!form.adminName.trim()) e.adminName = 'Required'
    if (!form.adminEmail.trim()) e.adminEmail = 'Required'
    if (!form.businessName.trim()) e.businessName = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/partner-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please email your details to hello@eventspheresolutions.com')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-[#6a256f] to-[#222123] rounded-2xl p-14 flex flex-col items-center justify-center text-center text-white max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-[#6a256f] to-[#E07B20] rounded-full flex items-center justify-center text-white text-2xl mb-6">✓</div>
        <h3 className="text-2xl font-extrabold font-display tracking-tight mb-3">You're all set, {form.adminName.split(' ')[0]}!</h3>
        <p className="text-gray-300 leading-relaxed max-w-md mb-2">
          We've got everything we need for <strong className="text-white">{form.businessName}</strong>. Your account will be live within <strong className="text-[#E07B20]">2 business days</strong>.
        </p>
      </div>
    )
  }

  const Progress = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Step {step} of {TOTAL_STEPS}</span>
        <span className="text-xs font-semibold text-[#E07B20]">{STEP_LABELS[step - 1]}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#6a256f] to-[#E07B20] rounded-full transition-all duration-500"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <Progress />

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Admin Full Name <span className="text-[#EF4561]">*</span></label>
            <input type="text" name="adminName" value={form.adminName} onChange={handleChange}
              placeholder="Jane Smith" className={`${inputClass} ${errors.adminName ? 'border-[#EF4561]' : ''}`} />
            {errors.adminName && <p className="text-[#EF4561] text-xs mt-1">{errors.adminName}</p>}
          </div>
          <div>
            <label className={labelClass}>Admin Email (this becomes your Sphere login) <span className="text-[#EF4561]">*</span></label>
            <input type="email" name="adminEmail" value={form.adminEmail} onChange={handleChange}
              placeholder="jane@yourvenue.com" className={`${inputClass} ${errors.adminEmail ? 'border-[#EF4561]' : ''}`} />
            {errors.adminEmail && <p className="text-[#EF4561] text-xs mt-1">{errors.adminEmail}</p>}
          </div>
          <div>
            <label className={labelClass}>Admin Phone</label>
            <input type="tel" name="adminPhone" value={form.adminPhone} onChange={handleChange}
              placeholder="+1 (555) 000-0000" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Business/Venue Name <span className="text-[#EF4561]">*</span></label>
            <input type="text" name="businessName" value={form.businessName} onChange={handleChange}
              placeholder="The Grand Venue" className={`${inputClass} ${errors.businessName ? 'border-[#EF4561]' : ''}`} />
            {errors.businessName && <p className="text-[#EF4561] text-xs mt-1">{errors.businessName}</p>}
          </div>
          <div>
            <label className={labelClass}>Subdomain Preference</label>
            <div className="flex items-center gap-2">
              <input type="text" name="subdomain" value={form.subdomain} onChange={handleChange}
                placeholder="yourvenue" className={inputClass} />
              <span className="text-sm text-gray-400 whitespace-nowrap">.eventspheresolutions.com</span>
            </div>
          </div>
          <button type="button" onClick={handleNext}
            className="w-full bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm mt-2">
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className={labelClass}>Total Capacity</label>
            <input type="number" name="totalCapacity" value={form.totalCapacity} onChange={handleChange}
              placeholder="150" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3}
              placeholder="Tell us about your venue..." className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>Currency</label>
            <select name="currency" value={form.currency} onChange={handleChange} className={inputClass}>
              {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Business Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange}
              placeholder="123 Main St, New York, NY" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Business Hours</label>
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-100">
              {form.businessHours.map((row, i) => (
                <div key={row.day} className="flex items-center gap-3 px-4 py-3 flex-wrap">
                  <span className="w-24 text-sm font-medium text-[#222123]">{row.day}</span>
                  <label className="flex items-center gap-1.5 text-xs text-gray-500">
                    <input type="checkbox" checked={row.closed} onChange={(e) => updateBusinessHour(i, 'closed', e.target.checked)} />
                    Closed
                  </label>
                  {!row.closed && (
                    <>
                      <input type="time" value={row.open} onChange={(e) => updateBusinessHour(i, 'open', e.target.value)}
                        className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm" />
                      <span className="text-gray-400 text-sm">to</span>
                      <input type="time" value={row.close} onChange={(e) => updateBusinessHour(i, 'close', e.target.value)}
                        className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={handleBack}
              className="px-6 py-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-all">← Back</button>
            <button type="button" onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm">Continue →</button>
          </div>
        </div>
      )}
    </form>
  )
}
