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
        <div style="font-family: Inter, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #222123; background: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a0f40 0%, #6a256f 60%, #1a0f40 100%); padding: 32px 40px; border-radius: 12px 12px 0 0;">
            <span style="color: white; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Event<span style="color: #E07B20;">Sphere</span> Solutions</span>
            <div style="margin-top: 8px; display: inline-block; background: #E07B20; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.08em; text-transform: uppercase;">Founding Partner Program</div>
          </div>

          <!-- Orange accent bar -->
          <div style="height: 4px; background: linear-gradient(90deg, #6a256f, #EF4561, #E07B20);"></div>

          <!-- Body -->
          <div style="padding: 40px 40px 32px;">
            <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: #222123; letter-spacing: -0.5px;">Application received, ${name.split(' ')[0]}! 🏆</h2>
            <p style="color: #555; line-height: 1.7; margin: 0 0 28px; font-size: 15px;">
              We've received your Founding Partner application for <strong style="color: #222123;">${businessName}</strong>. We review every application personally and will be in touch within <strong style="color: #222123;">48 hours</strong>.
            </p>

            <!-- What you applied for -->
            <div style="background: linear-gradient(135deg, #6a256f, #EF4561); border-radius: 12px; padding: 24px 28px; margin-bottom: 20px; color: white;">
              <p style="margin: 0 0 14px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">What you applied for</p>
              ${['3 months free access to Revenue Growth ($239/mo value)', 'Permanently locked Founding Partner pricing', 'First access to every new feature', 'Dedicated onboarding & setup'].map(item => `
              <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px;">
                <span style="color: #E07B20; font-weight: 700; font-size: 16px; line-height: 1.4;">✓</span>
                <span style="font-size: 14px; line-height: 1.6; opacity: 0.95;">${item}</span>
              </div>`).join('')}
            </div>

            <!-- What happens next -->
            <div style="background: #faf7ff; border-radius: 12px; padding: 24px 28px; margin-bottom: 28px; border-left: 4px solid #6a256f;">
              <p style="margin: 0 0 14px; font-weight: 700; font-size: 13px; color: #6a256f; text-transform: uppercase; letter-spacing: 0.08em;">What happens next</p>
              ${['We review your application (within 48 hours)', 'You receive an acceptance email from our team', 'We schedule your 30-min onboarding call', 'Your account goes live — free for 90 days'].map((step, i) => `
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 10px;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #E07B20; color: white; font-size: 12px; font-weight: 700; text-align: center; line-height: 24px; flex-shrink: 0;">${i + 1}</div>
                <span style="color: #444; font-size: 14px; line-height: 1.6; padding-top: 3px;">${step}</span>
              </div>`).join('')}
            </div>

            <p style="color: #555; font-size: 14px; margin: 0 0 4px;">Questions? Just reply to this email — we read everything.</p>
            <p style="color: #555; font-size: 14px; margin: 0;">— <strong style="color: #222123;">The Event Sphere Team</strong></p>
          </div>

          <!-- Footer -->
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
    console.error('Founding partner email error:', error)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }
}
