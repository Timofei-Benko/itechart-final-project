const Question = require('./question.model');
import IQuestion = require('./question.interface');
import IAnswer = require('./answer.interface');
import userService = require('../users/user.service');

const USER_FIELDS_TO_POPULATE = "_id firstName lastName username languages experience questionQty answerQty likedAnswerQty bestAnswerQty";

const getAll = async (order?: string): Promise<Array<IQuestion>> => {
    if (order === 'desc') {
        return Question
            .find()
            .populate('user', USER_FIELDS_TO_POPULATE)
            .sort({ updatedAt: 'desc' });
    }
    return Question
        .find()
        .populate('user', USER_FIELDS_TO_POPULATE);
}

const create = async (questionData: IQuestion): Promise<IQuestion> => {
    const question: IQuestion = await Question.create(questionData);
    await userService.updateStats(question.user, 'questionQty');
    return question;
};

const exists = async (filter: object): Promise<boolean> => {
    return Question.exists(filter);
};

const answerExists = async (questionFilter: object, answerId: string): Promise<boolean> => {
    const question = await Question.findOne(questionFilter);
    const answer: IAnswer | undefined = question.answers.find(answer => answer._id.toString() === answerId.toString());
    return !!answer;
}

const getAllUserQuestions = async (filter: object, order?: string): Promise<Array<IQuestion>> => {
    if (order === 'desc') {
        return Question
            .find(filter)
            .populate('user', USER_FIELDS_TO_POPULATE)
            .sort({ updatedAt: 'desc' });
    }
    return Question
        .find(filter)
        .populate('user', USER_FIELDS_TO_POPULATE);
};

const getOneById = async (filter: object): Promise<IQuestion> => {
    return Question
        .findById(filter)
        .populate(
            'user',
            USER_FIELDS_TO_POPULATE
        )
        .populate({
            path: 'answers',
            populate: {
                path: 'user',
                select: USER_FIELDS_TO_POPULATE
            }
        });
};

const deleteOneById = async (filter: object): Promise<void> => {
    await Question.findByIdAndDelete(filter);
};

const addAnswer = async (filter: object, answer: IAnswer): Promise<IAnswer> => {
    const question = await Question
        .findOneAndUpdate(filter, {
            $push: {
                answers: answer,
            }
        }, {
            new: true,
            useFindAndModify: false
        })
        .populate({
            path: 'answers',
            populate: {
                path: 'user',
                select: USER_FIELDS_TO_POPULATE
            }
        });
    await userService.updateStats(answer.user, 'answerQty');
    return question.answers[question.answers.length - 1];
};

const updateAnswerScore = async (userId: string, questionId: string, answerId: string, direction: string): Promise<void> => {
    const question = await Question.findOne({ _id: questionId });
    const answer = await question.answers.find(answer => answer._id.toString() === answerId.toString());

    let updatedScore: number = answer.score;

    if (direction === 'up') updatedScore += 1;
    if (direction === 'down') updatedScore -= 1;

    await Question.findOneAndUpdate({ _id: questionId },
        {
            $set: {
                'answers.$[answer].score': updatedScore,
            },
            $push: {
                'answers.$[answer].usersVoted': userId,
            },
        }, {
            arrayFilters: [{ 'answer._id': answerId }],
            new: true,
            useFindAndModify: false,
        }
    );

    if (updatedScore >= 10 && !answer.isLiked) {
        await Question.findOneAndUpdate({ _id: questionId }, {
                $set: { 'answers.$[answer].isLiked': true },
            },
            {
                arrayFilters: [{ 'answer._id': answerId }],
                new: true,
                useFindAndModify: false,
            }
        );
        await userService.updateStats(answer.userId, 'likedAnswerQty');
    }
};

const checkIfUserVoted = async (userId: string, questionId: string, answerId: string): Promise<boolean> => {
    const question = await Question.findOne({ _id: questionId });
    const answer = question.answers.find(answer => answer._id.toString() === answerId.toString());
    const foundUser = answer.usersVoted.find(id => id.toString() === userId.toString());
    return !!foundUser;
}

const setIsBestStatus = async (questionId: string, answerId: string, value: string) => {
    const numericVal: number = +value;
    const question = await Question.findOneAndUpdate({ _id: questionId },
        {
            $set: {
                'answers.$[answer].isBest': !!numericVal,
            },
        }, {
            arrayFilters: [{ 'answer._id': answerId }],
            new: true,
            useFindAndModify: false,
        }
    );
    const userId = question.answers.find(answer => answer._id.toString() === answerId.toString()).user;
    await userService.updateStats(userId, 'bestAnswerQty');
};

export = {
    create,
    exists,
    answerExists,
    getAll,
    getAllUserQuestions,
    getOneById,
    deleteOneById,
    addAnswer,
    updateAnswerScore,
    setIsBestStatus,
    checkIfUserVoted,
};
