const dotenv = require('dotenv');
import path = require('path');

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

module.exports = {
    PORT: process.env['PORT'] || 4000,
    MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
};
