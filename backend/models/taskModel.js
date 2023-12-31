/* imports */ 
const mongoose = require('mongoose');

/* create schema */ 
const taskSchema = mongoose.Schema(
    {
        text: { type: String, required: [true, 'Please add a text value'] }
    },

    {
        timestamps: true
    }
);

/* create model */ 
const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;