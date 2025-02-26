const User = require('../Models/UserModel');

// Creare un nuovo utente
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const newUser = new User({ firstName, lastName, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'Utente creato con successo', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la creazione', error });
  }
};

// Ottenere tutti gli utenti
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero utenti', error });
  }
};

// Modifica un utente esistente
const modifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Prende solo i campi forniti nella richiesta

    // Controlla se ci sono dati da aggiornare
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Nessun dato fornito per l'aggiornamento" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates }, // Solo i campi forniti vengono aggiornati
      { new: true, runValidators: true } // Restituisce il nuovo documento aggiornato
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }

    res.json({ message: 'Utente aggiornato con successo', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la modifica', error });
  }
};

module.exports = { createUser, getUsers, modifyUser };