const express= require("express");
const router = express.Router();

const taskController = require('../controller/taskController');
const { userVerification } = require("../middlewares/AuthMiddleware");

router.get('/myTasks',userVerification, taskController.getTasks);
router.get('/:taskId', userVerification, taskController.getTask);
router.post('/addTask', userVerification, taskController.postTask);
router.put('/:taskId', userVerification, taskController.putTask);
router.delete('/:taskId', userVerification, taskController.deleteTask);
    

module.exports = router;