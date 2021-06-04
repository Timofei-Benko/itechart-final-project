import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // username: {
    //     type: String,
    //     required: false,
    // },
    // position: {
    //     type: String,
    //     required: false,
    // },
    // experience: {
    //     type: Number,
    //     required: false,
    // },
    // languages: {
    //     type: Array,
    //     required: false
    // },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
