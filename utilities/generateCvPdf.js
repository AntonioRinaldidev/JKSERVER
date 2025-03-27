const path = require('path');
const { pathToFileURL } = require('url');

async function generateCvPdf(data) {
	// Risolve il path assoluto
	const absolutePath = path.resolve(__dirname, '../ESM/generate-pdf.mjs');
	const fileUrl = pathToFileURL(absolutePath);

	// Importa dinamicamente come ESM URL
	const { generate } = await import(fileUrl.href);

	return await generate(data);
}

module.exports = generateCvPdf;
