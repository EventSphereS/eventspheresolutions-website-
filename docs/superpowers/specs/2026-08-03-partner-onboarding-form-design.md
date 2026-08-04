# Partner Onboarding Form — Design Spec

**Date:** 2026-08-03 (revised)
**Status:** Approved

## Purpose

Once a business is approved as a Sphere Founding Partner, Event Sphere Solutions needs a single link to send them that collects everything required to fully migrate them onto the Sphere platform: venue details, branding assets, policy/menu documents, automated email copy, team members, and their existing contacts/bookings/proposal templates.

This is an **intake form filled out by the client**, reviewed and acted on by the Event Sphere Solutions team to perform the migration — it does not call the Sphere app's account-creation API directly. Field groupings mirror the real Sphere app's own "Venue Onboarding" wizard (Basic Info → Location → Spaces → Branding) and its Venue Management sections (Policies, Tax & Fee, Menu, Email Templates) so the team has everything needed to configure the account, in Sphere's own terms.

## Architecture

Follows the same pattern as the existing `/founding-partner` application form for the page/component/API-route split, but uses **Vercel Blob** for file uploads instead of a database, since submissions now include real files (logo, PDFs, CSV):

- `app/partner-onboarding/page.js` — page shell with intro copy explaining what the form is for and what happens after submission; renders `PartnerOnboardingForm`.
- `components/PartnerOnboardingForm.jsx` — client component, multi-step wizard (5 steps), mirrors the existing `FoundingPartnerForm.jsx` structure (step state, per-step validation, progress bar, success screen), plus file upload inputs using `@vercel/blob/client` for direct-to-blob uploads.
- `app/api/partner-onboarding/route.js` — POST handler using Resend: sends one notification email to the Event Sphere Solutions team (with links to the uploaded files in Blob storage) and one confirmation email to the partner.
- Vercel Blob client uploads bypass Vercel's ~4.5MB serverless request body limit, which matters here since contacts exports, PDFs, and templates can be sizable. Uploaded files land in Blob storage; the final form submission (JSON, text fields + blob URLs) is well under the size limit.

The page is unlisted (not linked from site navigation) — access is via a direct link sent to approved partners, the same way `/founding-partner` is used today.

## Field List

### Step 1 — Your Info & Business
| Field | Type | Required |
|---|---|---|
| Admin full name | text | yes |
| Admin email (becomes Sphere login) | email | yes |
| Admin phone | tel | no |
| Business/venue name | text | yes |
| Subdomain preference | text, previewed as `____.eventspheresolutions.com` | no |

### Step 2 — Venue Basics
*(Mirrors Sphere's own "Basic Info" onboarding step.)*
| Field | Type | Required |
|---|---|---|
| Total capacity | number | no |
| Description | textarea | no |
| Currency | select (USD, etc.) | no |
| Business address | text | no |
| Business hours | per-day (Mon–Sun) row: Closed toggle + open/close time pickers | no |

### Step 3 — Spaces & Branding
| Field | Type | Required |
|---|---|---|
| Event spaces | repeatable rows: space name + capacity ("Add another space") | no |
| Logo | file upload (image) | no |
| Brand colors | text (optional hex codes) | no |
| Policies document | file upload (PDF) | no |
| Menu document | file upload (PDF) | no |
| Tax rate(s) & fees | text (e.g. "8.5% sales tax, 20% service fee") | no |

### Step 4 — Automated Emails
| Field | Type | Required |
|---|---|---|
| Welcome email copy | textarea | no |
| First response email copy | textarea | no |
| Follow-up sequence copy | textarea | no |

### Step 5 — Team & Migration Data
| Field | Type | Required |
|---|---|---|
| Team members to invite | textarea, one per line: `Name, email, role` | no |
| Contacts/leads export | file upload (CSV/spreadsheet) | yes |
| Upcoming events & bookings | textarea (free text — dates/clients listed directly) | no |
| Proposal & contract templates | file upload (PDF/doc, multiple) | no |
| Anything else we should know? | textarea | no |

## Submission Flow

1. Client-side validation runs per step (required fields above) before advancing — same pattern as `FoundingPartnerForm.jsx`'s `validateStep1`.
2. File fields (logo, policies PDF, menu PDF, contacts export, proposal templates) upload directly to Vercel Blob as they're selected, using client-side upload tokens issued by a small helper route (`app/api/partner-onboarding/upload/route.js`) so large files never pass through the main form-submission request.
3. On final step submit, `PartnerOnboardingForm` POSTs all text fields plus the resulting blob URLs as JSON to `/api/partner-onboarding`.
4. The API route validates required fields server-side (admin name, admin email, business name, contacts export) and returns 400 if missing.
5. On success, it sends two emails via Resend:
   - **Team notification** → `hello@eventspheresolutions.com`, `replyTo` set to the admin's email, subject `🚀 Partner Onboarding — {businessName}`. Body is a table of all fields plus the free-text sections, with the uploaded files listed as clickable Blob URLs, styled consistently with the existing founding-partner notification email.
   - **Partner confirmation** → the admin's email, reusing the branded email shell from `app/api/founding-partner/route.js` (same header/footer treatment), confirming receipt and stating their account will be live within 2 business days.
6. On network/send/upload failure, the form shows an inline error and falls back to "Please email us at hello@eventspheresolutions.com", matching the existing form's failure behavior.

## Out of Scope

- No database/persistence of submissions beyond the uploaded files sitting in Blob storage and the notification email — consistent with the rest of this repo (email inbox is the system of record).
- No real account creation or Sphere API integration — a human on the Event Sphere Solutions team performs the actual account setup and migration using the submitted data.
- No admin-side dashboard to view past submissions.
- Location and full Spaces-step parity with the in-app wizard (beyond capacity/address/space list) is approximated here since only the Basic Info step of that wizard was available as reference; if more of the in-app wizard's fields surface later, extend Step 2/3 accordingly rather than redesigning.

## Testing

Manual verification in a browser (dev server): click through all 5 steps, confirm per-step validation blocks advancement when required fields are empty, confirm file uploads succeed and produce a blob URL, confirm the final submit request succeeds and the success screen renders. Email deliverability itself is not verified in this pass (requires a live Resend key), but the request/response contract is confirmed.
