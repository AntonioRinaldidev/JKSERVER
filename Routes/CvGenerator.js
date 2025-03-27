const express = require('express');
const generateCvPdf = require('../utilities/generateCvPdf.js');
// oppure .ts se usi TS

const router = express.Router();

router.post('/pdf', async (req, res) => {
	try {
		const pdfBuffer = await generateCvPdf(req.body);

		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', 'attachment; filename="cv.pdf"');
		res.status(200).send(pdfBuffer);
	} catch (error) {
		console.error('Errore generazione PDF:', error);
		res.status(500).json({ isSuccess: false, error: 'Errore generazione PDF' });
	}
});

module.exports = router;
