const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async function (req, res, next) {
    try {
        // remove 'Bearer ' in the beginning of the String
        const token = req.header('Authorization').replace('Bearer ', '');
        // console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        // append current token of the device
        req.token = token;

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = auth;