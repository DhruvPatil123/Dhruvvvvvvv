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
  const payload = await request.json() as ContactPayload

  if (!isValidPayload(payload)) {
    return NextResponse.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Contact form is not configured yet.' }, { status: 503 })
  }

  const name = payload.name.trim()
  const email = payload.email.trim()
  const message = payload.message.trim()
  const to = process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL
  const from = process.env.RESEND_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>'

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
    return NextResponse.json({ error: 'Unable to send message right now.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
