const Question = require('./question.model');
import IQuestion = require('./question.interface');
import IAnswer = require('./answer.interface');
import userService = require('../users/user.service');

const getAll = async (): Promise<Array<IQuestion>> => {
    return Question.find();
}

const create = async (questionData: IQuestion): Promise<IQuestion> => {
    const question: IQuestion = await Question.create(questionData);
    await userService.updateStats(question.user, 'questionQty');
    return question;
};

const exists = async (filter: object): Promise<boolean> => {
    return Question.exists(filter);
};

const getAllUserQuestions = async (filter: object): Promise<Array<IQuestion>> => {
    return Question.find(filter);
}

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
    await userService.updateStats(answer.user, 'answerQty');
};

const updateAnswerScore = async (questionId: string, answerId: string, direction: string): Promise<void> => {
    const question = await Question.findOne({ _id: questionId });
    let currentScore: number = question.answers.find(answer => answer._id.toString() === answerId).score;
    const isLiked: boolean = question.answers.find(answer => answer._id.toString() === answerId).isLiked;
    const user: string = question.answers.find(answer => answer._id.toString() === answerId).user;

    if (direction === 'up') currentScore += 1;
    if (direction === 'down') currentScore -= 1;

    await Question.findOneAndUpdate({ _id: questionId },
        {
            $set: {
                'answers.$[answer].score': currentScore,
            },
        }, {
            arrayFilters: [{ 'answer._id': answerId }],
            new: true,
            useFindAndModify: true,
        }
    );

    if (currentScore >= 10 && !isLiked) {
        await userService.updateStats(user, 'likedAnswerQty');
        await Question.findOneAndUpdate({ _id: questionId },
            {
                $set: {
                    'answers.$[answer].isLiked': true,
                },
            }, {
                arrayFilters: [{ 'answer._id': answerId }],
                new: true,
                useFindAndModify: true,
            }
        );
    }
};

const setAsBest = async (questionId: string, answerId: string, value: string) => {
    const numericVal: number = +value;
    const question = await Question.findOneAndUpdate({ _id: questionId },
        {
            $set: {
                'answers.$[answer].isBest': !!numericVal,
            },
        }, {
            arrayFilters: [{ 'answer._id': answerId }],
            new: true,
        }
    );
    const userId = question.answers.find(answer => answer._id.toString() === answerId).user;
    console.log(userId)
    await userService.updateStats(userId, 'bestAnswerQty');
};

export = {
    create,
    exists,
    getAll,
    getAllUserQuestions,
    getOneById,
    deleteOneById,
    addAnswer,
    updateAnswerScore,
    setAsBest,
};
