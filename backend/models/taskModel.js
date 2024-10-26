// models/taskModel.js
const { client } = require('../config/db');

const Task = {
    createTask: async (task) => {
        const { name, description, deadline, userId } = task;
        const res = await client.query(
            'INSERT INTO tasks (name, description, deadline, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, deadline, userId]
        );
        return res.rows[0];
    },

    getTasks: async (userId) => {
        const res = await client.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
        return res.rows;
    },

    getTaskById: async (id, userId) => {
        const res = await client.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
        return res.rows[0];
    },

    updateTask: async (id, task, userId) => {
        const { name, description, deadline, completed } = task;
        const res = await client.query(
            'UPDATE tasks SET name = $1, description = $2, deadline = $3, completed = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
            [name, description, deadline, completed, id, userId]
        );
        return res.rows[0];
    },

    deleteTask: async (id, userId) => {
        await client.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
        return { message: 'Task deleted successfully' };
    },

    markAsCompleted: async (id, userId) => {
        const res = await client.query('UPDATE tasks SET completed = TRUE WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
        return res.rows[0];
    },
};

module.exports = Task;
