/* imports */ 
const express = require('express');
const router = express.Router();
const { getTasks, setTasks, updateTask, deleteTask }= require('../controllers/taskControllers');
const { protect } = require('../middlewares/authMiddleware');

/* routes*/
router.get( '/', protect, getTasks );
router.post( '/', protect, setTasks ); 
router.put( '/:id', protect, updateTask );   
router.delete('/:id', protect, deleteTask );

/** export*/ 
module.exports = router;