const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// Will handle application errors without crashing the app
const errorHandler = require('./app/middlewares/error_handler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// users routes
app.use('/users', require('./app/users/user.controller'));

// projects routes
app.use('/projects', require('./app/projects/project.controller'));

// tasks routes
app.use('/tasks', require('./app/tasks/task.controller'));

// Errors will be forwarded to next middleware untill gets caught in error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Express listening to port ${port}`);
});
