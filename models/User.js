const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

class User {
  // Create a new user
  static async createUser({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
  }

  // Find a user by username
  static async findByUsername(username) {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  // Find a user by email
  static async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  // Compare passwords
  static async comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}

module.exports = User;