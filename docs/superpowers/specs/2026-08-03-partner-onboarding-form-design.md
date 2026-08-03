# Partner Onboarding Form — Design Spec

**Date:** 2026-08-03
**Status:** Approved

## Purpose

Once a business is approved as a Sphere Founding Partner, Event Sphere Solutions needs a single link to send them that collects everything required to (a) manually create their Sphere account and (b) migrate their existing data. Today this happens ad hoc over email/calls. This form replaces that with a structured, one-time intake page.

This is an **intake form for manual setup**, not self-service account creation — submissions are reviewed and acted on by the Event Sphere Solutions team. It does not call the Sphere app's account-creation API.

## Architecture

Follows the same pattern as the existing `/founding-partner` application form (no database, email-based delivery via Resend):

- `app/partner-onboarding/page.js` — page shell with intro copy explaining what the form is for and what happens after submission; renders `PartnerOnboardingForm`.
- `components/PartnerOnboardingForm.jsx` — client component, multi-step wizard (4 steps), mirrors the existing `FoundingPartnerForm.jsx` structure (step state, per-step validation, progress bar, success screen).
- `app/api/partner-onboarding/route.js` — POST handler using Resend: sends one notification email to the Event Sphere Solutions team and one confirmation email to the partner. No persistence — matches the existing `/api/founding-partner/route.js` pattern, which is the only prior art for form submission in this repo.

The page is unlisted (not linked from site navigation) — access is via a direct link sent to approved partners, the same way `/founding-partner` is used today.

## Field List

### Step 1 — Login & Business
| Field | Type | Required |
|---|---|---|
| Admin full name | text | yes |
| Admin email (becomes Sphere login) | email | yes |
| Admin phone | tel | no |
| Business/venue name | text | yes |
| Subdomain preference | text, previewed as `____.eventspheresolutions.com` | no |

### Step 2 — Venue Details
| Field | Type | Required |
|---|---|---|
| Business address | text | no |
| Event spaces/rooms & capacities | textarea | no |
| Business hours | text | no |
| Logo/brand assets link | text (Drive/Dropbox share link) | no |

### Step 3 — Your Team
| Field | Type | Required |
|---|---|---|
| Team members to invite | textarea, one per line: `Name, email, role` | no |

### Step 4 — Migration Data
| Field | Type | Required |
|---|---|---|
| Contacts/leads export link | text (Drive/Dropbox share link) | yes |
| Upcoming events & bookings | textarea (free text — dates/clients listed directly) | no |
| Proposal & contract templates link | text (Drive/Dropbox share link) | no |
| Anything else we should know? | textarea | no |

File handling: no file upload inputs anywhere in the form. Partners share files (logo, contacts export, templates) via a Drive/Dropbox link pasted into a text field. This avoids upload infrastructure and Vercel's request body size limits entirely.

## Submission Flow

1. Client-side validation runs per step (required fields above) before advancing — same pattern as `FoundingPartnerForm.jsx`'s `validateStep1`.
2. On final step submit, `PartnerOnboardingForm` POSTs all collected fields as JSON to `/api/partner-onboarding`.
3. The API route validates required fields server-side (admin name, admin email, business name, contacts export link) and returns 400 if missing.
4. On success, it sends two emails via Resend:
   - **Team notification** → `hello@eventspheresolutions.com`, `replyTo` set to the admin's email, subject `🚀 Partner Onboarding — {businessName}`. Body is a table of all fields plus the free-text sections (event spaces, team list, upcoming events, templates link, notes), styled consistently with the existing founding-partner notification email.
   - **Partner confirmation** → the admin's email, reusing the branded email shell from `app/api/founding-partner/route.js` (same header/footer treatment), confirming receipt and stating their account will be live within 2 business days.
5. On network/send failure, the form shows an inline error and falls back to "Please email us at hello@eventspheresolutions.com", matching the existing form's failure behavior.

## Out of Scope

- No database/persistence of submissions (consistent with the rest of this repo).
- No real account creation or Sphere API integration.
- No file uploads.
- No admin-side dashboard to view past submissions — the email inbox is the system of record, as it already is for founding-partner applications.

## Testing

Manual verification in a browser (dev server): click through all 4 steps, confirm per-step validation blocks advancement when required fields are empty, confirm the submit request succeeds and the success screen renders. Email deliverability itself is not verified in this pass (requires a live Resend key), but the request/response contract is confirmed.
