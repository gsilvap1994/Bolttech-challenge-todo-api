const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./app/middlewares/error_handler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/users', require('./app/users/user.controller'));
app.use('/projects', require('./app/projects/project.controller'));
app.use('/tasks', require('./app/tasks/task.controller'));

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Express listening to port ${port}`);
});
