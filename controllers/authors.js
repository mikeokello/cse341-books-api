const { getDb } = require('../db/connect');

const getAllAuthors = async (req, res) => {
  try {
    const db = getDb();
    const authors = await db.collection('authors').find({}).toArray();
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve authors.' });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const db = getDb();
    const author = await db.collection('authors').findOne({ id: req.params.id });
    if (!author) {
      return res.status(404).json({ message: 'Author not found.' });
    }
    return res.status(200).json(author);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve author.' });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body;
    if (!id || !name || !birthYear) {
      return res.status(400).json({ message: 'id, name, and birthYear are required.' });
    }
    const db = getDb();
    const existing = await db.collection('authors').findOne({ id });
    if (existing) {
      return res.status(400).json({ message: 'Author id already exists.' });
    }
    const newAuthor = { id, name, birthYear };
    await db.collection('authors').insertOne(newAuthor);
    return res.status(201).json(newAuthor);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create author.' });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { name, birthYear } = req.body;
    if (!name || !birthYear) {
      return res.status(400).json({ message: 'name and birthYear are required.' });
    }
    const db = getDb();
    const existing = await db.collection('authors').findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ message: 'Author not found.' });
    }
    await db.collection('authors').updateOne({ id: req.params.id }, { $set: { name, birthYear } });
    return res.status(200).json({ id: req.params.id, name, birthYear });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update author.' });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const db = getDb();
    const existing = await db.collection('authors').findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ message: 'Author not found.' });
    }
    await db.collection('authors').deleteOne({ id: req.params.id });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete author.' });
  }
};

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };