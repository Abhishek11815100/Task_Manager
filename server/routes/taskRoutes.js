const express= require("express");
const router = express.Router();

const taskController = require('../controller/taskController');

router.get('/myTasks',taskController.getTasks);
router.get('/:taskId',taskController.getTask);
router.post('/addTask',taskController.postTask);
router.put('/:taskId',taskController.putTask);
router.delete('/:taskId',taskController.deleteTask);
    

module.exports = router;