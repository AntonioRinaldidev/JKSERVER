const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

/**
 * @swagger
 * /api/contact/send:
 *   post:
 *     summary: Invia una richiesta di contatto via email
 *     description: Invia i dati compilati dal form al proprietario del sito tramite email
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mario Rossi
 *               email:
 *                 type: string
 *                 example: mario.rossi@example.com
 *               subject:
 *                 type: string
 *                 example: Richiesta di preventivo
 *               message:
 *                 type: string
 *                 example: Vorrei un preventivo per il mio progetto.
 *     responses:
 *       200:
 *         description: Email inviata correttamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email inviata con successo.
 *       500:
 *         description: Errore durante l'invio dell'email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Errore durante l’invio dell’email.
 */

router.post("/send", async (req, res) => {
	const { name, email, subject, message } = req.body;

	// ✅ Validazione base dei dati
	if (!name || !email || !message || !subject) {
		return res.status(400).json({
			success: false,
			message:
				"Tutti i campi (nome, email, oggetto, messaggio) sono obbligatori.",
		});
	}

	try {
		// ✅ Configurazione trasportatore nodemailer
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587, // ✅ porta aperta su Hetzner
			secure: false, // ❌ NO secure su 587
			auth: {
				user: process.env.CONTACT_EMAIL_FROM,
				pass: process.env.CONTACT_EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: `"ARDEV Website" <${process.env.CONTACT_EMAIL_FROM}>`,
			to: process.env.CONTACT_EMAIL_TO,
			subject: "📬 Nuova richiesta di contatto - ARDEV",
			html: `
        <div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 90vw; margin: 0 auto; background: #f4f4f8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08); border: 1px solid #e0e0e0;">
          <!-- LOGO -->
          <div style="background:#5b59c5; text-align: center; padding: 25px 0 10px;">
            <img src="https://jkryson.com/public/ardev-2.png" alt="ARDEV Logo" style="max-width: 102px; height: auto;" />
          </div>

          <!-- HEADER -->
          <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px 25px; text-align: center;">
            <h2 style="margin: 0; color: #fbbf24; font-size: 26px;">🚀 New Contact Request</h2>
            <p style="margin: 10px 0 0; color: #e5e7eb; font-size: 16px;">Received from <strong style="color: #e5e7eb;">ARDEV Website</strong></p>
          </div>

          <!-- MAIN CONTENT -->
          <div style="padding: 35px 30px; background-color: #ffffff;">
            <h3 style="color: #111827; font-size: 20px; margin-bottom: 25px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">📩 Contact Details</h3>

            <div style="display: flex; flex-direction: column; gap: 25px;">
              <!-- Name -->
              <div style="background: #f9fafb; padding: 20px 20px 15px; border-left: 4px solid #3b82f6; border-radius: 10px;">
                <p style="margin: 0; font-weight: 600; color: #374151; font-size: 15px;">👤 Name</p>
                <p style="margin-top: 6px; font-size: 16px; color: #111827;">${name}</p>
              </div>

              <!-- Email -->
              <div style="background: #f9fafb; padding: 20px 20px 15px; border-left: 4px solid #3b82f6; border-radius: 10px;">
                <p style="margin: 0; font-weight: 600; color: #374151; font-size: 15px;">📧 Email</p>
                <p style="margin-top: 6px; font-size: 16px;">
                  <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                </p>
              </div>

              <!-- Subject -->
              <div style="background: #f9fafb; padding: 20px 20px 15px; border-left: 4px solid #3b82f6; border-radius: 10px;">
                <p style="margin: 0; font-weight: 600; color: #374151; font-size: 15px;">📌 Subject</p>
                <p style="margin-top: 6px; font-size: 16px; color: #111827;">${subject}</p>
              </div>

              <!-- Message -->
              <div style="background: #f9fafb; padding: 20px 20px 15px; border-left: 4px solid #3b82f6; border-radius: 10px;">
                <p style="margin: 0; font-weight: 600; color: #374151; font-size: 15px;">💬 Message</p>
                <p style="margin-top: 10px; font-size: 16px; color: #111827; line-height: 1.6;">
                  ${message.replace(/\n/g, "<br />")}
                </p>
              </div>
            </div>
          </div>

          <!-- FOOTER -->
          <div style="background-color: #0f172a; padding: 20px; text-align: center; color: #9ca3af; font-size: 13px;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} <strong style="color: #fbbf24;">ARDEV</strong> | All rights reserved</p>
            <p style="margin: 5px 0 0;"><a href="https://jkryson.com" style="color: #fbbf24; text-decoration: none;">jkryson.com</a></p>
          </div>
        </div>
      `,
			replyTo: email,
		};

		// ✅ Invio email
		await transporter.sendMail(mailOptions);

		// ✅ Risposta positiva
		res.status(200).json({
			success: true,
			message: "Email inviata con successo.",
		});
	} catch (error) {
		console.error("❌ Errore durante l’invio email:", error.message);
		res.status(500).json({
			success: false,
			message: "Errore durante l’invio dell’email.",
		});
	}
});

module.exports = router;
