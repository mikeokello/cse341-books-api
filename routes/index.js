const router = require('express').Router();
const booksRouter = require('./books');
const authorsRouter = require('./authors');

router.use('/books', booksRouter);
router.use('/authors', authorsRouter);

module.exports = router;