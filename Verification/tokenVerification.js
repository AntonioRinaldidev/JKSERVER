// utilities/utilities.js
const jwt = require("jsonwebtoken");

// Generate Access Token
const generateAccessToken = (user) => {
	return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "35m" });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
	return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
function verifyToken(req, res, next) {
	const token = req.headers["authorization"];

	if (!token) return res.status(403).json({ message: "Access denied" });

	jwt.verify(token.split("")[1], JWT_SECRET, (err, user) => {
		if (err) return res.status(401).json({ message: "Invalid token" });
		req.user = user;
		next();
	});
}
// Verify Refresh Token
const verifyRefreshToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
			if (err) {
				reject("Invalid refresh token");
			} else {
				resolve(decoded);
			}
		});
	});
};

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	verifyToken,
	verifyRefreshToken,
};
