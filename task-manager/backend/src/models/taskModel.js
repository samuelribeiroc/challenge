let tasks = [];

const TaskModel = {
  getAllTasks: () => tasks,
  
  addTask: (task) => {
    tasks.push(task);
    return task;
  },

  updateTask: (id, updatedTask) => {
    tasks = tasks.map(task => task.id === id ? updatedTask : task);
    return updatedTask;
  },

  deleteTask: (id) => {
    tasks = tasks.filter(task => task.id !== id);
  },
};

module.exports = TaskModel;