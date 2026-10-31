const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await getDb().db('cse341').collection('books').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const result = await getDb().db('cse341').collection('books').find({ _id: bookId });
    const lists = await result.toArray();
    if (lists.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle };