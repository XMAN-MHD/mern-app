/** import */
const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/** register */ 
const registerUser = asyncHandler(async (req, res) => {

    /** verify data are sent */ 
    if (!req.body.name || !req.body.email || !req.body.password) 
    {
        res.status(400); 
        throw new Error('All fields are mandatory');
    }

    /** get the data */ 
    const { name, email, password } = req.body;

    /** verify user exists */ 
    const userExists = await userModel.findOne({ email })
    if (userExists) 
    {
        res.status(400);
        throw new Error('User Exists');
    }

    /** encrypt password */ 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /** create user */ 
    const user = await userModel.create({ name, email, password: hashedPassword })

    /** verify registration */ 
    if (user)
    {
        res.status(201).json({ _id: user.id, name: user.name, email: user.email, token: generateJWTtoken(user.id) })
    }     
    else {
        res.status(400)
        throw new Error('Invalid user data')  
    }
});

/** login */ 
const loginUser = asyncHandler(async (req, res) => {
    /** verify data are sent */ 
    if (!req.body.email || !req.body.password) 
    {
        res.status(400); 
        throw new Error('All fields are mandatory');
    }
    
    /** get data*/ 
    const { email, password } = req.body;
    
    /** find user in the database */ 
    const user = await userModel.findOne({ email });
    
    /** verify the user's credentials */ 
    if (user && (await bcrypt.compare(password, user.password))) 
    {
        res.json({ _id: user.id, name: user.name, email: user.email, token: generateJWTtoken(user.id) })

    } else {
    res.status(400)
    throw new Error('Invalid user')
    }
});

/** get user */ 
const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Current user data' });
});

/** generate jwt */ 
const generateJWTtoken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' });


/** export */ 
module.exports = { registerUser, loginUser, getCurrentUser};