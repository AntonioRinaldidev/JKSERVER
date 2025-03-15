
const express = require("express");
const path = require("path");
const router = express.Router();



 /**
 * @swagger
 * /api/download/downloadCV:
 *   get:
 *     summary: Download the CV as a PDF file
 *     description: Returns a PDF file containing the CV. The file is served as a binary stream and triggers a file download in the client.
 *     tags:
 *       - CV
 *     responses:
 *       200:
 *         description: PDF file downloaded successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Error occurred while downloading the file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Download failed
 */

router.get("/downloadCV", (req, res) => {
  const filePath = path.join(__dirname, "../Files/Profile.pdf");
  res.download(filePath, "MyCV.pdf", (err) => {
    if (err) {
      console.error("Download error", err);
      res.status(500).send("Download failed");
    }
  });
});


module.exports = router;