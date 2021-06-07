const router = require('express').Router();
const bcrypt = require('bcrypt');

import IUser = require('./user.interface');
const userService = require('./user.service');

router.route('/signup').post(async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            username,
            position,
            experience,
            languages
        }: IUser = req.body.user;

        if (await userService.exists({ email })) {
            return res.status(409).json({error: 'User already exists'});
        }

        const userData = {
            firstName,
            lastName,
            email,
            passwordHash: bcrypt.hashSync(password, 10),
            username,
            position,
            experience,
            languages
        };

        await userService.create(userData);

        res.status(201).json(
            {
                status: 'User created',
                userData: userService.getSafeResponse(req.body.user),
            }
        );
    } catch (e) {
        next(e);
    }
});

router.route('/signin').post(async (req, res, next) => {
    try {
        const { email, password }: { email: string, password: string } = req.body.user;

        if (!await userService.exists({ email })) {
            return res.status(404).json({error: 'User not found'});
        }

        const user = await userService.getOne(email);

        console.log(user, password)

        // bcrypt.compare(password)

    } catch (e) {
        next(e);
    }
});

router.route('/:userId').delete(async (req, res, next) => {
    try {
        const userId: string = req.params.userId;
        console.log(userId);

        if (await userService.exists(userId)) {
            await userService.deleteOneById(userId);
            return res.status(200).json({ status: 'User deleted' })
        } else {
            return res.status(404).json({ error: 'User doesn\'t exist' });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
