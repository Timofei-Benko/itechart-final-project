import mongoose = require('mongoose');

interface IQuestion {
    _id?: string;
    userId: string;
    title: string;
    content: string;
    answers?: Array<typeof mongoose.Schema>;
}

export = IQuestion;
