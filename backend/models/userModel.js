// models/userModel.js
const { client } = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    createUser: async (user) => {
        const { username, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const res = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        return res.rows[0];
    },

    getUserById: async (id) => {
        const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.rows[0];
    },

    getUserByEmail: async (email) => {
        const res = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        return res.rows[0];
    },

    verifyPassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    },
};

module.exports = User;
