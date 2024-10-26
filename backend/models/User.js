const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    async createUser({ username, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db('users').insert({ username, email, password: hashedPassword }).returning('*');
        return result[0];
    },
    async getUserByEmail(email) {
        return await db('users').where({ email }).first();
    },
    async getUserById(id) {
        return await db('users').where({ id }).first();
    },
    async verifyPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    },
};

module.exports = User;
