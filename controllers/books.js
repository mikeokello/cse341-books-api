// Books CRUD - W03 Mongoose
const Book = require('../models/book');
const Author = require('../models/author');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve books.' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve book.' });
  }
};

const createBook = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body;
    if (!id || !authorId || !title || !publicationDate) {
      return res.status(400).json({ message: 'id, authorId, title, and publicationDate are required.' });
    }
    const existing = await Book.findOne({ id });
    if (existing) {
      return res.status(400).json({ message: 'Book id already exists.' });
    }
    const author = await Author.findOne({ id: authorId });
    if (!author) {
      return res.status(400).json({ message: 'authorId does not match an existing author.' });
    }
    const newBook = await Book.create({ id, authorId, title, publicationDate });
    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create book.' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { authorId, title, publicationDate } = req.body;
    if (!authorId || !title || !publicationDate) {
      return res.status(400).json({ message: 'authorId, title, and publicationDate are required.' });
    }
    const existing = await Book.findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    const author = await Author.findOne({ id: authorId });
    if (!author) {
      return res.status(400).json({ message: 'authorId does not match an existing author.' });
    }
    await Book.updateOne({ id: req.params.id }, { $set: { authorId, title, publicationDate } });
    return res.status(200).json({ id: req.params.id, authorId, title, publicationDate });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update book.' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const existing = await Book.findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    await Book.deleteOne({ id: req.params.id });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete book.' });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };