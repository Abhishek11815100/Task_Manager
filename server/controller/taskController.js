const Task = require('../model/task');
const mongoose = require("mongoose");

const validateObjectId = (string) => {
    return mongoose.Types.ObjectId.isValid(string);
}

const getTasks = async (req,res)=>{
    try{
        const tasks = await Task.find();
        //console.log("tasks");
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).send({error:"Internal server errorget"});
    }
}
const getTask = async(req,res) =>{
    try{
        if(!validateObjectId(req.params.taskId)){
            return res.status(400).json({status: 'FAILED', message: "Task id is not valid"});
        }
        const task = await Task.findById(req.params.taskId);
        if(!task){
            return res.status(400).json({status: 'FAILED', message: "Can't find task with given Id"})
        }

        // if(!req.user.id===task.user){
        //     return res.status(400).json({status: 'FAILED', message: "You can't update task of other user's"})
        // }

        res.status(200).json({task, status: "OK", message: "got task  successfully"})
    }catch(error){
        return res.status(500).json({error: "Internal Server error"});
    }
}
const postTask = async (req,res)=>{
    const {title} = req.body;
    const {description} = req.body;
    if(
        !title||
        !description
    ){
        return res
            .status(500)
            .send({
                status: 'FAILED',
                data: {
                    message: "One or more keys are missing",
                }
            })
    }
    
    try{
        const task = await Task.create({title, description});
        return res.status(200).json({task, status: "OK", message: "Task created successfully"})
    }catch (error){
        console.log(error);
        return res.status(500).json({ error: "Internal server errorpost"})
    }
    
}

const putTask = async (req,res)=>{
    try{
        const {title,description} =req.body;
        if(!title||!description){
            return res.status(400).json({status: 'FAILED', message: "Title and description can't be empty"});
        }
        if(!validateObjectId(req.params.taskId)){
            return res.status(400).json({status: 'FAILED', message: "Task id is not valid"});
        }
        const task = await Task.findById(req.params.taskId);
        if(!task){
            return res.status(400).json({status: 'FAILED', message: "Can't find task with given Id"})
        }

        // if(!req.user.id===task.user){
        //     return res.status(400).json({status: 'FAILED', message: "You can't update task of other user's"})
        // }

        await Task.findByIdAndUpdate(req.params.taskId, {title,description}, {new: true})
        res.status(200).json({task, status: "OK", message: "Task Updated successfully"})

    }catch(error){
        return res.status(500).json({error: "Internal Server error"});
    }
}

const deleteTask = async (req,res)=>{
    console.log("Hello i am in delete")
    try{
        if(!validateObjectId(req.params.taskId)){
            return res.status(400).json({status: 'FAILED', message: "Task id is not valid"});
        }

        const task = await Task.findById(req.params.taskId);
        if(!task){
            return res.status(400).json({status: 'FAILED', message: "Can't find task with given Id"})
        }

        // if(req.user.id!==task.user){
        //     return res.status(400).json({status: 'FAILED', message: "You can't delete task of other user's"})
        // }

        await Task.findByIdAndDelete(req.params.taskId)
        res.status(200).json({task, status: "OK", message: "Task deleted successfully"});

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal Server error delete"});
    }
}

module.exports ={
    getTasks,
    getTask,
    postTask,
    putTask,
    deleteTask
}