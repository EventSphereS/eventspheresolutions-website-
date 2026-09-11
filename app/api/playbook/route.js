import { Resend } from 'resend'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await request.json()
    const { name, email } = body

    if (!name || !email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const downloadUrl = 'https://www.eventspheresolutions.com/private-event-lead-gen-playbook.html'

    // Notify the Event Sphere team
    await resend.emails.send({
      from: 'Event Sphere Website <hello@eventspheresolutions.com>',
      to: 'hello@eventspheresolutions.com',
      replyTo: email,
      subject: `New Playbook Download — ${name}`,
      html: `
        <div style="font-family: Inter, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #222123; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #1a0f40 0%, #6a256f 60%, #1a0f40 100%); padding: 28px 40px; border-radius: 12px 12px 0 0;">
            <span style="color: white; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7;">New Lead</span>
            <h1 style="color: white; margin: 6px 0 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Playbook Download</h1>
            <p style="color: #E07B20; margin: 4px 0 0; font-size: 14px; font-weight: 600;">Event Sphere Solutions</p>
          </div>
          <div style="height: 4px; background: linear-gradient(90deg, #6a256f, #EF4561, #E07B20);"></div>
          <div style="padding: 20px 40px 32px;">
            <table style="width: 100%; border-collapse: collapse; background: #faf7ff; border-radius: 12px; overflow: hidden;">
              <tr style="background: #faf7ff;">
                <td style="padding: 12px 16px; font-weight: 600; color: #6a256f; font-size: 13px; width: 35%; border-bottom: 1px solid #f0ebf8;">Name</td>
                <td style="padding: 12px 16px; font-size: 13px; color: #333; border-bottom: 1px solid #f0ebf8;">${name}</td>
              </tr>
              <tr style="background: #ffffff;">
                <td style="padding: 12px 16px; font-weight: 600; color: #6a256f; font-size: 13px; width: 35%;">Email</td>
                <td style="padding: 12px 16px; font-size: 13px; color: #333;"><a href="mailto:${email}" style="color: #E07B20; text-decoration: none;">${email}</a></td>
              </tr>
            </table>
          </div>
          <div style="padding: 20px 40px; background: #1a0f40; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">
              Sent from eventspheresolutions.com/playbook
            </p>
          </div>
        </div>
      `,
    })

    // Confirmation email to the lead with the download link
    await resend.emails.send({
      from: 'Event Sphere Solutions <hello@eventspheresolutions.com>',
      to: email,
      subject: `Your Private Event Playbook is ready, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family: Inter, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #222123; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #1a0f40 0%, #6a256f 60%, #1a0f40 100%); padding: 28px 40px; border-radius: 12px 12px 0 0; text-align: center;">
            <img src="https://www.eventspheresolutions.com/images/logo-main.png" alt="Event Sphere Solutions" style="height: 60px; width: auto;" />
          </div>
          <div style="height: 4px; background: linear-gradient(90deg, #6a256f, #EF4561, #E07B20);"></div>
          <div style="padding: 40px 40px 32px;">
            <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: #222123; letter-spacing: -0.5px;">Hi ${name.split(' ')[0]}, here's your playbook 🎉</h2>
            <p style="color: #555; line-height: 1.7; margin: 0 0 24px; font-size: 15px;">
              Thanks for downloading the Private Event Lead Generation Marketing Playbook. Click below to open it — you can read it in your browser or save it as a PDF.
            </p>
            <div style="text-align: center; margin-bottom: 28px;">
              <a href="${downloadUrl}" target="_blank"
                style="background: linear-gradient(135deg, #6a256f, #EF4561, #E07B20); color: white; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block;">
                Open Your Playbook →
              </a>
            </div>
            <p style="color: #555; font-size: 14px; margin: 0;">Want us to build and run this system for your venue? Just reply to this email.<br/>
            <strong style="color: #222123;">The Event Sphere Solutions Team</strong></p>
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
    console.error('Playbook email error:', error)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
