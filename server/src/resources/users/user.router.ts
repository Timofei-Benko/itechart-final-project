const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY: string = require('../../common/config').toString();

import IUser = require('./user.interface');
const userService = require('./user.service');
const validateSession = require('../../middleware/validate.session');

router.route('/auth/signup').post(async (req, res, next) => {
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
            return res.status(409).json({ error: 'User already exists' });
        }
        if (!await userService.isValidEmail(email)) {
            return res.status(422).json({ error: 'Email format is incorrect' });
        }
        if (!await userService.isValidPassword(password)) {
            return res.status(422).json({ error: 'Password must be longer than 4 characters' })
        }
        const userData: Partial<IUser> = {
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
                user: userService.getSafeResponse(req.body.user),
            }
        );
    } catch (e) {
        next(e);
    }
});

router.route('/auth/signin').post(async (req, res, next) => {
    try {
        const { email, password }: { email: string, password: string } = req.body.user;
        if (!await userService.exists({ email })) {
            return res.status(404).json({ error: 'User with the provided email is not found' });
        }
        const user: IUser & { _id: string } = await userService.getOne({ email });
        bcrypt.compare(password, user.passwordHash, (err, matches) => {
            if (err) return res.status(401).json({ error: 'Authentication failed' });
            if (matches) {
                const token: string = jwt.sign({
                    id: user._id,
                    email: user.email,
                },
                    JWT_SECRET_KEY,
                    {
                        expiresIn: '1h',
                    }
                )
                return res.status(200).json({
                    status: 'Signed in successfully',
                    token,
                });
            } else {
                return res.status(401).json({ error: 'Password is incorrect' });
            }
        });
    } catch (e) {
        next(e);
    }
});

router.route('/users/:userId').get(validateSession, async (req, res, next) => {
    try {
        const { userId }: { userId: string } = req.params;
        if (await userService.exists({ _id: userId })) {
            const user: IUser & { _id: string} = await userService.getOne({ _id: userId });
            return res.status(200).json({ user: { _id: user._id, ...await userService.getSafeResponse(user) }});
        } else {
            return res.status(404).json({ error: 'User doesn\'t exist' });
        }
    } catch (e) {
        next(e);
    }
});

router.route('/users/:userId').delete(validateSession, async (req, res, next) => {
    try {
        const userId: string = req.params.userId;
        if (await userService.exists({ _id: userId })) {
            await userService.deleteOneById({ _id: userId });
            return res.status(200).json({ status: 'User deleted' })
        } else {
            return res.status(404).json({ error: 'User doesn\'t exist' });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
