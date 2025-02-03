let tasks = [];

const TaskModel = {
  getPendingTasks: () => (
    tasks.filter(task => task.status === 'pending')
  ),

  getDoingTasks: () => (
    tasks.filter(task => task.status === 'doing')
  ),

  getDoneTasks: () => (
    tasks.filter(task => task.status === 'done')
  ),

  getTaskById: (id) => (
    tasks.find(task => task.id === Number(id)) || null
  ),
  
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