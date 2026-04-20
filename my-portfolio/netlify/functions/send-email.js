/* global process */
import { Resend } from 'resend';
export const handler = async (event) => {
  // 1. Define CORS headers once to use in all responses
  const headers = {
    'Access-Control-Allow-Origin': '*', // Replace with your Netlify URL in production if desired
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // 2. Handle Browser Pre-flight (OPTIONS)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: 'OK' };
  }

  // 3. Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    // 4. Parse body safely
    const { name, email, message } = JSON.parse(event.body || '{}');

    // 5. Check for required environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_TO_EMAIL || 'playitforpubg@gmail.com';

    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY environment variable.");
    }

    if (!email || !message) {
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ error: "Email and message are required." }) 
      };
    }

    // 6. Initialize Resend and Send
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Fixed the space bug here
      to: [recipientEmail],
      replyTo: email,
      subject: `✨ New Message from ${name || 'Anonymous User'}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1A1A1B; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; padding: 20px;">
          <h2 style="border-bottom: 1px solid #7c3aed; padding-bottom: 10px;">New Portfolio Inquiry</h2>
          <p><strong>From:</strong> ${name || 'Not provided'} (${email})</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 10px; color: #aaa; margin-top: 30px;">Sent from your Horimiya-inspired portfolio.</p>
        </div>
      `,
    });

    if (error) throw error;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data }),
    };

  } catch (err) {
    console.error("Function Error:", err.message);
    
    // Ensure headers are returned here too, otherwise frontend gets a CORS error instead of the real message
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal Server Error' }),
    };
  }
};