/*import*/
const asyncHandler = require('express-async-handler')
const getTasks = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Get All Tasks' });
})
const setTasks = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please enter task')
    }
    res.status(200).json({ message: 'Create Task' });   
}) 
const updateTask = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} updated.` });
})
const deleteTask = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} deleted.` });
})
module.exports = { getTasks, setTasks, updateTask, deleteTask }