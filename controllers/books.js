const { getDb } = require('../db/connect');

const getAllBooks = async (req, res) => {
  try {
    const db = getDb();
    const books = await db.collection('books').find({}).toArray();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve books.' });
  }
};

const getBookById = async (req, res) => {
  try {
    const db = getDb();
    const book = await db.collection('books').findOne({ id: req.params.id });
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
    const db = getDb();
    const existing = await db.collection('books').findOne({ id });
    if (existing) {
      return res.status(400).json({ message: 'Book id already exists.' });
    }
    const author = await db.collection('authors').findOne({ id: authorId });
    if (!author) {
      return res.status(400).json({ message: 'authorId does not match an existing author.' });
    }
    const newBook = { id, authorId, title, publicationDate };
    await db.collection('books').insertOne(newBook);
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
    const db = getDb();
    const existing = await db.collection('books').findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    const author = await db.collection('authors').findOne({ id: authorId });
    if (!author) {
      return res.status(400).json({ message: 'authorId does not match an existing author.' });
    }
    await db.collection('books').updateOne({ id: req.params.id }, { $set: { authorId, title, publicationDate } });
    return res.status(200).json({ id: req.params.id, authorId, title, publicationDate });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update book.' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const db = getDb();
    const existing = await db.collection('books').findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    await db.collection('books').deleteOne({ id: req.params.id });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete book.' });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };