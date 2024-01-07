/* imports */
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./connection/database')
const port = process.env.PORT || 5000;

/* webserver and  database server*/
connectDB();
const app = express();

/* use json */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* routes */ 
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

/*apply error handler middleware*/ 
app.use(errorHandler);


/* start server */
app.listen(port, () => console.log(`Server listening on ${port}`));

