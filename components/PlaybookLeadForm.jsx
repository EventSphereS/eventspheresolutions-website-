'use client'
import { useState } from 'react'

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#E07B20] focus:ring-2 focus:ring-[#E07B20]/20 transition-all bg-white placeholder:text-gray-400"
const labelClass = "block text-sm font-semibold text-[#222123] mb-1.5"

export default function PlaybookLeadForm() {
  const [form, setForm] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/playbook', {
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

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-[#6a256f]/5 to-[#E07B20]/5 border border-[#E07B20]/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#6a256f] to-[#E07B20] rounded-full flex items-center justify-center text-white text-2xl mb-6">✓</div>
        <h3 className="text-2xl font-bold text-[#222123] mb-3">You're all set, {form.name.split(' ')[0]}!</h3>
        <p className="text-gray-500 leading-relaxed max-w-sm mb-6">
          We've also emailed you a copy of the link. Click below to open your playbook now.
        </p>
        <a
          href="/private-event-lead-gen-playbook.html"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm px-8 py-3.5 inline-block"
        >
          Download Your Playbook →
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl shadow-black/5">
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

        <button type="submit" disabled={loading}
          className="w-full bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm disabled:opacity-70">
          {loading ? 'Sending...' : 'Get the Free Playbook →'}
        </button>
        <p className="text-xs text-gray-400 text-center">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </form>
  )
}
