const express = require('express');
const { protect } = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/TaskController');

const router = express.Router();

router.use(protect);  // all task routes require valid token!

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
