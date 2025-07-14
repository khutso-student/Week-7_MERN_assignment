const Task = require('../models/Task');

// GET all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    // Instead of 404 on empty or error, just return empty array
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// CREATE a new task for the logged-in user
const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = new Task({
      title,
      description,
      completed: completed || false,
      user: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create task', error: error.message });
  }
};

// UPDATE a task by ID (only if it belongs to the logged-in user)
const updateTask = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Task not found or not yours' });

    res.json(updated);
  } catch (error) {
    console.error('Update Task Error:', error);
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};


// DELETE a task by ID (only if it belongs to the logged-in user)
const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!deleted) return res.status(404).json({ message: 'Task not found or not yours' });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete Task Error:', error);
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};


module.exports = { getTasks, createTask, updateTask, deleteTask };
