const Task = require('../models/Task');

const TaskService = {
    async getTasksByUser(userId) {
        return await Task.getTasksByUser(userId);
    },
    async createTask(data) {
        return await Task.createTask(data);
    },
    async updateTask(id, data) {
        return await Task.updateTask(id, data);
    },
    async deleteTask(id, userId) {
        return await Task.deleteTask(id, userId);
    },
};

module.exports = TaskService;
