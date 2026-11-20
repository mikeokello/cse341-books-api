// models/book.js - W03 - Mongoose Schema for books
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  authorId: { type: String, required: true, ref: 'Author' },
  title: { type: String, required: true },
  publicationDate: { type: String, required: true }
}, { collection: 'books', versionKey: false });

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

module.exports = Book;