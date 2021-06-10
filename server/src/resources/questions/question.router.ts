const router = require('express').Router();

import IQuestion = require('./question.interface');
const questionService = require('./question.service');
import userService = require('../users/user.service');
import validateSession = require('../../middleware/validate.session');

router.route('/questions').post(validateSession, async (req, res, next) => {
    try {
        const { user }: { user: string } = req.body.question;
        if (!await userService.exists({ _id: user })) {
            return res.status(404).json({error: 'User doesn\'t exist'});
        }
        const question: IQuestion = await questionService.create(req.body.question);
        return res.status(201).json(question);
    } catch (e) {
        next(e);
    }
});

router.route('questions/:questionId').delete(validateSession, async (req, res, next) => {
    try {
        const { questionId }: { questionId: string } = req.params;
        if (!await questionService.exists({ _id: questionId })) {
            return res.status(404).json({ error: 'Question doesn\'t exist' });
        }
        await questionService.deleteOneById();
        return res.status(200).json({ status: 'Question deleted' });
    } catch (e) {
        next(e);
    }
});

router.route('/questions/:questionId').get(async (req, res, next) => {
    try {
        const { questionId }: { questionId: string } = req.params;
        if (!await questionService.exists({ _id: questionId })) {
            return res.status(404).json({ error: 'Question doesn\'t exist' });
        }
        const question: IQuestion = await questionService.getOneById({ _id: questionId });
        return res.status(200).json({ question: question});
    } catch (e) {
        next(e);
    }
});

router.route('/questions/:questionId/answers').put(validateSession, async (req, res, next) => {
    try {
        const { questionId }: { questionId: string } = req.params;
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

router.route('/questions/:questionId/answers/:answerId').put(validateSession, async (req, res, next) => {
    try {
        const { questionId, answerId }: { questionId: string, answerId: string } = req.params;
        const scoreValue: string = req.query.score;
        const isBest: string = req.query.isBest;
        if (!await questionService.exists({ _id: questionId })) {
            return res.status(404).json({ error: 'Question doesn\'t exist' });
        }
        if (scoreValue) {
            await questionService.updateAnswerScore(questionId, answerId, scoreValue);
        }
        if (isBest) {
            await questionService.setAsBest(questionId, answerId, isBest);
        }
        return res.status(200).json({ status: 'Updated successfully' });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
