import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/send-email", async (req, res) => {
    console.log('Received email request:', req.body.type);
    
    if (!resend) {
      console.warn('RESEND_API_KEY is not set. Skipping email sending.');
      return res.status(500).json({ error: 'Email service not configured. Please set RESEND_API_KEY.' });
    }

    const { type, data } = req.body;
    
    let subject = "";
    let html = "";
    let targetEmail = "info@imperialair-rgv.com"; // Default

    if (type === "proposal") {
      subject = `New Proposal Request from ${data.name}`;
      targetEmail = "info@imperialair-rgv.com";
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
    } else if (type === "evaluation") {
      const isCommercial = data.requestType === 'commercial';
      subject = `New ${isCommercial ? 'Commercial' : 'Residential'} Service Request from ${data.name}`;
      targetEmail = "service@imperialair-rgv.com";
      html = `
        <h1>New ${isCommercial ? 'Commercial' : 'Residential'} Service Request</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service Category:</strong> ${data.serviceType}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `;
    } else if (type === "contact") {
      subject = `New Contact Form Message from ${data.name}`;
      targetEmail = "info@imperialair-rgv.com";
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
      console.log(`Attempting to send email to ${targetEmail} using Resend...`);
      const { data: resendData, error } = await resend.emails.send({
        from: 'noreply@imperialair-rgv.com',
        to: [targetEmail],
        subject: subject,
        html: html,
      });

      if (error) {
        console.error('Resend Validation Error Details:', JSON.stringify(error, null, 2));
        return res.status(400).json({ 
          error: 'Email validation failed. This usually happens if the domain is not verified in Resend or if you are trying to send to an unverified recipient on the free tier.',
          details: error 
        });
      }

      res.json({ success: true, data: resendData });
    } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
