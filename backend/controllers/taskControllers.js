/** import */
const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

/** read */ 
const getTasks = asyncHandler(async(req, res) => {
    const tasks = await Task.find()
    res.status(200).json(tasks);
});

/** create */ 
const setTasks = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please provide the text for the task.')
    }
    
    const task = await Task.create({ text: req.body.text });
    res.status(200).json(task);
}) 

/** update */ 
const updateTask = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please provide the updated text for the task.');
    }

    /** get the info of the new task */ 
    const taskId = req.params.id;
    const newText = req.body.text;

    /** set the new values */ 
    const updatedTask = await Task.updateOne({ _id: taskId }, { $set: { text: newText } });

    /** verify the update */  
    if (updatedTask.nModified === 0) {
        res.status(404);
        throw new Error(`Task with ID ${taskId} not found in the database.`);
    }

    /** send a response */ 
    res.status(200).json({ message: `Task ${req.params.id} updated.` });
})

/** delete */ 
const deleteTask = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} deleted.` });
})
module.exports = { getTasks, setTasks, updateTask, deleteTask }