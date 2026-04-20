/* eslint-env node */
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, message, name } = JSON.parse(event.body);

    if (!email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and message are required' }),
      };
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Update this to a verified domain when going to prod
      to: ['naji03rahman@gmail.com'], // Deliver to the user's email as seen in Contact.jsx
      subject: `New Message from ${name || email} (Portfolio)`,
      text: message,
      reply_to: email,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
