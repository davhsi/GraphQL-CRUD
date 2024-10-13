const { Task } = require('../models/task');

const taskController = {
  getAllTasks: async () => {
    return await Task.findAll();
  },
  getTaskById: async (_, { id }) => {
    return await Task.findByPk(id);
  },
  createTask: async (_, { title, description, status }) => {
    const newTask = await Task.create({ title, description, status });
    return newTask;
  },
  updateTask: async (_, { id, title, description, status }) => {
    const task = await Task.findByPk(id);
    if (!task) throw new Error('Task not found');
    
    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status !== undefined ? status : task.status;

    await task.save();
    return task;
  },
  deleteTask: async (_, { id }) => {
    const task = await Task.findByPk(id);
    if (!task) throw new Error('Task not found');

    await task.destroy();
    return task;
  },
};

module.exports = taskController;
