# Partner Onboarding Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/partner-onboarding`, a 5-step client-facing form that collects everything needed to migrate a new Founding Partner onto Sphere (venue details, branding/documents, automated email copy, team, and existing contacts/bookings/templates), and emails the submission to the Event Sphere Solutions team.

**Architecture:** A Next.js App Router page (`app/partner-onboarding/page.js`) renders a client-component wizard (`components/PartnerOnboardingForm.jsx`). Files (logo, policies PDF, menu PDF, contacts export, proposal templates) upload directly from the browser to Vercel Blob via a small token-issuing API route, so large files never pass through the main submission request. On final submit, a second API route emails the full submission (with file URLs) to the team via Resend, plus a confirmation to the partner.

**Tech Stack:** Next.js 14 (App Router), React 18, Tailwind CSS, `@vercel/blob` (client uploads), `resend` (already a dependency).

## Global Constraints

- No test framework exists in this repo (no Jest/Vitest, no test files under `app/` or `components/`) — this plan verifies UI with manual dev-server browser checks and API routes with `curl`, per this repo's existing practice (confirmed by `app/api/founding-partner/route.js` having no accompanying test file).
- Brand colors used throughout the site: `#6a256f` (purple), `#E07B20` (orange), `#EF4561` (pink), `#222123` (dark text). Match these exactly — do not introduce new colors.
- Follow the existing `components/FoundingPartnerForm.jsx` conventions: local `inputClass`/`labelClass` constants per file (not shared/exported), `'use client'` directive, inline Tailwind, no external form libraries.
- No database — submissions are delivered by email only, matching every other form in this repo.
- The confirmation email copy states the account will be live within **2 business days** (per the approved spec) — use this exact wording.

---

### Task 1: Provision Vercel Blob storage and add the dependency

**Files:**
- Modify: `package.json`
- Modify: `.env.local.example`
- Modify: `.env.local` (not committed — gitignored)

**Interfaces:**
- Produces: `BLOB_READ_WRITE_TOKEN` env var, available to `process.env` in API routes; `@vercel/blob` package available for import in later tasks.

This task has a manual, one-time account-setup step that only the project owner can do (it may touch billing), followed by a code step.

- [ ] **Step 1: Provision the Blob store (manual — do this yourself, not via agent)**

In the Vercel dashboard for the `eventspheresolutions-website` project: go to **Storage → Create Database → Blob**, create a store, and connect it to this project. Vercel will auto-populate a `BLOB_READ_WRITE_TOKEN` environment variable for Production/Preview. Pull it down for local dev:

```bash
npx vercel env pull .env.local
```

Confirm the token landed:

```bash
grep BLOB_READ_WRITE_TOKEN .env.local
```

Expected: a line like `BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...`

- [ ] **Step 2: Install the dependency**

```bash
npm install @vercel/blob
```

- [ ] **Step 3: Document the env var**

Read `.env.local.example`, then add a line for the new var so future setups know it's required:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxx
```

- [ ] **Step 4: Verify the install**

```bash
node -e "require('@vercel/blob/client'); console.log('ok')"
```

Expected: `ok`

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .env.local.example
git commit -m "Add @vercel/blob dependency for partner onboarding uploads"
```

