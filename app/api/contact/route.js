import { Resend } from 'resend'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await request.json()
    const { name, email, phone, businessName, businessType, servicesNeeded, eventDetails, timeline } = body

    if (!name || !email || !businessName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const timelineLabels = {
      asap: 'As soon as possible',
      '1month': 'Within 1 month',
      '3months': 'Within 3 months',
      '6months': 'Within 6 months',
      planning: 'Just planning ahead',
    }

    // Send notification to Event Sphere team
    await resend.emails.send({
      from: 'Event Sphere Website <hello@eventspheresolutions.com>',
      to: 'hello@eventspheresolutions.com',
      replyTo: email,
      subject: `New Consultation Request — ${businessName} (${businessType || 'Unknown type'})`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #222123;">
          <div style="background: #222123; padding: 24px 32px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">
              New Consultation Request
            </h1>
            <p style="color: #E07B20; margin: 4px 0 0; font-size: 14px;">Event Sphere Solutions</p>
          </div>

          <div style="padding: 32px; background: #f9f9f9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 35%; color: #555; font-size: 14px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555; font-size: 14px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;"><a href="mailto:${email}" style="color: #E07B20;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555; font-size: 14px;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${phone}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555; font-size: 14px;">Business</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${businessName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555; font-size: 14px;">Business Type</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${businessType || 'Not specified'}</td>
              </tr>
              ${servicesNeeded?.length > 0 ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555; font-size: 14px; vertical-align: top;">Services</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${servicesNeeded.join('<br/>')}</td>
              </tr>` : ''}
              ${timeline ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555; font-size: 14px;">Timeline</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${timelineLabels[timeline] || timeline}</td>
              </tr>` : ''}
            </table>

            ${eventDetails ? `
            <div style="margin-top: 24px;">
              <p style="font-weight: 600; color: #555; font-size: 14px; margin-bottom: 8px;">Event Details / Goals</p>
              <div style="background: white; border-left: 3px solid #E07B20; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #333;">
                ${eventDetails}
              </div>
            </div>` : ''}

            <div style="margin-top: 32px; text-align: center;">
              <a href="mailto:${email}?subject=Re: Your Event Sphere Consultation Request"
                style="background: #E07B20; color: white; padding: 12px 28px; border-radius: 24px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Reply to ${name.split(' ')[0]} →
              </a>
            </div>
          </div>

          <div style="padding: 16px 32px; background: #eee; text-align: center; font-size: 12px; color: #999;">
            Sent from eventspheresolutions.com contact form
          </div>
        </div>
      `,
    })

    // Send confirmation to the prospect
    await resend.emails.send({
      from: 'Event Sphere Solutions <hello@eventspheresolutions.com>',
      to: email,
      subject: `We received your request, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #222123;">
          <div style="background: #222123; padding: 24px 32px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Event<span style="color: #E07B20;">Sphere</span> Solutions</h1>
          </div>

          <div style="padding: 40px 32px;">
            <h2 style="margin-top: 0; font-size: 24px;">Hi ${name.split(' ')[0]}, we got your request! 🎉</h2>
            <p style="color: #555; line-height: 1.7;">
              Thank you for reaching out to Event Sphere Solutions. We've received your consultation request for <strong>${businessName}</strong> and will be in touch within <strong>1 business day</strong>.
            </p>
            <p style="color: #555; line-height: 1.7;">
              In the meantime, feel free to reply to this email if you have any questions.
            </p>

            <div style="background: #f9f9f9; border-radius: 12px; padding: 24px; margin: 32px 0;">
              <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px; color: #333;">What to expect next:</p>
              <ul style="margin: 0; padding-left: 20px; color: #555; font-size: 14px; line-height: 2;">
                <li>Our team reviews your request</li>
                <li>We reach out to schedule your free 30-min call</li>
                <li>We prepare a custom event strategy for your venue</li>
              </ul>
            </div>

            <p style="color: #555;">Looking forward to working with you,<br/>
            <strong>The Event Sphere Team</strong></p>
          </div>

          <div style="padding: 16px 32px; background: #222123; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Event Sphere Solutions · <a href="https://eventspheresolutions.com" style="color: #E07B20;">eventspheresolutions.com</a>
            </p>
          </div>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
