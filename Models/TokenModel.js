const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	refreshToken: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 3 }, // Expires in 3 days
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
