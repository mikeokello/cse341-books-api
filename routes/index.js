const express = require('express');
const router = express.Router();

router.use('/books', require('./books'));

router.get('/', (req, res) => {
  res.send('Books API - Use /books');
});

module.exports = router;