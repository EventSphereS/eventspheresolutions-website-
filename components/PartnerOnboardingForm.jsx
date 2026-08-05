'use client'
import { useState } from 'react'
import PartnerFileUpload from './PartnerFileUpload'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const CURRENCIES = ['USD', 'CAD', 'EUR', 'GBP', 'AUD']
const BRAND_COLOR_OPTIONS = [
  { label: 'Burgundy', hex: '#7B1E3A' },
  { label: 'Navy', hex: '#1A2B4C' },
  { label: 'Forest Green', hex: '#1F4E3D' },
  { label: 'Gold', hex: '#D4A017' },
  { label: 'Terracotta', hex: '#C1502E' },
  { label: 'Teal', hex: '#0F6E6E' },
  { label: 'Blush', hex: '#E8B4B8' },
  { label: 'Slate Blue', hex: '#4A5D8A' },
  { label: 'Charcoal', hex: '#222123' },
  { label: 'Warm Gray', hex: '#8A8580' },
]

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#E07B20] focus:ring-2 focus:ring-[#E07B20]/20 transition-all bg-white placeholder:text-gray-400"
const labelClass = "block text-sm font-semibold text-[#222123] mb-1.5"

const initialForm = {
  adminName: '', adminEmail: '', adminPhone: '', businessName: '',
  totalCapacity: '', description: '', currency: 'USD',
  streetAddress: '', city: '', state: '', zip: '', country: '',
  businessHours: DAYS.map((day) => ({ day, closed: false, open: '09:00', close: '18:00' })),
  spaces: [{ name: '', capacity: '' }], spacePhotosUrls: [],
  logoUrl: '', coverPhotoUrl: '', brandColors: '', policiesUrl: '', menuUrl: '', taxAndFees: '',
  welcomeEmail: '', firstResponseEmail: '', followUpEmail: '',
  teamMembers: '', contactsExportUrl: '', upcomingEvents: '', upcomingEventsFileUrl: '', templatesUrls: [], notes: '',
}

const TOTAL_STEPS = 5
const STEP_LABELS = ['Your Info', 'Venue Basics', 'Spaces & Branding', 'Emails', 'Team & Migration']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Defined outside PartnerOnboardingForm so React keeps the same component type
// across renders — otherwise it remounts and the width transition never animates.
function Progress({ step }) {
  return (
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
}

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

  const updateSpace = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      spaces: prev.spaces.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    }))
  }

  const addSpace = () => {
    setForm((prev) => ({ ...prev, spaces: [...prev.spaces, { name: '', capacity: '' }] }))
  }

  const removeSpace = (index) => {
    setForm((prev) => ({ ...prev, spaces: prev.spaces.filter((_, i) => i !== index) }))
  }

  const toggleBrandColor = (hex) => {
    setForm((prev) => {
      const current = prev.brandColors ? prev.brandColors.split(',').map((c) => c.trim()).filter(Boolean) : []
      const next = current.includes(hex) ? current.filter((c) => c !== hex) : [...current, hex]
      return { ...prev, brandColors: next.join(', ') }
    })
  }

  const validateStep1 = () => {
    const e = {}
    if (!form.adminName.trim()) e.adminName = 'Required'
    if (!form.adminEmail.trim()) e.adminEmail = 'Required'
    else if (!EMAIL_PATTERN.test(form.adminEmail.trim())) e.adminEmail = 'Please enter a valid email'
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
    if (step !== TOTAL_STEPS) return
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
      <div className="bg-gradient-to-br from-[#6a256f] to-[#3d1640] rounded-2xl p-14 flex flex-col items-center justify-center text-center text-white max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-[#6a256f] via-[#EF4561] to-[#E07B20] rounded-full flex items-center justify-center text-white text-2xl mb-6">✓</div>
        <h3 className="text-2xl font-extrabold font-display tracking-tight mb-3">You're all set, {form.adminName.split(' ')[0]}!</h3>
        <p className="text-gray-300 leading-relaxed max-w-md mb-2">
          We've got everything we need for <strong className="text-white">{form.businessName}</strong>. Your account will be live within <strong className="text-[#E07B20]">2 business days</strong>.
        </p>
      </div>
    )
  }

  return (
    // NOTE: this wrapper is deliberately a <div>, not a <form>. The global Apollo
    // form-enrichment script in app/layout.js hides `form:has(input[type="email"])`
    // behind a spinner until it initialises, which would blank this whole wizard on
    // load. Only step 5 (which has no email input) is wrapped in a real <form>.
    <div className="max-w-2xl mx-auto">
      <Progress step={step} />

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
            <label className={labelClass}>Street Address</label>
            <input type="text" name="streetAddress" value={form.streetAddress} onChange={handleChange}
              placeholder="1524 South Sangamon Street" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>City</label>
              <input type="text" name="city" value={form.city} onChange={handleChange}
                placeholder="Chicago" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>State</label>
              <input type="text" name="state" value={form.state} onChange={handleChange}
                placeholder="Illinois" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Zip Code</label>
              <input type="text" name="zip" value={form.zip} onChange={handleChange}
                placeholder="60608" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input type="text" name="country" value={form.country} onChange={handleChange}
                placeholder="United States" className={inputClass} />
            </div>
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

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className={labelClass}>Event Spaces</label>
            <div className="space-y-3">
              {form.spaces.map((space, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={space.name} onChange={(e) => updateSpace(i, 'name', e.target.value)}
                    placeholder="Main Hall" className={inputClass} />
                  <input type="number" value={space.capacity} onChange={(e) => updateSpace(i, 'capacity', e.target.value)}
                    placeholder="Capacity" className={`${inputClass} w-32`} />
                  {form.spaces.length > 1 && (
                    <button type="button" onClick={() => removeSpace(i)}
                      className="px-3 text-gray-400 hover:text-[#EF4561]">✕</button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addSpace} className="text-sm font-semibold text-[#6a256f] mt-2">+ Add another space</button>
          </div>

          <PartnerFileUpload label="Space Photos (optional, if any)" accept="image/png,image/jpeg,image/webp" multiple
            hint="Photos of your event spaces — you can select multiple" onUploaded={(urls) => setForm((p) => ({ ...p, spacePhotosUrls: urls }))} />

          <PartnerFileUpload label="Logo" accept="image/png,image/jpeg,image/webp,application/pdf"
            hint="PNG, JPG, WebP, or PDF" onUploaded={(url) => setForm((p) => ({ ...p, logoUrl: url }))} />

          <PartnerFileUpload label="Cover Photo" accept="image/png,image/jpeg,image/webp"
            hint="A photo of your venue — e.g. the dining room or event space" onUploaded={(url) => setForm((p) => ({ ...p, coverPhotoUrl: url }))} />

          <div>
            <label className={labelClass}>Brand Colors <span className="text-gray-400 font-normal">(select all that apply)</span></label>
            <div className="flex flex-wrap gap-2">
              {BRAND_COLOR_OPTIONS.map(({ label, hex }) => {
                const selected = form.brandColors.split(',').map((c) => c.trim()).includes(hex)
                return (
                  <button key={hex} type="button" onClick={() => toggleBrandColor(hex)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border transition-all ${
                      selected ? 'border-[#222123] bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <span className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: hex }} />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          <PartnerFileUpload label="Policies Document" accept="application/pdf,image/jpeg,image/png"
            hint="PDF, JPG, or PNG" onUploaded={(url) => setForm((p) => ({ ...p, policiesUrl: url }))} />

          <PartnerFileUpload label="Menu Document" accept="application/pdf,image/jpeg,image/png"
            hint="PDF, JPG, or PNG" onUploaded={(url) => setForm((p) => ({ ...p, menuUrl: url }))} />

          <div>
            <label className={labelClass}>Tax Rate(s) & Fees</label>
            <input type="text" name="taxAndFees" value={form.taxAndFees} onChange={handleChange}
              placeholder="8.5% sales tax, 20% service fee" className={inputClass} />
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={handleBack}
              className="px-6 py-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-all">← Back</button>
            <button type="button" onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm">Continue →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div>
            <label className={labelClass}>Welcome Email Copy</label>
            <textarea name="welcomeEmail" value={form.welcomeEmail} onChange={handleChange} rows={4}
              placeholder="What should new leads receive when they first reach out?" className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>First Response Email Copy</label>
            <textarea name="firstResponseEmail" value={form.firstResponseEmail} onChange={handleChange} rows={4}
              placeholder="Your team's standard first reply to a new lead" className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>Follow-Up Sequence Copy</label>
            <textarea name="followUpEmail" value={form.followUpEmail} onChange={handleChange} rows={4}
              placeholder="Any follow-up emails you'd like automated" className={`${inputClass} resize-none`} />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={handleBack}
              className="px-6 py-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-all">← Back</button>
            <button type="button" onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm">Continue →</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelClass}>Team Members to Invite</label>
            <textarea name="teamMembers" value={form.teamMembers} onChange={handleChange} rows={3}
              placeholder="One per line: Name, email, role" className={`${inputClass} resize-none`} />
          </div>

          <PartnerFileUpload
            label="Contacts/Leads Export (optional)"
            accept=".csv,.xls,.xlsx"
            hint="CSV or spreadsheet export of your existing contacts"
            onUploaded={(url) => setForm((p) => ({ ...p, contactsExportUrl: url }))} />

          <div>
            <label className={labelClass}>Upcoming Events & Bookings</label>
            <textarea name="upcomingEvents" value={form.upcomingEvents} onChange={handleChange} rows={3}
              placeholder="List any already-booked events with dates and client names" className={`${inputClass} resize-none`} />
          </div>

          <PartnerFileUpload label="Upcoming Events File (optional)" accept=".csv,.xls,.xlsx"
            hint="CSV or spreadsheet export of upcoming bookings, if that's easier than typing them out"
            onUploaded={(url) => setForm((p) => ({ ...p, upcomingEventsFileUrl: url }))} />

          <PartnerFileUpload label="Proposal & Contract Templates" accept=".pdf,.doc,.docx" multiple
            hint="PDF or Word docs, you can select multiple" onUploaded={(urls) => setForm((p) => ({ ...p, templatesUrls: urls }))} />

          <div>
            <label className={labelClass}>Anything else we should know?</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
              className={`${inputClass} resize-none`} />
          </div>

          {submitError && <p className="text-[#EF4561] text-sm">{submitError}</p>}

          <div className="flex gap-3">
            <button type="button" onClick={handleBack}
              className="px-6 py-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-all">← Back</button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm disabled:opacity-70">
              {loading ? 'Submitting...' : 'Submit →'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
