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
        <div style="font-family: Inter, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #222123; background: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a0f40 0%, #6a256f 60%, #1a0f40 100%); padding: 28px 40px; border-radius: 12px 12px 0 0;">
            <span style="color: white; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7;">New Inquiry</span>
            <h1 style="color: white; margin: 6px 0 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Consultation Request</h1>
            <p style="color: #E07B20; margin: 4px 0 0; font-size: 14px; font-weight: 600;">Event Sphere Solutions</p>
          </div>
          <div style="height: 4px; background: linear-gradient(90deg, #6a256f, #EF4561, #E07B20);"></div>

          <!-- Alert banner -->
          <div style="background: #fff8f0; border-left: 4px solid #E07B20; padding: 14px 20px; margin: 24px 40px 0; border-radius: 8px; font-size: 14px; color: #333;">
            <strong style="color: #E07B20;">${name}</strong> from <strong>${businessName}</strong> wants a consultation.
          </div>

          <!-- Details table -->
          <div style="padding: 20px 40px 32px;">
            <table style="width: 100%; border-collapse: collapse; background: #faf7ff; border-radius: 12px; overflow: hidden;">
              ${[
                ['Name', name],
                ['Email', `<a href="mailto:${email}" style="color: #E07B20; text-decoration: none;">${email}</a>`],
                phone ? ['Phone', phone] : null,
                ['Business', businessName],
                ['Type', businessType || 'Not specified'],
                servicesNeeded?.length > 0 ? ['Services', servicesNeeded.join(', ')] : null,
                timeline ? ['Timeline', timelineLabels[timeline] || timeline] : null,
              ].filter(Boolean).map(([label, value], i) => `
              <tr style="background: ${i % 2 === 0 ? '#faf7ff' : '#ffffff'};">
                <td style="padding: 12px 16px; font-weight: 600; color: #6a256f; font-size: 13px; width: 35%; border-bottom: 1px solid #f0ebf8;">${label}</td>
                <td style="padding: 12px 16px; font-size: 13px; color: #333; border-bottom: 1px solid #f0ebf8;">${value}</td>
              </tr>`).join('')}
            </table>

            ${eventDetails ? `
            <div style="margin-top: 20px;">
              <p style="font-weight: 700; color: #333; font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Event Details / Goals</p>
              <div style="background: #faf7ff; border-left: 4px solid #6a256f; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.7; color: #333;">
                ${eventDetails}
              </div>
            </div>` : ''}

            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${email}?subject=Re: Your Event Sphere Consultation Request"
                style="background: linear-gradient(135deg, #6a256f, #EF4561, #E07B20); color: white; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block;">
                Reply to ${name.split(' ')[0]} →
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 40px; background: #1a0f40; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">
              Sent from eventspheresolutions.com · <a href="https://eventspheresolutions.com" style="color: #E07B20; text-decoration: none;">eventspheresolutions.com</a>
            </p>
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
