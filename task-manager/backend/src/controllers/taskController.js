const TaskModel = require('../models/taskModel');

const TaskController = {
  getPending: (req, res) => {
    const tasks = TaskModel.getPendingTasks();
    res.json(tasks);
  },

  getDoing: (req, res) => {
    const tasks = TaskModel.getDoingTasks();
    res.json(tasks);
  },

  getDone: (req, res) => {
    const tasks = TaskModel.getDoneTasks();
    res.json(tasks);
  },

  getById: (req, res) => {
    const taskId = req.params.id;
    const task = TaskModel.getTaskById(taskId);
    console.log(task);
    res.json(task);
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