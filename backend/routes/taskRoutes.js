/* imports */ 
const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getCurrentUser} = require('../controllers/userControllers');

/* routes*/
router.get( '/current', getCurrentUser);
router.post( '/', registerUser); 
router.post( '/login', loginUser);   

/** export*/ 
module.exports = router;