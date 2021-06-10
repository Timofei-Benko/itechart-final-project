import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    answers: {
        required: true,
        type: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            score: {
                type: Number,
                default: 0,
            },
            isBest: {
              type: Boolean,
              default: false,
            },
            content: {
                type: String,
            }
        }],
    },
}, { typePojoToMixed: false, timestamps: true, });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
