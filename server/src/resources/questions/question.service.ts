const Question = require('./question.model');
import IQuestion = require('./question.interface');
import IAnswer = require('./answer.interface');
// import userService = require('../users/user.service');

const getUserQuestionsById = async (filter: object): Promise<Array<IQuestion>> => {
    return Question.find(filter).exec()
};

const create = async (questionData: IQuestion): Promise<void> => {
    return Question.create(questionData);
};

const exists = async (filter: object): Promise<boolean> => {
    return Question.exists(filter);
};

const getOneById = async (filter: object): Promise<IQuestion> => {
    return Question.findById(filter);
};

const deleteOneById = async (filter: object): Promise<void> => {
    await Question.findByIdAndDelete(filter);
};

const addAnswer = async (filter: object, answer: IAnswer): Promise<void> => {
    await Question.findOneAndUpdate(filter, {
        $push: {
            answers: answer,
        }
    });
};

const updateAnswerScore = async (questionId: string, answerId: string, value: string): Promise<void> => {
    const numericVal: number = +value;
    await Question.findOneAndUpdate({_id: questionId},
        {
            $set: {
                'answers.$[answer].score': numericVal,
            },
        }, {
            arrayFilters: [{'answer._id': answerId}],
            new: true,
        }
    );
};

const setAsBest = async (questionId: string, answerId: string, value: string) => {
    const numericVal: number = +value;
    await Question.findOneAndUpdate({_id: questionId},
        {
            $set: {
                'answers.$[answer].isBest': !!numericVal,
            },
        }, {
            arrayFilters: [{'answer._id': answerId}],
            new: true,
        }
    );
};

export = {
    getUserQuestionsById,
    create,
    exists,
    getOneById,
    deleteOneById,
    addAnswer,
    updateAnswerScore,
    setAsBest,
};
