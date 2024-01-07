/* imports */ 
const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getCurrentUser} = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware')


/* routes*/
router.get( '/current', protect, getCurrentUser );
router.post( '/', registerUser );    
router.post( '/login', loginUser );

/** exports */ 
module.exports = router;