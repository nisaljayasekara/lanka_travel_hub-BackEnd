const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Book {
  // Create a new book
  static async createBook({ name, email, date }) {
    return prisma.book.create({
      data: {
        name,
        email,
        date: new Date(date),
      },
    });
  }

  // Get all books
  static async getAllBooks() {
    return prisma.book.findMany();
  }

  // Get a book by ID
  static async getBookById(id) {
    return prisma.book.findUnique({
      where: { id },
    });
  }

  // Update a book by ID
  static async updateBook(id, { name, email, date }) {
    return prisma.book.update({
      where: { id },
      data: {
        name,
        email,
        date: new Date(date),
      },
    });
  }

  // Delete a book by ID
  static async deleteBook(id) {
    return prisma.book.delete({
      where: { id },
    });
  }
}

module.exports = Book;