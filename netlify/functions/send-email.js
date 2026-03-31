const { Resend } = require('resend');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  if (!resend) {
    console.warn('RESEND_API_KEY is not set.');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email service not configured. Set RESEND_API_KEY in Netlify environment variables.' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { type, data } = body;
  const FROM_EMAIL = 'noreply@imperialair-rgv.com';

  // Route each form type to the appropriate alias.
  // Both aliases forward to hector.garza@imperialair-rgv.com via Google Workspace.
  // No Resend accounts needed for these - Resend only controls the sender (FROM_EMAIL).
  const EMAIL_ROUTES = {
    proposal:   'info@imperialair-rgv.com',    // Estimate/proposal -> general inbox
    contact:    'info@imperialair-rgv.com',    // General contact -> general inbox
    evaluation: 'service@imperialair-rgv.com', // Site eval / service request -> service inbox
  };

  const TARGET_EMAIL = EMAIL_ROUTES[type];

  if (!TARGET_EMAIL) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Unknown email type' }) };
  }

  let subject = '';
  let html = '';

  if (type === 'proposal') {
    subject = `New Proposal Request from ${data.name}`;
    html = `
      <h1>New Proposal Request</h1>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Facility Type:</strong> ${data.facilityType}</p>
      <p><strong>Square Footage:</strong> ${data.sqft}</p>
      <p><strong>Project Type:</strong> ${data.projectType}</p>
      <p><strong>Timeline:</strong> ${data.timeline}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>File Name:</strong> ${data.fileName || 'None'}</p>
    `;
  } else if (type === 'evaluation') {
    const isCommercial = data.requestType === 'commercial';
    subject = `New ${isCommercial ? 'Commercial' : 'Residential'} Service Request from ${data.name}`;
    html = `
      <h1>New ${isCommercial ? 'Commercial' : 'Residential'} Service Request</h1>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Service Category:</strong> ${data.serviceType}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `;
  } else if (type === 'contact') {
    subject = `New Contact Form Message from ${data.name}`;
    html = `
      <h1>New Contact Form Message</h1>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Service Type:</strong> ${data.serviceType}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `;
  }

  try {
    console.log(`Sending [${type}] email to ${TARGET_EMAIL} via Resend...`);
    const { data: resendData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TARGET_EMAIL],
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error));
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Email send failed. Verify that imperialair-rgv.com is verified in your Resend dashboard.',
          details: error,
        }),
      };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true, data: resendData }) };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
