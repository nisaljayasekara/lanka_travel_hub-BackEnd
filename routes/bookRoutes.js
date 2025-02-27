const express = require('express');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new book (Protected route)
router.post('/', authMiddleware, async (req, res) => {
  const { name, email, date } = req.body;

  try {
    const book = await Book.createBook({ name, email, date });
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get all books (Protected route)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get a book by ID (Protected route)
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.getBookById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Update a book by ID (Protected route)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, email, date } = req.body;

  try {
    const updatedBook = await Book.updateBook(id, { name, email, date });
    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Delete a book by ID (Protected route)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await Book.deleteBook(id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;