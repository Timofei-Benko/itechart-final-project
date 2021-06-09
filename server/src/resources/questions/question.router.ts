const router = require('express').Router();

import IQuestion = require('./question.interface');
const questionService = require('./question.service');
import userService = require('../users/user.service');
import validateSession = require('../../middleware/validate.session');

router.route('/users/:userId/questions').post(validateSession, async (req, res, next) => {
    try {
        const { userId }: { userId: string } = req.params;
        if (!await userService.exists({ _id: userId })) {
            return res.status(404).json({error: 'User doesn\'t exist'});
        }
        const question: IQuestion = await questionService.create(req.body.question);
        return res.status(201).json(question);
    } catch (e) {
        next(e);
    }
});

router.route('/users/:userId/questions/:questionId').delete(validateSession, async (req, res, next) => {
    try {
        const { userId, questionId }: { userId: string, questionId: string } = req.params;
        if (!await userService.exists({ _id: userId })) {
            return res.status(404).json({ error: 'User doesn\'t exist' });
        }
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

module.exports = router;
