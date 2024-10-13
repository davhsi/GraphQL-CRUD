const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

const Task = {
    createTask: async (task) => {
        const { name, description, deadline } = task;
        const res = await client.query('INSERT INTO tasks (name, description, deadline) VALUES ($1, $2, $3) RETURNING *', [name, description, deadline]);
        return res.rows[0];
    },
    getTasks: async () => {
        const res = await client.query('SELECT * FROM tasks');
        return res.rows;
    },
    updateTask: async (id, task) => {
        const { name, description, deadline, completed } = task;
        const res = await client.query('UPDATE tasks SET name = $1, description = $2, deadline = $3, completed = $4 WHERE id = $5 RETURNING *', [name, description, deadline, completed, id]);
        return res.rows[0];
    },
    deleteTask: async (id) => {
        await client.query('DELETE FROM tasks WHERE id = $1', [id]);
        return { message: 'Task deleted successfully' };
    },
    markAsCompleted: async (id) => {
        const res = await client.query('UPDATE tasks SET completed = TRUE WHERE id = $1 RETURNING *', [id]);
        return res.rows[0];
    },
};

module.exports = Task;
