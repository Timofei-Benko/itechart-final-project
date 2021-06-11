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
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: false,
    },
    position: {
        type: String,
        required: false,
    },
    experience: {
        type: Number,
        required: false,
    },
    languages: {
        type: Array,
        required: false
    },
    questionQty: {
        type: Number,
        default: 0,
    },
    answerQty: {
        type: Number,
        default: 0,
    },
    likedAnswerQty: {
        type: Number,
        default: 0,
    },
    bestAnswerQty: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
