const router = require('express').Router();
import e = require('express');
import IQuestion = require('./question.interface');
const questionService = require('./question.service');
import userService = require('../users/user.service');
import validateSession = require('../../middleware/validate.session');

router.route('/questions').get(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        const order = req.query['order'];
        if (order) {
            const questions = await questionService.getAll(order);
            return res.status(200).json({ questions });
        }
        const questions = await questionService.getAll();
        return res.status(200).json({ questions });
    } catch (e) {
        next(e);
    }
});

router.route('/questions').post(validateSession, async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        console.log(req.body)
        const { user } = req.body.question;
        if (!await userService.exists({ _id: user })) {
            return res.status(404).json({error: 'User doesn\'t exist'});
        }
        const question: IQuestion = await questionService.create(req.body.question);
        return res.status(201).json({ status: 'Question added', question });
    } catch (e) {
        next(e);
    }
});

router.route('/users/:userId/questions').get(validateSession, async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        const { userId } = req.params;
        if (!await userService.exists({ _id: userId })) {
            return res.status(404).json({ error: 'User doesn\'t exist' });
        }
        const questions: Array<IQuestion> = await questionService.getAllUserQuestions({ user: userId });
        return res.status(200).json({ questions: questions });
    } catch (e) {
        next(e);
    }
});

router.route('/questions/:questionId').get(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        const { questionId } = req.params;
        if (!await questionService.exists({ _id: questionId })) {
            return res.status(404).json({ error: 'Question doesn\'t exist' });
        }
        const question: IQuestion = await questionService.getOneById({ _id: questionId });
        return res.status(200).json({ question });
    } catch (e) {
        next(e);
    }
});

router.route('/users/:userId/questions/:questionId').delete(validateSession, async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        const { questionId, userId } = req.params;
        if (!await questionService.exists({ _id: questionId })) {
            return res.status(404).json({ error: 'Question doesn\'t exist' });
        }
        if (!await userService.exists({ _id: userId })) {
            return res.status(404).json({ error: 'User doesn\'t exist' });
        }
        const user = await userService.getOne({ _id: userId });
        const question = await questionService.getOneById({ _id: questionId });
        if (user._id.toString() !== question.user._id.toString()) {
            return res.status(403).json( { error: 'You can\'t delete questions posted not by you' });
        }
        await questionService.deleteOneById();
        return res.status(200).json({ status: 'Question deleted' });
    } catch (e) {
        next(e);
    }
});

router.route('/questions/:questionId/answers').put(validateSession, async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        const { questionId } = req.params;
        if (!await userService.exists({ _id: req.body.answer.user })) {
            return res.status(404).json({ error: 'User doesn\'t exist' });
        }
        if (!await questionService.exists({ _id: questionId })) {
            return res.status(404).json({ error: 'Question doesn\'t exist' });
        }
        const answer = await questionService.addAnswer({ _id: questionId }, {
            user: req.body.answer.user,
            content: req.body.answer.content,
        });
        return res.status(200).json({ status: 'Answer added', answer: answer });
    } catch (e) {
        next(e);
    }
});

router.route('/questions/:questionId/answers/:answerId').put(validateSession, async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        const userId = req.body.user._id;
        const { questionId, answerId } = req.params;
        const scoreUpdateDirection = req.query['score'];
        const isBest = req.query['isBest'];
        if (!await questionService.exists({ _id: questionId })) {
            return res.status(404).json({ error: 'Question doesn\'t exist' });
        }
        if (!await questionService.answerExists({ _id: questionId }, answerId)) {
            return res.status(404).json({ error: 'Answer doesn\'t exist' });
        }
        if (scoreUpdateDirection && await questionService.checkIfUserVoted(userId, questionId, answerId)) {
            return res.status(403).json({ error: 'You have already voted for this answer' });
        }
        if (scoreUpdateDirection) {
            await questionService.updateAnswerScore(userId, questionId, answerId, scoreUpdateDirection);
        }
        if (isBest) {
            const user = await userService.getOne({ _id: req.body.user._id });
            const question = await questionService.getOneById({ _id: questionId });
            if (user._id.toString() !== question.user._id.toString()) {
                return res.status(403).json({ error: 'Question wasn\'t posted by you' })
            }
            await questionService.setIsBestStatus(questionId, answerId, isBest);
        }
        return res.status(200).json({ status: 'Updated successfully' });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
