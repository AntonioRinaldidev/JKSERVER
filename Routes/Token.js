const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Generates a new access token using the provided refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token to generate a new access token.
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Token aggiornato con successo"
 *                 data:
 *                   type: string
 *                   description: The new access token.
 *       400:
 *         description: Missing or invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Nessun access token trovato"
 *                 data:
 *                   type: string
 *                   nullable: true
 */
router.post("/refresh", (req, res) => {
    const accessToken = generateAccessToken(req.body.refreshToken);
    if (!accessToken) {
        return res.status(400).json({
            isSuccess: false,
            message: "Nessun access token trovato",
            data: null,
        });
    }
    res.cookie("refreshToken", req.body.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.status(200).json({
        isSuccess: true,
        message: "Token aggiornato con successo",
        data: accessToken,
    });
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Clears the refresh token cookie and logs the user out.
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Logout riuscito"
 *                 data:
 *                   type: string
 *                   nullable: true
 */
router.post("/logout", (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({
        isSuccess: true,
        message: "Logout riuscito",
        data: null,
    });
});

module.exports = router;
