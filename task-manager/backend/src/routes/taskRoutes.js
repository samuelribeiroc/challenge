const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', TaskController.getTasks);
router.post('/tasks', TaskController.createTask);
router.put('/tasks/:id', TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

module.exports = router;