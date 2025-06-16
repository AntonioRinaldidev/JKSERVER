const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/send', async (req, res) => {
	const { name, email, subject, message } = req.body;

	if (!name || !email || !message || !subject) {
		return res.status(400).json({
			isSuccess: false,
			message:
				'Tutti i campi (nome, email, oggetto, messaggio) sono obbligatori.',
		});
	}

	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.CONTACT_EMAIL_FROM,
				pass: process.env.CONTACT_EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: `"ARDEV Website" <${process.env.CONTACT_EMAIL_FROM}>`,
			to: process.env.CONTACT_EMAIL_TO,
			subject: '📬 Nuova richiesta di contatto - ARDEV',
			html: `
<div style="font-family: 'Segoe UI', Roboto, sans-serif; background: #f4f4f8; color: #1f1f1f; padding: 0; margin: 0; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); max-width: 640px; margin: 0 auto;">

  <!-- Header -->
  <div style="background-color: #5b59c5; padding: 24px; text-align: center;">
    <img src="https://antoniorinaldidev.com/public/ardev-2.png" alt="ARDEV Logo" style="max-width: 120px; margin-bottom: 12px;" />
    <h2 style="margin: 0; color: white; font-size: 24px;">📬 New Contact Request</h2>
    <p style="margin: 5px 0 0; color:rgb(255, 225, 199);">from <a href="https://antoniorinaldidev.com" style="color:rgb(255, 119, 0); text-decoration: none;">antoniorinaldidev.com</a></p>
  </div>

  <!-- Main content -->
  <div style="padding: 32px 28px; background-color: #ffffff;">
    <h3 style="margin-bottom: 24px; font-size: 18px; color: #5b59c5; border-bottom: 1px solid #ddd; padding-bottom: 8px;">📩 Contact Details</h3>

    <div style="margin-bottom: 20px;">
      <strong style="display: block; font-weight: 600; margin-bottom: 6px;">👤 Name</strong>
      <span style="color: #333;">${name}</span>
    </div>

    <div style="margin-bottom: 20px;">
      <strong style="display: block; font-weight: 600; margin-bottom: 6px;">📧 Email</strong>
      <a href="mailto:${email}" style="color: #5b59c5; text-decoration: underline;">${email}</a>
    </div>

    <div style="margin-bottom: 20px;">
      <strong style="display: block; font-weight: 600; margin-bottom: 6px;">📌 Subject</strong>
      <span style="color: #333;">${subject}</span>
    </div>

    <div style="margin-bottom: 20px;">
      <strong style="display: block; font-weight: 600; margin-bottom: 6px;">💬 Message</strong>
      <p style="white-space: pre-line; line-height: 1.6; color: #444;">${message.replace(
				/\n/g,
				'<br />'
			)}</p>
    </div>
  </div>

  <!-- Footer -->
  <div style="background-color: #5b59c5; padding: 18px; text-align: center; color: #e5e7eb; font-size: 13px;">
    <p style="margin: 0;">&copy; ${new Date().getFullYear()} <strong style="color: #fff;">ANTONIORINALDIDEV</strong> | All rights reserved</p>
    <p style="margin: 6px 0 0;"><a href="https://antoniorinaldidev.com" style="color: #facc15; text-decoration: none;">antoniorinaldidev.com</a></p>
  </div>

</div>
`,

			replyTo: email,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({
			isSuccess: true,
			message: 'Email inviata con successo.',
		});
	} catch (error) {
		console.error('❌ Errore durante l’invio email:', error.message);
		res.status(500).json({
			isSuccess: false,
			message: 'Errore durante l’invio dell’email.',
		});
	}
});

module.exports = router;
