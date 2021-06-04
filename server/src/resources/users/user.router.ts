const router = require('express').Router();
const User = require('./user.model');

router.route('/create').post(async (req, res) => {
    const { firstName, lastName, email, password } = req.body.user;
    console.log(req.body)
    const user = new User({
        firstName,
        lastName,
        email,
        password,
    });

    try {
        await user.save();
        res.status(201).json(req.body.user);
    } catch (err) {
        res.status(500).json( { error: err.message } );
    }
});

module.exports = router;
