const mongoose = require('mongoose');

// Definizione dello schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'viewer'], default: 'viewer' },
}, { timestamps: true });

// Creazione del modello
const User = mongoose.model('User', userSchema);

module.exports = User;