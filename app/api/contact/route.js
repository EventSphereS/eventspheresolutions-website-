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
        <div style="font-family: Inter, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #222123; background: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a0f40 0%, #6a256f 60%, #1a0f40 100%); padding: 32px 40px; border-radius: 12px 12px 0 0;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: white; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Event<span style="color: #E07B20;">Sphere</span> Solutions</span>
            </div>
          </div>

          <!-- Orange accent bar -->
          <div style="height: 4px; background: linear-gradient(90deg, #6a256f, #EF4561, #E07B20);"></div>

          <!-- Body -->
          <div style="padding: 40px 40px 32px;">
            <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: #222123; letter-spacing: -0.5px;">Hi ${name.split(' ')[0]}, we got your request! 🎉</h2>
            <p style="color: #555; line-height: 1.7; margin: 0 0 12px; font-size: 15px;">
              Thank you for reaching out to Event Sphere Solutions. We've received your consultation request for <strong style="color: #222123;">${businessName}</strong> and will be in touch within <strong style="color: #222123;">1 business day</strong>.
            </p>
            <p style="color: #555; line-height: 1.7; margin: 0 0 32px; font-size: 15px;">
              In the meantime, feel free to reply to this email if you have any questions.
            </p>

            <!-- Next steps box -->
            <div style="background: #faf7ff; border-radius: 12px; padding: 24px 28px; margin-bottom: 32px; border-left: 4px solid #6a256f;">
              <p style="margin: 0 0 12px; font-weight: 700; font-size: 14px; color: #6a256f; text-transform: uppercase; letter-spacing: 0.08em;">What to expect next</p>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${['Our team reviews your request', 'We reach out to schedule your free 30-min call', 'We prepare a custom event strategy for your venue'].map((step, i) => `
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; border-radius: 50%; background: #E07B20; color: white; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 24px; text-align: center;">${i + 1}</div>
                  <span style="color: #444; font-size: 14px; line-height: 1.6; padding-top: 3px;">${step}</span>
                </div>`).join('')}
              </div>
            </div>

            <p style="color: #555; font-size: 14px; margin: 0;">Looking forward to working with you,<br/>
            <strong style="color: #222123;">The Event Sphere Team</strong></p>
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
    console.error('Email error:', error)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
