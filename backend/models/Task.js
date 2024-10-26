const db = require('../config/db');

const Task = {
    async createTask({ name, description, deadline, userId }) {
        const result = await db('tasks').insert({ name, description, deadline, userId }).returning('*');
        return result[0];
    },
    async getTasksByUser(userId) {
        return await db('tasks').where({ userId });
    },
    async updateTask(id, data) {
        const result = await db('tasks').where({ id }).update(data).returning('*');
        return result[0];
    },
    async deleteTask(id, userId) {
        const result = await db('tasks').where({ id, userId }).del();
        return result > 0 ? 'Task deleted' : 'Task not found';
    },
};

module.exports = Task;
