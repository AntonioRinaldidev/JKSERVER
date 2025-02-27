const User = require("../Models/UserModel");
const Token = require("../Models/TokenModel");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../Verification/tokenVerification");
const bcrypt = require("bcrypt");



// Creare un nuovo utente
const createUser = async (req, res) => {
	try {
		console.log("Received data:", req.body);

		const { firstName, lastName, email, password, role } = req.body;

		if (!firstName || !lastName || !email || !password || !role) {
			return res.status(400).json({
				isSuccess: false,
				message: "Tutti i campi sono obbligatori",
				data: null,
			});
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				isSuccess: false,
				message: "L'email è già registrata",
				data: null,
			});
		}

		
		const hashedPassword = await bcrypt.hash(password, 10);

		

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			role,
		});
		await newUser.save();

		const api_response = {
			isSuccess: true,
			message: "Utente creato con successo",
			data: newUser,
		};

		res.status(201).json(api_response);
	} catch (error) {
		console.error("Errore nel server:", error);
		res.status(500).json({
			isSuccess: false,
			message: "Errore durante la creazione",
			data: error.message,
		});
	}
};

// Ottenere un utente
const getUser = async (req, res) => {
	try {
		const email = req.user.email;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				isSuccess: false,
				message: "Utente non trovato",
				data: null,
			});
		}

		const api_response = {
			isSuccess: true,
			message: "Utente trovato",
			data: user,
		};

		res.status(200).json(api_response);
	} catch (error) {
		res.status(500).json({
			isSuccess: false,
			message: "Errore nel recupero dell'utente",
			data: error.message,
		});
	}
};

// Modifica un utente esistente
const modifyUser = async (req, res) => {
	try {
		const { id, updates } = req.body;

		if (Object.keys(updates).length === 0) {
			return res.status(400).json({
				isSuccess: false,
				message: "Nessun dato fornito per l'aggiornamento",
				data: null,
			});
		}

		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ $set: updates },
			{ new: true, runValidators: true }
		);

		if (!updatedUser) {
			return res.status(404).json({
				isSuccess: false,
				message: "Utente non trovato",
				data: null,
			});
		}

		const api_response = {
			isSuccess: true,
			message: "Utente aggiornato con successo",
			data: updatedUser,
		};

		res.status(200).json(api_response);
	} catch (error) {
		res.status(500).json({
			isSuccess: false,
			message: "Errore durante la modifica",
			data: error.message,
		});
	}
};

// Login utente
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                isSuccess: false,
                message: "Email e password sono obbligatori",
                data: null,
            });
        }

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				isSuccess: false,
				message: "Utente non trovato",
				data: null,
			});
		}

		

		// Verifica password
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			console.error("Password mismatch");
			return res.status(401).json({
				isSuccess: false,
				message: "Credenziali non valide",
				data: null,
			});
		}

		

		// Genera token di accesso e refresh
		const accessToken = generateAccessToken({
			userId: user._id,
			email: user.email,
		});
		const refreshToken = generateRefreshToken({
			userId: user._id,
			email: user.email,
		});

		// Salva il refresh token
		const newToken = new Token({
			userId: user._id,
			refreshToken,
		});
		await newToken.save();

		// Imposta il refresh token nel cookie HTTP-only
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "Strict",
		});

		const api_response = {
			isSuccess: true,
			message: "Login riuscito",
			data: { user,accessToken, refreshToken },
		};

		res.status(200).json(api_response);
	} catch (error) {
		console.error("Errore durante il login:", error);
		res.status(500).json({
			isSuccess: false,
			message: "Errore durante il login",
			data: error.message,
		});
	}
};

// Logout utente - rimuovere il refresh token
const logoutUser = (req, res) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		return res.status(400).json({
			isSuccess: false,
			message: "Nessun refresh token trovato",
			data: null,
		});
	}

	// Rimuove il refresh token dal database
	Token.findOneAndDelete({ refreshToken })
		.then(() => {
			res.clearCookie("refreshToken");

			const api_response = {
				isSuccess: true,
				message: "Logout riuscito",
				data: null,
			};

			res.status(200).json(api_response);
		})
		.catch((error) => {
			res.status(500).json({
				isSuccess: false,
				message: "Errore durante il logout",
				data: error.message,
			});
		});
};

module.exports = { createUser, getUser, modifyUser, loginUser, logoutUser };
