const router = require('express').Router();
import e = require('express');
import IQuestion = require('./question.interface');
const questionService = require('./question.service');
import userService = require('../users/user.service');
import validateSession = require('../../middleware/validate.session');

router.route('/questions').get(async (_req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        const questions = await questionService.getAll();
        return res.status(200).json({ questions: questions });
    } catch (e) {
        next(e);
    }
});

router.route('/questions').post(validateSession, async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        const { user: user }: { user: string } = req.body.question;
        if (!await userService.exists({ _id: user })) {
            return res.status(404).json({error: 'User doesn\'t exist'});
        }
        const question: IQuestion = await questionService.create(req.body.question);
        return res.status(201).json(question);
    } catch (e) {
        next(e);
    }
});

router.route('users/:userId/questions').get(validateSession, async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        const { userId } = req.params;
        if (!await userService.exists({ _id: userId })) {
            return res.status(404).json({ error: 'User doesn\'t exist' });
        }
        const questions = await questionService.getAllUserQuestions({ user: userId });
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
        return res.status(200).json({ question: question});
    } catch (e) {
        next(e);
    }
});

router.route('users/:userId/questions/:questionId').delete(validateSession, async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        const { questionId, userId } = req.params;
        if (!await questionService.exists({ _id: questionId })) {
            return res.status(404).json({ error: 'Question doesn\'t exist' });
        }
        const user = await userService.getOne({ _id: userId });
        const question = await questionService.getOneById({ _id: questionId });
        if (user._id.toString() !== question.user.toString()) {
            return res.status(403).json( { status: 'You can only delete questions posted by you' });
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
        if (!await questionService.exists({ _id: questionId })) {
            return res.status(404).json({ error: 'Question doesn\'t exist' });
        }
        await questionService.addAnswer({ _id: questionId }, {
            user: req.body.answer.user,
            content: req.body.answer.content,
        });
        return res.status(200).json({ status: 'Answer added' });
    } catch (e) {
        next(e);
    }
});

router.route('/users/:userId/questions/:questionId/answers/:answerId').put(validateSession, async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    try {
        const { userId, questionId, answerId } = req.params;
        const scoreUpdateDirection = req.query['score'];
        const isBest = req.query['isBest'];
        if (!await userService.exists({ _id: userId })) {
            return res.status(404).json({ error: 'User doesn\'t exist' });
        }
        if (!await questionService.exists({ _id: questionId })) {
            return res.status(404).json({ error: 'Question doesn\'t exist' });
        }
        if (scoreUpdateDirection) {
            await questionService.updateAnswerScore(questionId, answerId, scoreUpdateDirection);
        }
        if (isBest) {
            const user = await userService.getOne({ _id: userId });
            const question = await questionService.getOneById({ _id: questionId });
            if (user._id.toString() !== question.user.toString()) {
                return res.status(403).json({ error: 'Question wasn\'t posted by you' })
            }
            await questionService.setAsBest(questionId, answerId, isBest);
        }
        return res.status(200).json({ status: 'Updated successfully' });
    } catch (e) {
        next(e);
    }
});


module.exports = router;
