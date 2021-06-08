const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY: string = require('../common/config').toString();
const userService = require('../resources/users/user.service');

const validateSession = (req, res, next) => {
    try {
        const token: string = req.headers.authorization.split(' ')[1].toString();
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (decoded) {
                req.body.user = userService.getOne({_id: decoded.id});
                next();
            }
            if (err) return res.status(401).json({ error: `Not authorized: ${err}` });
        });
    } catch (e) {
        return res.status(401).json({ error: `Not authorized: ${e}` });
    }
};

module.exports = validateSession;
