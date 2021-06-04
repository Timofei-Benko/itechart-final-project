const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./common/config');

mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', console.log.bind(console, 'Connected to the database'));
