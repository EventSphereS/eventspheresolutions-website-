import { Resend } from 'resend'
import { issueSignedToken, presignUrl, getDownloadUrl } from '@vercel/blob'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const READ_LINK_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000 // 7 days — the maximum Vercel allows

// Uploads are private, so the raw blob URL isn't clickable on its own. Exchange
// it for a signed, time-limited link the team can use to download the file
// directly from the notification email. getDownloadUrl() forces
// Content-Disposition: attachment — without it, private images (logo, cover
// photo) default to "inline" and just open in the browser instead of downloading.
// Falls back to the raw URL if signing fails for any reason, so one bad link
// can't take down the whole email.
async function toReadableLink(url) {
  if (!url) return null
  try {
    const pathname = new URL(url).pathname.replace(/^\//, '')
    const signedToken = await issueSignedToken({
      pathname,
      operations: ['get'],
      validUntil: Date.now() + READ_LINK_LIFETIME_MS,
    })
    const { presignedUrl } = await presignUrl(signedToken, {
      operation: 'get',
      pathname,
      access: 'private',
    })
    return getDownloadUrl(presignedUrl)
  } catch (error) {
    console.error('Partner onboarding: failed to presign read link for', url, error)
    return url
  }
}

export async function POST(request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await request.json()
    const {
      adminName, adminEmail, adminPhone, businessName,
      totalCapacity, description, currency, businessHours,
      streetAddress, city, state, zip, country,
      spaces, spacePhotosUrls, logoUrl, coverPhotoUrl, brandColors, policiesUrl, menuUrl, taxAndFees,
      welcomeEmail, firstResponseEmail, followUpEmail,
      teamMembers, contactsExportUrl, upcomingEvents, upcomingEventsFileUrl, templatesUrls, notes,
    } = body

    if (!adminName || !adminEmail || !businessName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!EMAIL_PATTERN.test(String(adminEmail).trim())) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Uploaded files are private blobs — swap each raw URL for a 7-day signed
    // read link before it goes anywhere near the email.
    const [
      logoLink, coverPhotoLink, policiesLink, menuLink, contactsLink, upcomingEventsLink, templateLinks, spacePhotoLinks,
    ] = await Promise.all([
      toReadableLink(logoUrl),
      toReadableLink(coverPhotoUrl),
      toReadableLink(policiesUrl),
      toReadableLink(menuUrl),
      toReadableLink(contactsExportUrl),
      toReadableLink(upcomingEventsFileUrl),
      Promise.all((templatesUrls || []).map(toReadableLink)),
      Promise.all((spacePhotosUrls || []).map(toReadableLink)),
    ])

    const address = [streetAddress, city, state, zip, country].filter(Boolean).join(', ')

    const hoursRows = (businessHours || [])
      .map((r) => `${r.day}: ${r.closed ? 'Closed' : `${r.open} – ${r.close}`}`)
      .join('<br>')

    const spacesRows = (spaces || [])
      .filter((s) => s.name)
      .map((s) => `${s.name}${s.capacity ? ` (capacity ${s.capacity})` : ''}`)
      .join('<br>') || 'Not specified'

    const templatesLinks = templateLinks
      .map((url, i) => `<a href="${url}" style="color:#E07B20;">Template ${i + 1}</a>`)
      .join('<br>') || 'None provided'

    const spacePhotosLinks = spacePhotoLinks
      .map((url, i) => `<a href="${url}" style="color:#E07B20;">Space Photo ${i + 1}</a>`)
      .join('<br>')

    const teamResult = await resend.emails.send({
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
                totalCapacity ? ['Total Capacity', totalCapacity] : null,
                ['Currency', currency || 'USD'],
                address ? ['Address', address] : null,
                ['Business Hours', hoursRows],
                ['Event Spaces', spacesRows],
                spacePhotosLinks ? ['Space Photos', spacePhotosLinks] : null,
                logoLink ? ['Logo', `<a href="${logoLink}" style="color:#E07B20;">Download file (link expires in 7 days)</a>`] : null,
                coverPhotoLink ? ['Cover Photo', `<a href="${coverPhotoLink}" style="color:#E07B20;">Download file (link expires in 7 days)</a>`] : null,
                brandColors ? ['Brand Colors', brandColors] : null,
                policiesLink ? ['Policies Doc', `<a href="${policiesLink}" style="color:#E07B20;">Download file (link expires in 7 days)</a>`] : null,
                menuLink ? ['Menu Doc', `<a href="${menuLink}" style="color:#E07B20;">Download file (link expires in 7 days)</a>`] : null,
                taxAndFees ? ['Tax & Fees', taxAndFees] : null,
                contactsLink ? ['Contacts Export', `<a href="${contactsLink}" style="color:#E07B20;">Download file (link expires in 7 days)</a>`] : null,
                upcomingEventsLink ? ['Upcoming Events File', `<a href="${upcomingEventsLink}" style="color:#E07B20;">Download file (link expires in 7 days)</a>`] : null,
                ['Proposal/Contract Templates', templatesLinks],
              ].filter(Boolean).map(([label, value]) => `
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555; font-size: 13px; width: 35%; vertical-align: top;">${label}</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #f0f0f0; font-size: 13px;">${value}</td>
                </tr>
              `).join('')}
            </table>

            <p style="margin: 12px 2px 0; font-size: 12px; color: #888; line-height: 1.5;">
              🔒 File links above expire in 7 days. Files are stored privately, but reminder: delete the contacts export from Blob storage once you've imported it into Sphere.
            </p>

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

    // The team notification carries the entire submission — there is no database
    // behind this form, so if it fails the submission is lost. Never report success.
    if (teamResult?.error) {
      console.error('Partner onboarding team notification failed:', teamResult.error)
      return Response.json({ error: 'Failed to send' }, { status: 500 })
    }

    // The confirmation email is a courtesy. The team already has the data at this
    // point, so a failure here must NOT fail the request — a false 500 would make
    // the partner retry and send a duplicate team notification.
    try {
      const confirmationResult = await resend.emails.send({
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

      if (confirmationResult?.error) {
        console.error('Partner onboarding confirmation email failed:', confirmationResult.error)
      }
    } catch (confirmationError) {
      console.error('Partner onboarding confirmation email threw:', confirmationError)
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Partner onboarding email error:', error)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }
}
