import IAnswer = require('./answer.interface');
import IUser = require('../users/user.interface');

interface IQuestion {
    _id?: string;
    user: string | IUser;
    title: string;
    content: string;
    answers?: Array<IAnswer>;
}

export = IQuestion;
