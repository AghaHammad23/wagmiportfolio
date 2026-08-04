import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export type ApplyPayload = {
  name: string
  email: string
  phone?: string
  brand?: string
  revenue?: string
  service?: string
  message?: string
}

/* Human-readable labels for the tap-to-select values sent by the modal. */
const revenueLabels: Record<string, string> = {
  'under-20k': 'Under $20k / mo',
  '20-50k': '$20k – $50k / mo',
  '50-200k': '$50k – $200k / mo',
  '200k+': '$200k+ / mo',
}

const serviceLabels: Record<string, string> = {
  engine: 'The Engine — daily content production',
  converter: 'The Converter — ad creatives + VSL',
  'full-funnel': 'The Full Funnel — everything, fully managed',
  'not-sure': 'Not sure yet — help me pick',
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  let body: ApplyPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const phone = body.phone?.trim() ?? ''

  // Name, email and phone are required — everything else is qualifying detail.
  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: 'Name, email and phone number are required.' },
      { status: 400 }
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  if (phone.replace(/\D/g, '').length < 6) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 })
  }

  const application = {
    name,
    email,
    phone,
    brand: body.brand?.trim() || '—',
    revenue: (body.revenue && revenueLabels[body.revenue]) || '—',
    service: (body.service && serviceLabels[body.service]) || '—',
    message: body.message?.trim() || '—',
    submittedAt: new Date().toISOString(),
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    APPLY_TO_EMAIL,
  } = process.env

  // Without SMTP configured the application would be silently lost, so fail
  // loudly in the log but still accept the submission.
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('[apply] SMTP is not configured — application not emailed:', application)
    return NextResponse.json(
      { error: 'Email is not configured on the server. Please try again later.' },
      { status: 500 }
    )
  }

  const port = Number(SMTP_PORT ?? 587)

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // 465 is implicit TLS; 587 upgrades via STARTTLS.
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const rows: [string, string][] = [
    ['Brand / Channel', application.brand],
    ['Monthly Revenue', application.revenue],
    ['Service Needed', application.service],
  ]

  const submittedAt = new Date(application.submittedAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  })

  /* Theme colors as solid hex — email clients (Outlook especially) drop rgba().
     Layout is table-based for the same reason: divs with padding are unreliable. */
  const BG = '#001710'
  const PANEL = '#0C3B2E'
  const CREAM = '#F4F1D6'
  const GOLD = '#E3C24A'
  const MUTED = '#9DAF9F'
  const BORDER = '#1B4C3B'

  const detailRows = rows
    .map(
      ([label, value]) => `
              <tr>
                <td style="padding:14px 16px;border-bottom:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${MUTED};white-space:nowrap;vertical-align:top;width:40%;">${label}</td>
                <td style="padding:14px 16px;border-bottom:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${CREAM};vertical-align:top;">${escapeHtml(value)}</td>
              </tr>`
    )
    .join('')

  const messageBlock =
    application.message === '—'
      ? ''
      : `
            <tr>
              <td style="padding:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${MUTED};">Their message</td>
            </tr>
            <tr>
              <td style="padding:16px 18px;background-color:${PANEL};border-left:3px solid ${GOLD};border-radius:4px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:${CREAM};">${escapeHtml(application.message).replace(/\n/g, '<br>')}</td>
            </tr>
            <tr><td style="height:28px;line-height:28px;font-size:0;">&nbsp;</td></tr>`

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New application</title>
</head>
<body style="margin:0;padding:0;background-color:${BG};">
  <!-- Inbox preview line -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${escapeHtml(application.name)} · ${escapeHtml(application.revenue)} · ${escapeHtml(application.service)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG};">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 24px;border-bottom:2px solid ${GOLD};">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${MUTED};padding-bottom:8px;">
                WAGMI Media · New Application
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:30px;font-weight:bold;color:${GOLD};line-height:1.15;">
                ${escapeHtml(application.name)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${CREAM};padding-top:8px;">
                <a href="mailto:${escapeHtml(application.email)}" style="color:${CREAM};text-decoration:underline;">${escapeHtml(application.email)}</a><span style="color:${MUTED};">&nbsp;&nbsp;·&nbsp;&nbsp;</span><a href="tel:${escapeHtml(application.phone.replace(/[^\d+]/g, ''))}" style="color:${CREAM};text-decoration:underline;">${escapeHtml(application.phone)}</a>
              </div>
            </td>
          </tr>

          <tr><td style="height:28px;line-height:28px;font-size:0;">&nbsp;</td></tr>

          <!-- Details -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:6px;">
                ${detailRows}
              </table>
            </td>
          </tr>

          <tr><td style="height:28px;line-height:28px;font-size:0;">&nbsp;</td></tr>

          ${messageBlock}

          <!-- Reply button -->
          <tr>
            <td>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:${GOLD};border-radius:999px;">
                    <a href="mailto:${escapeHtml(application.email)}?subject=Re%3A%20your%20WAGMI%20application"
                       style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:${BG};text-decoration:none;letter-spacing:0.5px;">
                      Reply to ${escapeHtml(application.name.split(' ')[0])}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:32px;line-height:32px;font-size:0;">&nbsp;</td></tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:20px;border-top:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${MUTED};line-height:1.6;">
              Submitted ${submittedAt} UTC · Sent from the wagmihq.com application form.<br>
              Replying to this email goes straight to the applicant.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = [
    `NEW APPLICATION — ${application.name}`,
    `${application.email}`,
    `${application.phone}`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    `Message: ${application.message}`,
    '',
    `Submitted ${submittedAt} UTC`,
  ].join('\n')

  try {
    await transporter.sendMail({
      from: SMTP_FROM || `WAGMI Media <${SMTP_USER}>`,
      to: APPLY_TO_EMAIL || SMTP_USER,
      // Replying in the inbox goes straight back to the applicant.
      replyTo: `${application.name} <${application.email}>`,
      subject: `New application — ${application.name}${application.brand !== '—' ? ` (${application.brand})` : ''}`,
      text,
      html,
    })
  } catch (err) {
    console.error('[apply] failed to send email:', err)
    return NextResponse.json(
      { error: 'We could not send your application. Please email us directly.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
