// controllers/taskController.js
const { Task } = require('../models/task');

const taskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.findAll({ where: { userId: req.user.id } });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createTask: async (req, res) => {
    try {
      const newTask = await Task.create({ ...req.body, userId: req.user.id });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateTask: async (req, res) => {
    try {
      const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
      if (!task) return res.status(404).json({ message: 'Task not found' });
      
      Object.assign(task, req.body);
      await task.save();
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
      if (!task) return res.status(404).json({ message: 'Task not found' });

      await task.destroy();
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = taskController;
