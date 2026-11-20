// models/author.js - W03 - Mongoose Schema for authors
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  birthYear: { type: Number, required: true }
}, { collection: 'authors', versionKey: false });

const Author = mongoose.models.Author || mongoose.model('Author', authorSchema);

module.exports = Author;