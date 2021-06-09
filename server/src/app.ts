const express = require('express');
const morganBody = require('morgan-body');
const app = express();
const userRouter = require('./resources/users/user.router');
const questionRouter = require('./resources/questions/question.router');
const createDBConnection = require('./db');

app.use(express.json());

morganBody(app);

createDBConnection();

app.use('/api', (req, res, next) => {
    if (req.originalUrl === '/api') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use('/api', userRouter);
app.use('/api', questionRouter);

export = app;
