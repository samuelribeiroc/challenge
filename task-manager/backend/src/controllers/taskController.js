const TaskModel = require('../models/taskModel');

const TaskController = {
  getTasks: (req, res) => {
    const tasks = TaskModel.getAllTasks();
    res.json(tasks);
  },

  createTask: (req, res) => {
    const newTask = req.body;
    const task = TaskModel.addTask(newTask);
    res.status(201).json(task);
  },

  updateTask: (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const task = TaskModel.updateTask(taskId, updatedTask);
    res.json(task);
  },

  deleteTask: (req, res) => {
    const taskId = req.params.id;
    TaskModel.deleteTask(taskId);
    res.status(204).send();
  },
};

module.exports = TaskController;