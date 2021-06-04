const express = require('express');
const app = express();
const userRouter = require('./resources/users/user.router');

app.use(express.json());

app.use('/api', (req, res, next) => {
    if (req.originalUrl === '/api/') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use('/api/users', userRouter);

export = app;
