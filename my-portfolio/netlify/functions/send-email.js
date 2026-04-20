import { Resend } from 'resend';
import process from 'node:process';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server is missing RESEND_API_KEY' }),
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email, message, name } = JSON.parse(event.body ?? '{}');
    const recipientEmail = process.env.CONTACT_TO_EMAIL || 'naji03rahman@gmail.com';
    const displayName = typeof name === 'string' ? name.trim() : '';

    if (!email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and message are required' }),
      };
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Update this to a verified domain when going to prod
      to: [recipientEmail],
      subject: `[PORTFOLIO] Message from ${displayName || email}`,
      text: `From: ${displayName || ''} <${email}>\n\n${message}`,
      replyTo: email,
    });

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error?.message || 'Resend rejected the request' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error?.message || 'Failed to send email' }),
    };
  }
};
