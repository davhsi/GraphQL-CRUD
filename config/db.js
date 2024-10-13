// config/db.js
const { Client } = require('pg');
require('dotenv').config();

const connectDB = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log('PostgreSQL connected');

        // Create the tasks table if it doesn't exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                deadline TIMESTAMP,
                completed BOOLEAN DEFAULT FALSE
            )
        `);
        console.log('Tasks table checked/created');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;
