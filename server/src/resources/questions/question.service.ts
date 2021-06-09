const Question = require('./question.model');
import IQuestion = require('./question.interface');
// import userService = require('../users/user.service');

const getUserQuestionsById = async (filter: object): Promise<Array<IQuestion>> => {
    return Question.find(filter).exec()
}

const create = async (questionData: IQuestion): Promise<void> => {
    return Question.create(questionData).save().populate('user');
}

const exists = async (filter: object): Promise<boolean> => {
    return Question.exists(filter);
}

const getOneById = async (filter: object): Promise<IQuestion> => {
    return Question.findById(filter);
}

const deleteOneById = async (filter: object): Promise<void> => {
    await Question.findByIdAndDelete(filter);
}

export = {
    getUserQuestionsById,
    create,
    exists,
    getOneById,
    deleteOneById,
};
