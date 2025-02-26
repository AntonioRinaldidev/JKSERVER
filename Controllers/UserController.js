const User = require("../Models/UserModel");
const Token = require("../Models/TokenModel");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../Verification/tokenVerification");

// Creare un nuovo utente
const createUser = async (req, res) => {
	try {
		console.log("Received data:", req.body);

		const { firstName, lastName, email, password, role } = req.body;

		if (!firstName || !lastName || !email || !password || !role) {
			return res
				.status(400)
				.json({ message: "Tutti i campi sono obbligatori" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "L'email è già registrata" });
		}

		// Hash della password con un salt di 10
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			firstName,
			lastName,
			email,
			hashedPassword,
			role,
		});
		await newUser.save();

		res
			.status(201)
			.json({ message: "Utente creato con successo", user: newUser });
	} catch (error) {
		console.error("Errore nel server:", error);
		res
			.status(500)
			.json({ message: "Errore durante la creazione", error: error.message });
	}
};

// Ottenere tutti gli utenti
const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: "Errore nel recupero utenti", error });
	}
};

// Modifica un utente esistente
const modifyUser = async (req, res) => {
	try {
		const { id, updates } = req.body; // Prende solo i campi forniti nella richiesta

		// Controlla se ci sono dati da aggiornare
		if (Object.keys(updates).length === 0) {
			return res
				.status(400)
				.json({ message: "Nessun dato fornito per l'aggiornamento" });
		}

		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ $set: updates }, // Solo i campi forniti vengono aggiornati
			{ new: true, runValidators: true } // Restituisce il nuovo documento aggiornato
		);

		if (!updatedUser) {
			return res.status(404).json({ message: "Utente non trovato" });
		}

		res.json({ message: "Utente aggiornato con successo", user: updatedUser });
	} catch (error) {
		res.status(500).json({ message: "Errore durante la modifica", error });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: "Utente non trovato" });
		}

		// Confronta la password inserita con quella hashata nel database
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({ message: "Credenziali non valide" });
		}

		// Generazione dell'access token e refresh token
		const accessToken = generateAccessToken({
			userId: user._id,
			email: user.email,
		});
		const refreshToken = generateRefreshToken({
			userId: user._id,
			email: user.email,
		});

		// Salva il refresh token nel database
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

		res.status(200).json({ message: "Login riuscito", accessToken });
	} catch (error) {
		res.status(500).json({ message: "Errore durante il login", error });
	}
};
// Logout - rimuovere il refresh token
const logoutUser = (req, res) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		return res.status(400).json({ message: "Nessun refresh token trovato" });
	}

	// Rimuovi il refresh token da memoria
	refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

	// Cancella il cookie contenente il refresh token
	res.clearCookie("refreshToken");
	res.json({ message: "Logout riuscito" });
};
module.exports = { createUser, getUsers, modifyUser, loginUser, logoutUser };
