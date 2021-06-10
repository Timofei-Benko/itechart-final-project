import IAnswer = require('./answer.interface');

interface IQuestion {
    _id?: string;
    user: string;
    title: string;
    content: string;
    answers?: Array<IAnswer>;
}

export = IQuestion;
