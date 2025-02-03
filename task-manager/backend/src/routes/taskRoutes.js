const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks/pending', TaskController.getPending);
router.get('/tasks/doing', TaskController.getDoing);
router.get('/tasks/done', TaskController.getDone);

router.post('/tasks', TaskController.createTask);
router.put('/tasks/:id', TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

module.exports = router;