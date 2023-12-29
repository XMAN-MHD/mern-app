/* imports */ 
const express = require('express');
const router = express.Router();
const {getTasks, setTasks, updateTask, deleteTask} = require('../controllers/taskControllers')

/* routes*/
router.get( '/', getTasks )
router.post( '/', setTasks )    
router.put( '/:id', updateTask )
router.delete( '/:id', deleteTask )

module.exports = router;