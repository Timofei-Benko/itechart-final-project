import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: new Date().toLocaleDateString(),
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    // answers: {
    //     required: false,
    //     type: [{
    //         user: {
    //             type: Schema.Types.ObjectId,
    //             ref: 'User',
    //         },
    //         date: {
    //             type: Date,
    //             default: new Date().toLocaleDateString(),
    //         },
    //         score: {
    //             type: Number,
    //             required: true,
    //             default: 0,
    //         },
    //         isBest: {
    //           type: Boolean,
    //           default: false,
    //         },
    //         content: {
    //             type: String,
    //             required: true,
    //         }
    //     }],
    // },
}, { typePojoToMixed: false, timestamps: true, });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