(`.env.local` stays untracked — it's already gitignored.)

---

### Task 2: Blob upload token API route

**Files:**
- Create: `app/api/partner-onboarding/upload/route.js`

**Interfaces:**
- Consumes: `BLOB_READ_WRITE_TOKEN` from env (implicitly read by `@vercel/blob`).
- Produces: `POST /api/partner-onboarding/upload` — accepts the JSON handshake body sent automatically by the `upload()` client helper (Task 3 consumes this URL as `handleUploadUrl`).

- [ ] **Step 1: Write the route**

```js
import { handleUpload } from '@vercel/blob/client'

const ALLOWED_CONTENT_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/pdf',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export async function POST(request) {
  const body = await request.json()

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_CONTENT_TYPES,
        addRandomSuffix: true,
        maximumSizeInBytes: 25 * 1024 * 1024,
      }),
      onUploadCompleted: async ({ blob }) => {
        console.log('Partner onboarding file uploaded:', blob.url)
      },
    })

    return Response.json(jsonResponse)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
```

Note: `onUploadCompleted` is a webhook Vercel calls back — it won't fire against `localhost` since Vercel can't reach your machine. That's fine; nothing depends on it, since the browser gets the blob URL directly from the `upload()` call in Task 3.

- [ ] **Step 2: Verify the route doesn't crash on a malformed request**

Start the dev server in one terminal:

```bash
npm run dev
```

In another terminal:

```bash
curl -s -X POST http://localhost:3000/api/partner-onboarding/upload \
  -H "Content-Type: application/json" \
  -d '{}'
```

Expected: a `400` response with a JSON `error` field (not a `500` crash) — confirms the route is wired up and `handleUpload` is rejecting the empty handshake body cleanly. Full functional verification (an actual file reaching Blob storage) happens in Task 7 via the browser, once Task 3's upload component exists.

- [ ] **Step 3: Commit**

```bash
git add app/api/partner-onboarding/upload/route.js
git commit -m "Add Vercel Blob upload token route for partner onboarding"
```

---

### Task 3: Reusable file upload field component

**Files:**
- Create: `components/PartnerFileUpload.jsx`

**Interfaces:**
- Consumes: `upload()` from `@vercel/blob/client`; posts its handshake to `/api/partner-onboarding/upload` (Task 2).
- Produces: `<PartnerFileUpload label multiple accept hint onUploaded />` — a client component. `onUploaded(url)` fires with a single blob URL string when `multiple` is falsy/omitted; `onUploaded(urls)` fires with an array of blob URL strings when `multiple` is true. Consumed by `components/PartnerOnboardingForm.jsx` in Tasks 4–8.

- [ ] **Step 1: Write the component**

```jsx
'use client'
import { useState } from 'react'
import { upload } from '@vercel/blob/client'

export default function PartnerFileUpload({ label, hint, accept, multiple = false, onUploaded }) {
  const [status, setStatus] = useState('idle')
  const [fileNames, setFileNames] = useState([])
  const [error, setError] = useState('')

  const handleChange = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setStatus('uploading')
    setError('')
    try {
      const urls = []
      for (const file of files) {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/partner-onboarding/upload',
        })
        urls.push(blob.url)
      }
      setFileNames(files.map((f) => f.name))
      setStatus('done')
      onUploaded(multiple ? urls : urls[0])
    } catch (err) {
      console.error('Partner onboarding upload failed', err)
      setStatus('error')
      setError('Upload failed. Please try again or email the file to hello@eventspheresolutions.com.')
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-[#222123] mb-1.5">{label}</label>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#6a256f] file:text-white file:font-semibold file:text-sm hover:file:opacity-90 file:cursor-pointer"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      {status === 'uploading' && <p className="text-xs text-[#E07B20] mt-1">Uploading...</p>}
      {status === 'done' && <p className="text-xs text-green-600 mt-1">✓ {fileNames.join(', ')} uploaded</p>}
      {status === 'error' && <p className="text-xs text-[#EF4561] mt-1">{error}</p>}
    </div>
  )
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx next lint components/PartnerFileUpload.jsx
```

Expected: no errors (warnings about unused vars would indicate a typo — there should be none here).

- [ ] **Step 3: Commit**

```bash
git add components/PartnerFileUpload.jsx
git commit -m "Add reusable file upload field for partner onboarding form"
```

---

### Task 4: Form scaffold + Step 1 (Your Info & Business)

**Files:**
- Create: `components/PartnerOnboardingForm.jsx`

**Interfaces:**
- Consumes: nothing external yet (Step 3's `PartnerFileUpload` is wired in by Task 6).
- Produces: `export default function PartnerOnboardingForm()`. Internal `form` state shape (all fields used across every step, so later tasks in this file agree on names):

```js
{
  adminName: '', adminEmail: '', adminPhone: '', businessName: '', subdomain: '',
  totalCapacity: '', description: '', currency: 'USD', address: '',
  businessHours: DAYS.map((day) => ({ day, closed: false, open: '09:00', close: '18:00' })),
  spaces: [{ name: '', capacity: '' }],
  logoUrl: '', brandColors: '', policiesUrl: '', menuUrl: '', taxAndFees: '',
  welcomeEmail: '', firstResponseEmail: '', followUpEmail: '',
  teamMembers: '', contactsExportUrl: '', upcomingEvents: '', templatesUrls: [], notes: '',
}
```

This task builds the file with only Step 1 wired in; Tasks 5–8 add Steps 2–5 by inserting new `{step === N && (...)}` blocks and are additive (they don't change this task's code).

- [ ] **Step 1: Write the component with Step 1 only**

```jsx
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
    </form>
  )
}
```

- [ ] **Step 2: Verify Step 1 renders**

Temporarily render it by creating `app/partner-onboarding/page.js` with just:

```jsx
import PartnerOnboardingForm from '@/components/PartnerOnboardingForm'
export default function Page() {
  return <div className="pt-28 pb-24 px-6"><PartnerOnboardingForm /></div>
}
```

(This file gets its real content in Task 9 — this is a throwaway stand-in so you can view the page now.)

```bash
npm run dev
```

Open `http://localhost:3000/partner-onboarding` in a browser. Confirm:
- The 4 Step-1 fields render with the progress bar at "Step 1 of 5".
- Clicking "Continue →" with empty required fields shows red "Required" errors and does not advance.
- Filling in Admin Name, Admin Email, and Business Name and clicking "Continue →" — since Step 2 doesn't exist yet, the visible form area goes blank (expected; Task 5 adds it). This confirms `handleNext` and validation work.

- [ ] **Step 3: Commit**

```bash
git add components/PartnerOnboardingForm.jsx app/partner-onboarding/page.js
git commit -m "Add partner onboarding form scaffold with Step 1 (Your Info & Business)"
```

---

### Task 5: Step 2 — Venue Basics

**Files:**
- Modify: `components/PartnerOnboardingForm.jsx`

**Interfaces:**
- Consumes: `form`, `handleChange`, `labelClass`, `inputClass`, `DAYS`, `CURRENCIES` already defined in the file by Task 4.
- Produces: `updateBusinessHour(index, field, value)` — updates one day's `{ closed, open, close }` row in `form.businessHours` by index. No other task depends on this function's name, but keep it for consistency if you touch this block again.

- [ ] **Step 1: Add the `updateBusinessHour` helper**

Insert this function next to `handleChange` (same block of helper functions, before `validateStep1`):

```js
  const updateBusinessHour = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      businessHours: prev.businessHours.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    }))
  }
```

- [ ] **Step 2: Add the Step 2 JSX block**

Insert this immediately after the closing `)}` of the `{step === 1 && ( ... )}` block, still inside the `<form>`:

```jsx
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
```

- [ ] **Step 3: Verify Step 2 renders and navigates**

```bash
npm run dev
```

In the browser at `http://localhost:3000/partner-onboarding`: fill Step 1's required fields, click Continue, and confirm:
- Progress bar reads "Step 2 of 5 — Venue Basics".
- Toggling "Closed" on a day hides its time pickers; unchecking it restores them with the `09:00`/`18:00` defaults.
- Clicking "← Back" returns to Step 1 with your Step 1 values still filled in (state persists).

- [ ] **Step 4: Commit**

```bash
git add components/PartnerOnboardingForm.jsx
git commit -m "Add Step 2 (Venue Basics) to partner onboarding form"
```

---

### Task 6: Step 3 — Spaces & Branding

**Files:**
- Modify: `components/PartnerOnboardingForm.jsx`

**Interfaces:**
- Consumes: `PartnerFileUpload` from `components/PartnerFileUpload.jsx` (Task 3) — import it at the top of this file.
- Produces: `updateSpace(index, field, value)`, `addSpace()`, `removeSpace(index)` — manage `form.spaces`, an array of `{ name, capacity }`.

- [ ] **Step 1: Add the import**

At the top of `components/PartnerOnboardingForm.jsx`, add below the existing `useState` import:

```js
import PartnerFileUpload from './PartnerFileUpload'
```

- [ ] **Step 2: Add the spaces helper functions**

Insert next to `updateBusinessHour`:

```js
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
```

- [ ] **Step 3: Add the Step 3 JSX block**

Insert immediately after the closing `)}` of the `{step === 2 && ( ... )}` block:

```jsx
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

          <PartnerFileUpload label="Logo" accept="image/png,image/jpeg,image/webp"
            hint="PNG, JPG, or WebP" onUploaded={(url) => setForm((p) => ({ ...p, logoUrl: url }))} />

          <div>
            <label className={labelClass}>Brand Colors</label>
            <input type="text" name="brandColors" value={form.brandColors} onChange={handleChange}
              placeholder="#6a256f, #E07B20" className={inputClass} />
          </div>

          <PartnerFileUpload label="Policies Document" accept="application/pdf"
            hint="PDF" onUploaded={(url) => setForm((p) => ({ ...p, policiesUrl: url }))} />

          <PartnerFileUpload label="Menu Document" accept="application/pdf"
            hint="PDF" onUploaded={(url) => setForm((p) => ({ ...p, menuUrl: url }))} />

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
```

- [ ] **Step 4: Verify Step 3 renders**

```bash
npm run dev
```

Click through to Step 3 in the browser. Confirm:
- "+ Add another space" adds a new empty name/capacity row; the ✕ button appears once there's more than one row and removes that row.
- The three file inputs (Logo, Policies, Menu) render with the purple "choose file" button styling.
- If `BLOB_READ_WRITE_TOKEN` is set (Task 1), selecting a small PNG for Logo shows "Uploading..." then "✓ filename uploaded" in green. If the token isn't set yet, this step will show the red error state — that's expected until Task 1's manual setup is complete; don't block on it here.

- [ ] **Step 5: Commit**

```bash
git add components/PartnerOnboardingForm.jsx
git commit -m "Add Step 3 (Spaces & Branding) to partner onboarding form"
```

---

### Task 7: Step 4 — Automated Emails

**Files:**
- Modify: `components/PartnerOnboardingForm.jsx`

**Interfaces:**
- Consumes: `form.welcomeEmail`, `form.firstResponseEmail`, `form.followUpEmail` (already in `initialForm` from Task 4), `handleChange`.
- Produces: nothing new consumed by later tasks.

- [ ] **Step 1: Add the Step 4 JSX block**

Insert immediately after the closing `)}` of the `{step === 3 && ( ... )}` block:

```jsx
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
```

- [ ] **Step 2: Verify Step 4 renders**

```bash
npm run dev
```

Click through to Step 4 in the browser. Confirm the three textareas render, accept typed text, and "← Back" / "Continue →" navigate correctly while preserving typed content.

- [ ] **Step 3: Commit**

```bash
git add components/PartnerOnboardingForm.jsx
git commit -m "Add Step 4 (Automated Emails) to partner onboarding form"
```

---

### Task 8: Step 5 — Team & Migration, submit wiring, success screen

**Files:**
- Modify: `components/PartnerOnboardingForm.jsx`

**Interfaces:**
- Consumes: `PartnerFileUpload` (Task 3/6), `form.contactsExportUrl` as the sole required field on this step.
- Produces: final `POST /api/partner-onboarding` request body — the full `form` object as JSON, consumed by Task 10's API route. Field names in that body: `adminName, adminEmail, adminPhone, businessName, subdomain, totalCapacity, description, currency, address, businessHours, spaces, logoUrl, brandColors, policiesUrl, menuUrl, taxAndFees, welcomeEmail, firstResponseEmail, followUpEmail, teamMembers, contactsExportUrl, upcomingEvents, templatesUrls, notes`.

- [ ] **Step 1: Add the `validateStep5` function and wire it into `handleSubmit`**

Insert `validateStep5` next to `validateStep1`:

```js
  const validateStep5 = () => {
    const e = {}
    if (!form.contactsExportUrl) e.contactsExportUrl = 'Please upload your contacts/leads export'
    setErrors(e)
    return Object.keys(e).length === 0
  }
```

Then update the existing `handleSubmit` (from Task 4) to call it first — replace:

```js
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
```

with:

```js
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep5()) return
    setLoading(true)
```

- [ ] **Step 2: Add the Step 5 JSX block**

Insert immediately after the closing `)}` of the `{step === 4 && ( ... )}` block:

```jsx
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <label className={labelClass}>Team Members to Invite</label>
            <textarea name="teamMembers" value={form.teamMembers} onChange={handleChange} rows={3}
              placeholder="One per line: Name, email, role" className={`${inputClass} resize-none`} />
          </div>

          <PartnerFileUpload label="Contacts/Leads Export *" accept=".csv,.xls,.xlsx"
            hint="CSV or spreadsheet export of your existing contacts"
            onUploaded={(url) => { setForm((p) => ({ ...p, contactsExportUrl: url })); setErrors((p) => ({ ...p, contactsExportUrl: '' })) }} />
          {errors.contactsExportUrl && <p className="text-[#EF4561] text-xs -mt-4">{errors.contactsExportUrl}</p>}

          <div>
            <label className={labelClass}>Upcoming Events & Bookings</label>
            <textarea name="upcomingEvents" value={form.upcomingEvents} onChange={handleChange} rows={3}
              placeholder="List any already-booked events with dates and client names" className={`${inputClass} resize-none`} />
          </div>

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
        </div>
      )}
```

- [ ] **Step 3: Verify the full wizard end-to-end (UI only — API route doesn't exist until Task 10)**

```bash
npm run dev
```

In the browser, click through Steps 1–5. On Step 5, confirm clicking "Submit →" while `contactsExportUrl` is empty shows the red "Please upload your contacts/leads export" message and does not submit. Uploading a small CSV for that field should clear the error. Submitting at this point will hit `/api/partner-onboarding`, which doesn't exist until Task 10 — expect the request to fail and the inline `submitError` message to appear. That failure is expected here; full success-path verification happens in Task 11.

- [ ] **Step 4: Commit**

```bash
git add components/PartnerOnboardingForm.jsx
git commit -m "Add Step 5 (Team & Migration), submit validation, and success screen wiring"
```

---

### Task 9: Page shell

**Files:**
- Modify: `app/partner-onboarding/page.js` (replace the throwaway stand-in from Task 4 with the real page)

**Interfaces:**
- Consumes: `PartnerOnboardingForm` from `components/PartnerOnboardingForm.jsx`.

- [ ] **Step 1: Write the real page**

Replace the entire contents of `app/partner-onboarding/page.js` with:

```jsx
import PartnerOnboardingForm from '@/components/PartnerOnboardingForm'

export const metadata = {
  title: 'Partner Onboarding | Sphere',
  description: 'Share your venue details so we can migrate you onto Sphere.',
}

export default function PartnerOnboardingPage() {
  return (
    <section className="pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-[#222123] mb-4">
          Let's get your venue set up on Sphere
        </h1>
        <p className="text-gray-500 leading-relaxed">
          This should take about 10 minutes. Share your venue details, branding, and existing data below, and our team will handle the full migration — your account will be live within 2 business days.
        </p>
      </div>
      <PartnerOnboardingForm />
    </section>
  )
}
```

- [ ] **Step 2: Verify the page**

```bash
npm run dev
```

Open `http://localhost:3000/partner-onboarding`. Confirm the heading/intro copy renders above the form, and the page title in the browser tab reads "Partner Onboarding | Sphere".

- [ ] **Step 3: Commit**

```bash
git add app/partner-onboarding/page.js
git commit -m "Add partner onboarding page shell with intro copy"
```

---

### Task 10: Submission API route (Resend emails)

**Files:**
- Create: `app/api/partner-onboarding/route.js`

**Interfaces:**
- Consumes: the JSON body shape defined in Task 8's Interfaces section; `process.env.RESEND_API_KEY` (already set in `.env.local`, per `app/api/founding-partner/route.js`'s existing usage).
- Produces: `POST /api/partner-onboarding` → `{ success: true }` on success (200) or `{ error: string }` on failure (400/500).

- [ ] **Step 1: Write the route**

```js
import { Resend } from 'resend'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await request.json()
    const {
      adminName, adminEmail, adminPhone, businessName, subdomain,
      totalCapacity, description, currency, address, businessHours,
      spaces, logoUrl, brandColors, policiesUrl, menuUrl, taxAndFees,
      welcomeEmail, firstResponseEmail, followUpEmail,
      teamMembers, contactsExportUrl, upcomingEvents, templatesUrls, notes,
    } = body

    if (!adminName || !adminEmail || !businessName || !contactsExportUrl) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const hoursRows = (businessHours || [])
      .map((r) => `${r.day}: ${r.closed ? 'Closed' : `${r.open} – ${r.close}`}`)
      .join('<br>')

    const spacesRows = (spaces || [])
      .filter((s) => s.name)
      .map((s) => `${s.name}${s.capacity ? ` (capacity ${s.capacity})` : ''}`)
      .join('<br>') || 'Not specified'

    const templatesLinks = (templatesUrls || [])
      .map((url) => `<a href="${url}" style="color:#E07B20;">${url}</a>`)
      .join('<br>') || 'None provided'

    await resend.emails.send({
      from: 'Event Sphere Website <hello@eventspheresolutions.com>',
      to: 'hello@eventspheresolutions.com',
      replyTo: adminEmail,
      subject: `🚀 Partner Onboarding — ${businessName}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 640px; margin: 0 auto; color: #222123;">
          <div style="background: linear-gradient(135deg, #222123, #6a256f); padding: 28px 32px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">🚀 Partner Onboarding Submitted</h1>
            <p style="color: #E07B20; margin: 4px 0 0; font-size: 14px;">${businessName}</p>
          </div>
          <div style="padding: 32px; background: #f9f9f9;">
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden;">
              ${[
                ['Admin Name', adminName],
                ['Admin Email', `<a href="mailto:${adminEmail}" style="color:#E07B20;">${adminEmail}</a>`],
                adminPhone ? ['Admin Phone', adminPhone] : null,
                ['Business Name', businessName],
                subdomain ? ['Subdomain', `${subdomain}.eventspheresolutions.com`] : null,
                totalCapacity ? ['Total Capacity', totalCapacity] : null,
                ['Currency', currency || 'USD'],
                address ? ['Address', address] : null,
                ['Business Hours', hoursRows],
                ['Event Spaces', spacesRows],
                logoUrl ? ['Logo', `<a href="${logoUrl}" style="color:#E07B20;">${logoUrl}</a>`] : null,
                brandColors ? ['Brand Colors', brandColors] : null,
                policiesUrl ? ['Policies Doc', `<a href="${policiesUrl}" style="color:#E07B20;">${policiesUrl}</a>`] : null,
                menuUrl ? ['Menu Doc', `<a href="${menuUrl}" style="color:#E07B20;">${menuUrl}</a>`] : null,
                taxAndFees ? ['Tax & Fees', taxAndFees] : null,
                contactsExportUrl ? ['Contacts Export', `<a href="${contactsExportUrl}" style="color:#E07B20;">${contactsExportUrl}</a>`] : null,
                ['Proposal/Contract Templates', templatesLinks],
              ].filter(Boolean).map(([label, value]) => `
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555; font-size: 13px; width: 35%; vertical-align: top;">${label}</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #f0f0f0; font-size: 13px;">${value}</td>
                </tr>
              `).join('')}
            </table>

            ${description ? `<div style="margin-top:20px;"><p style="font-weight:700;color:#333;font-size:14px;margin-bottom:8px;">Description:</p><div style="background:white;border-left:4px solid #E07B20;padding:14px 16px;border-radius:4px;font-size:14px;color:#444;line-height:1.6;">${description}</div></div>` : ''}
            ${teamMembers ? `<div style="margin-top:16px;"><p style="font-weight:700;color:#333;font-size:14px;margin-bottom:8px;">Team Members to Invite:</p><div style="background:white;border-left:4px solid #6a256f;padding:14px 16px;border-radius:4px;font-size:14px;color:#444;line-height:1.6;white-space:pre-line;">${teamMembers}</div></div>` : ''}
            ${upcomingEvents ? `<div style="margin-top:16px;"><p style="font-weight:700;color:#333;font-size:14px;margin-bottom:8px;">Upcoming Events & Bookings:</p><div style="background:white;border-left:4px solid #6a256f;padding:14px 16px;border-radius:4px;font-size:14px;color:#444;line-height:1.6;white-space:pre-line;">${upcomingEvents}</div></div>` : ''}
            ${welcomeEmail ? `<div style="margin-top:16px;"><p style="font-weight:700;color:#333;font-size:14px;margin-bottom:8px;">Welcome Email Copy:</p><div style="background:white;border-left:4px solid #EF4561;padding:14px 16px;border-radius:4px;font-size:14px;color:#444;line-height:1.6;white-space:pre-line;">${welcomeEmail}</div></div>` : ''}
            ${firstResponseEmail ? `<div style="margin-top:16px;"><p style="font-weight:700;color:#333;font-size:14px;margin-bottom:8px;">First Response Email Copy:</p><div style="background:white;border-left:4px solid #EF4561;padding:14px 16px;border-radius:4px;font-size:14px;color:#444;line-height:1.6;white-space:pre-line;">${firstResponseEmail}</div></div>` : ''}
            ${followUpEmail ? `<div style="margin-top:16px;"><p style="font-weight:700;color:#333;font-size:14px;margin-bottom:8px;">Follow-Up Sequence Copy:</p><div style="background:white;border-left:4px solid #EF4561;padding:14px 16px;border-radius:4px;font-size:14px;color:#444;line-height:1.6;white-space:pre-line;">${followUpEmail}</div></div>` : ''}
            ${notes ? `<div style="margin-top:16px;"><p style="font-weight:700;color:#333;font-size:14px;margin-bottom:8px;">Additional Notes:</p><div style="background:white;border-left:4px solid #222123;padding:14px 16px;border-radius:4px;font-size:14px;color:#444;line-height:1.6;white-space:pre-line;">${notes}</div></div>` : ''}

            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${adminEmail}?subject=Your Sphere account is on its way!"
                style="background: #E07B20; color: white; padding: 12px 28px; border-radius: 24px; text-decoration: none; font-weight: 700; font-size: 14px;">
                Reply to ${adminName.split(' ')[0]} →
              </a>
            </div>
          </div>
          <div style="padding: 14px 32px; background: #eee; text-align: center; font-size: 11px; color: #999;">
            Sent from the Partner Onboarding form · eventspheresolutions.com/partner-onboarding
          </div>
        </div>
      `,
    })

    await resend.emails.send({
      from: 'Event Sphere Solutions <hello@eventspheresolutions.com>',
      to: adminEmail,
      subject: `We've got everything we need, ${adminName.split(' ')[0]}! 🚀`,
      html: `
        <div style="font-family: Inter, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #222123; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #1a0f40 0%, #6a256f 60%, #1a0f40 100%); padding: 28px 40px; border-radius: 12px 12px 0 0; text-align: center;">
            <img src="https://www.eventspheresolutions.com/images/logo-main.png" alt="Event Sphere Solutions" style="height: 60px; width: auto;" />
            <div style="margin-top: 10px; display: inline-block; background: #E07B20; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.08em; text-transform: uppercase;">Partner Onboarding</div>
          </div>
          <div style="height: 4px; background: linear-gradient(90deg, #6a256f, #EF4561, #E07B20);"></div>
          <div style="padding: 40px 40px 32px;">
            <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: #222123; letter-spacing: -0.5px;">You're all set, ${adminName.split(' ')[0]}! 🚀</h2>
            <p style="color: #555; line-height: 1.7; margin: 0 0 28px; font-size: 15px;">
              We've received everything we need to migrate <strong style="color: #222123;">${businessName}</strong> onto Sphere. Your account will be live within <strong style="color: #222123;">2 business days</strong>.
            </p>
            <p style="color: #555; font-size: 14px; margin: 0 0 4px;">Questions in the meantime? Just reply to this email.</p>
            <p style="color: #555; font-size: 14px; margin: 0;">— <strong style="color: #222123;">The Event Sphere Solutions Team</strong></p>
          </div>
          <div style="padding: 20px 40px; background: #1a0f40; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Event Sphere Solutions · <a href="https://eventspheresolutions.com" style="color: #E07B20; text-decoration: none;">eventspheresolutions.com</a>
            </p>
          </div>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Partner onboarding email error:', error)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify with curl (sends real emails — use an email address you can check)**

```bash
npm run dev
```

```bash
curl -s -X POST http://localhost:3000/api/partner-onboarding \
  -H "Content-Type: application/json" \
  -d '{
    "adminName": "Test Admin",
    "adminEmail": "YOUR_OWN_EMAIL@example.com",
    "businessName": "Test Venue",
    "contactsExportUrl": "https://example.com/fake-export.csv",
    "businessHours": [{"day":"Monday","closed":false,"open":"09:00","close":"18:00"}],
    "spaces": [{"name":"Main Hall","capacity":"100"}],
    "templatesUrls": []
  }'
```

Replace `YOUR_OWN_EMAIL@example.com` with a real inbox you control. Expected: `{"success":true}`, plus two real emails arrive — one at `hello@eventspheresolutions.com` and one at the address you supplied. Then verify the 400 path:

```bash
curl -s -X POST http://localhost:3000/api/partner-onboarding \
  -H "Content-Type: application/json" \
  -d '{"adminName": "Test"}'
```

Expected: `{"error":"Missing required fields"}`.

- [ ] **Step 3: Commit**

```bash
git add app/api/partner-onboarding/route.js
git commit -m "Add partner onboarding submission route with Resend notification and confirmation emails"
```

---

### Task 11: End-to-end manual verification

**Files:** none (verification only)

- [ ] **Step 1: Full happy-path click-through**

With `npm run dev` running and `BLOB_READ_WRITE_TOKEN` set (Task 1), go to `http://localhost:3000/partner-onboarding` in a browser and:
1. Fill Step 1 with a real name, an email address you control, and a business name. Click Continue.
2. Fill Step 2 — set a capacity, description, currency, address, mark Sunday as Closed, leave the rest with default hours. Click Continue.
3. On Step 3, add a second space row, upload a small logo image, fill brand colors and tax/fees, upload a small PDF for Policies and one for Menu. Confirm each shows the green "✓ uploaded" state before continuing. Click Continue.
4. Fill all three email textareas on Step 4. Click Continue.
5. On Step 5, list a team member, upload a small CSV as the contacts export, add an upcoming event note, upload one PDF as a proposal template, add a note. Click Submit.
6. Confirm the success screen renders with your name and business name interpolated correctly.
7. Check the inbox you used as the admin email — confirm the confirmation email arrived and renders correctly (no broken layout, correct business name and 2-business-day copy).
8. Check `hello@eventspheresolutions.com` — confirm the team notification arrived with every field you entered, including working links for the logo/policies/menu/contacts/templates uploads.

- [ ] **Step 2: Confirm required-field gating**

Reload the page and try to skip Step 1 (click Continue immediately) — confirm it's blocked with visible errors. Get to Step 5 and try to Submit without uploading a contacts export — confirm it's blocked with the red message and does not send a request.

- [ ] **Step 3: Clean up the throwaway verification data**

No cleanup needed in code — this task only verifies behavior. If test emails are undesirable in the shared inbox, note that to whoever monitors `hello@eventspheresolutions.com` (this plan doesn't include an automated way to delete sent emails).

No commit for this task — it's verification only, not a code change.
