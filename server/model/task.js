const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type:String, 
        required: true
    },
    description: {
        type:String, 
        required: true
    }
},{
    timestamps: true,
})

const Task = mongoose.model('Task', taskSchema);
module.exports=Task;

// const newTask = new Task({
//     title: 'Hello',
//     description: 'Hello world'
// })

// newTask.save()
//     .then(user=> console.log('User created'))
//     .catch(err=>console.error(err));