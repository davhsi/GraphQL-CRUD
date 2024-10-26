const { Client } = require('pg');
require('dotenv').config();

const connectDB = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // Set to true if you have a proper SSL certificate
        }
    });

    try {
        await client.connect();
        console.log('PostgreSQL connected');

        // Create the users table if it doesn't exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `);
        console.log('Users table checked/created');

        // Create the tasks table if it doesn't exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                deadline TIMESTAMP,
                completed BOOLEAN DEFAULT FALSE,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log('Tasks table checked/created');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    } finally {
        await client.end(); // Ensure the client is disconnected after use
    }
};

module.exports = connectDB;
