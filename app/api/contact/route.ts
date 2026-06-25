import { NextResponse } from 'next/server'

const CONTACT_EMAIL = 'sujalpatil8657231278@gmail.com'
const RESEND_API_URL = 'https://api.resend.com/emails'

type ContactPayload = {
  name?: unknown
  email?: unknown
  message?: unknown
}

type ValidContactPayload = {
  name: string
  email: string
  message: string
}

const isValidPayload = (payload: ContactPayload): payload is ValidContactPayload => (
  typeof payload.name === 'string'
  && payload.name.trim().length > 0
  && typeof payload.email === 'string'
  && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
  && typeof payload.message === 'string'
  && payload.message.trim().length > 0
)

export async function POST(request: Request) {
  try {
    const payload = await request.json() as ContactPayload

    if (!isValidPayload(payload)) {
      return NextResponse.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 })
    }

    const name = payload.name.trim()
    const email = payload.email.trim()
    const message = payload.message.trim()

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.log('=====================================================================')
      console.log('📬 CONTACT FORM SUBMISSION (SIMULATED - RESEND_API_KEY NOT SET IN ENV)')
      console.log(`From: ${name} <${email}>`)
      console.log(`Message: ${message}`)
      console.log('=====================================================================')
      return NextResponse.json({ ok: true, simulated: true })
    }
    let toVal = (process.env.CONTACT_TO_EMAIL ?? '').trim()
    // Strip surrounding quotes if any
    if (toVal.startsWith('"') && toVal.endsWith('"')) {
      toVal = toVal.slice(1, -1).trim()
    }
    if (toVal.startsWith("'") && toVal.endsWith("'")) {
      toVal = toVal.slice(1, -1).trim()
    }

    // Validate that toVal contains a valid email format, else fall back to CONTACT_EMAIL
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    let to = CONTACT_EMAIL
    if (emailRegex.test(toVal)) {
      to = toVal
    } else {
      console.warn(`CONTACT_TO_EMAIL environment variable ("${process.env.CONTACT_TO_EMAIL}") is not a valid email address format. Falling back to "${CONTACT_EMAIL}".`)
    }

    let from = (process.env.RESEND_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>').trim()
    if (from.startsWith('"') && from.endsWith('"')) {
      from = from.slice(1, -1).trim()
    }
    if (from.startsWith("'") && from.endsWith("'")) {
      from = from.slice(1, -1).trim()
    }

    // Free/public email domains cannot be used as the "from" address in Resend.
    // If the user has configured their own Gmail/Yahoo/Outlook/etc. address in RESEND_FROM_EMAIL,
    // we must fallback to 'onboarding@resend.dev' so that Resend accepts and delivers the email.
    const isUnverifiedPublicDomain = (emailStr: string) => {
      const lower = emailStr.toLowerCase()
      return (
        lower.includes('@gmail.com') ||
        lower.includes('@yahoo.com') ||
        lower.includes('@outlook.com') ||
        lower.includes('@hotmail.com') ||
        lower.includes('@icloud.com') ||
        lower.includes('@aol.com') ||
        lower.includes('@protonmail.com') ||
        lower.includes('@proton.me') ||
        lower.includes('@live.com') ||
        lower.includes('@msn.com')
      )
    }

    if (isUnverifiedPublicDomain(from)) {
      console.warn(`RESEND_FROM_EMAIL is set to a public email address ("${from}"). Resend requires a verified custom domain or 'onboarding@resend.dev' to send emails. Falling back to 'onboarding@resend.dev' to ensure successful delivery.`)
      from = 'Portfolio Contact <onboarding@resend.dev>'
    }

    console.log(`Sending email: from="${from}" to="${to}" reply_to="${email}"`)

    const resendResponse = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Portfolio inquiry from ${name}`,
        text: `${message}\n\nFrom: ${name}\nEmail: ${email}`,
      }),
    })

    if (!resendResponse.ok) {
      let resendError = 'Unable to send message right now.'
      try {
        const errorData = await resendResponse.json() as { message?: string }
        if (errorData?.message) {
          resendError = `Resend API Error: ${errorData.message}`
        }
      } catch (e) {
        console.error('Failed to parse Resend error payload:', e)
      }
      console.error('Resend API call failed:', resendResponse.status, resendError)
      return NextResponse.json({ error: resendError }, { status: resendResponse.status })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error handling contact form submission:', err)
    return NextResponse.json({ error: 'An unexpected server error occurred.' }, { status: 500 })
  }
}
