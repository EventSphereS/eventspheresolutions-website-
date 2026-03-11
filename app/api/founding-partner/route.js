import { Resend } from 'resend'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await request.json()
    const {
      name, email, phone, businessName, businessType, city,
      eventFrequency, currentTool, biggestChallenge, whyPartner, canProvideTestimonial,
    } = body

    if (!name || !email || !businessName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Notify the Event Sphere team
    await resend.emails.send({
      from: 'Event Sphere Website <hello@eventspheresolutions.com>',
      to: 'hello@eventspheresolutions.com',
      replyTo: email,
      subject: `🏆 New Founding Partner Application — ${businessName} (${city || 'Location TBD'})`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 620px; margin: 0 auto; color: #222123;">
          <div style="background: linear-gradient(135deg, #222123, #6a256f); padding: 28px 32px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">🏆 New Founding Partner Application</h1>
            <p style="color: #E07B20; margin: 4px 0 0; font-size: 14px;">Event Sphere Solutions</p>
          </div>

          <div style="padding: 32px; background: #f9f9f9;">

            <div style="background: #E07B20; color: white; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px; font-size: 15px;">
              <strong>${name}</strong> from <strong>${businessName}</strong> ${city ? `in <strong>${city}</strong>` : ''} wants to join as a Founding Partner.
            </div>

            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden;">
              ${[
                ['Name', name],
                ['Email', `<a href="mailto:${email}" style="color: #E07B20;">${email}</a>`],
                phone ? ['Phone', phone] : null,
                ['Business', businessName],
                ['Type', businessType || 'Not specified'],
                ['City', city || 'Not specified'],
                ['Event Frequency', eventFrequency || 'Not specified'],
                ['Current Tool', currentTool || 'Not specified'],
                ['Open to Case Study?', canProvideTestimonial || 'Not answered'],
              ].filter(Boolean).map(([label, value]) => `
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555; font-size: 13px; width: 35%; vertical-align: top;">${label}</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #f0f0f0; font-size: 13px;">${value}</td>
                </tr>
              `).join('')}
            </table>

            ${biggestChallenge ? `
            <div style="margin-top: 20px;">
              <p style="font-weight: 700; color: #333; font-size: 14px; margin-bottom: 8px;">Biggest Event Sales Challenge:</p>
              <div style="background: white; border-left: 4px solid #E07B20; padding: 14px 16px; border-radius: 4px; font-size: 14px; color: #444; line-height: 1.6;">${biggestChallenge}</div>
            </div>` : ''}

            ${whyPartner ? `
            <div style="margin-top: 16px;">
              <p style="font-weight: 700; color: #333; font-size: 14px; margin-bottom: 8px;">Why They Want to Be a Founding Partner:</p>
              <div style="background: white; border-left: 4px solid #222123; padding: 14px 16px; border-radius: 4px; font-size: 14px; color: #444; line-height: 1.6;">${whyPartner}</div>
            </div>` : ''}

            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${email}?subject=Your Event Sphere Founding Partner Application"
                style="background: #E07B20; color: white; padding: 12px 28px; border-radius: 24px; text-decoration: none; font-weight: 700; font-size: 14px;">
                Reply to ${name.split(' ')[0]} →
              </a>
            </div>
          </div>

          <div style="padding: 14px 32px; background: #eee; text-align: center; font-size: 11px; color: #999;">
            Sent from the Founding Partner application form · eventspheresolutions.com/founding-partner
          </div>
        </div>
      `,
    })

    // Send confirmation to applicant
    await resend.emails.send({
      from: 'Event Sphere Solutions <hello@eventspheresolutions.com>',
      to: email,
      subject: `Your Founding Partner application is in, ${name.split(' ')[0]}! 🎉`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #222123;">
          <div style="background: #222123; padding: 24px 32px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Event<span style="color: #E07B20;">Sphere</span> Solutions</h1>
          </div>

          <div style="padding: 40px 32px;">
            <h2 style="margin-top: 0; font-size: 26px;">Application received, ${name.split(' ')[0]}! 🏆</h2>
            <p style="color: #555; line-height: 1.7;">
              We've received your Founding Partner application for <strong>${businessName}</strong>. We review every application personally and will be in touch within <strong>48 hours</strong>.
            </p>

            <div style="background: #E07B20; border-radius: 12px; padding: 20px 24px; margin: 28px 0; color: white;">
              <p style="margin: 0 0 10px; font-weight: 700; font-size: 15px;">What you applied for:</p>
              <ul style="margin: 0; padding-left: 18px; line-height: 2; font-size: 14px;">
                <li>3 months free access to Revenue Growth ($239/mo value)</li>
                <li>Permanently locked Founding Partner pricing</li>
                <li>First access to every new feature</li>
                <li>Dedicated onboarding setup</li>
              </ul>
            </div>

            <div style="background: #f5f5f5; border-radius: 12px; padding: 20px 24px; margin: 20px 0;">
              <p style="margin: 0 0 8px; font-weight: 700; font-size: 14px;">What happens next:</p>
              <ol style="margin: 0; padding-left: 18px; color: #555; font-size: 14px; line-height: 2.2;">
                <li>We review your application (within 48 hours)</li>
                <li>You receive an acceptance email from our team</li>
                <li>We schedule your 30-min onboarding call</li>
                <li>Your account goes live — free for 90 days</li>
              </ol>
            </div>

            <p style="color: #555; font-size: 14px;">Questions? Just reply to this email — we read everything.</p>
            <p style="color: #555;">— The Event Sphere Team</p>
          </div>

          <div style="padding: 16px 32px; background: #222123; text-align: center;">
            <p style="color: #555; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Event Sphere Solutions · <a href="https://eventspheresolutions.com" style="color: #E07B20;">eventspheresolutions.com</a>
            </p>
          </div>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Founding partner email error:', error)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }
}
