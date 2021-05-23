const express = require('express');
const validator = require('validator');
const User = require('../models/user');
const ResetToken = require('../models/resetToken');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const checkHeaders = require('../middleware/checkHeaders');
const { sendResetPasswordEmail } = require('../emails/account');
const router = new express.Router();

// send token to user email to reset password
router.post('/resetToken', checkHeaders, async (req, res) => {
    try {
        const email = req.body.email;
        let message = 'email is invalid';
        let resCode = 404;
        if (validator.isEmail(email)) {
            const user = await User.find({
                email
            });
            if (user.length) {
                resCode = 200;
                message = `email has been sent to ${email}`;

                const token = jwt.sign({
                    _id: user[0]._id.toString(),
                }, process.env.JWT_SECRET);

                const jwtToken = new ResetToken({
                    purpose: 'reset_password',
                    owner: user[0]._id.toString(),
                    token,
                });

                try {
                    await jwtToken.save();
                    sendResetPasswordEmail(user[0].email, user[0].name, token, req.headers.origin);
                    res.status(200).send({
                        resCode: 200,
                        message,
                    });
                } catch (error) {
                    res.status(400).send({
                        resCode: 400,
                        message: error
                    });
                }
            }
        } else {
            res.send({
                resCode,
                message
            });
        }
    } catch (err) {
        res.status(500).send({
            resCode: 500,
            message: err
        });
    }
});

router.post('/resetToken/verify', checkHeaders, async (req, res) => {
    try {
        let resCode = 401;
        let message = 'Token is invalid';
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.find({ _id: decoded._id });
        const storedToken = await ResetToken.find({ token });
        if (storedToken.length && user.length) {
            if (((new Date().getTime()) - (decoded.iat * 1000)) < 1000 * 60 * 10) {
                if (
                    !storedToken[0].used &&
                    storedToken[0].owner.toString().trim() === user[0]._id.toString().trim() &&
                    storedToken[0].purpose.trim() === 'reset_password'
                ) {
                    resCode = 200;
                    message = 'success';
                }
            }
        }
        res.status(resCode).send({
            resCode,
            message,
        });
    } catch (err) {
        res.status(500).send({
            resCode: 500,
            message: err,
        });
    }
});

router.post('/resetToken/resetpassword', checkHeaders, async (req, res) => {
    try {
        let resCode = 401;
        let message = 'invalid request';

        const { password, confirmPassword } = req.body;
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (password === confirmPassword) {
            const user = await User.findOne({ _id: decoded._id });
            const storedToken = await ResetToken.findOne({ token });
            if (!storedToken.used) {
                user.password = password;
                await user.save();
                storedToken.used = true;
                await storedToken.save();
                resCode = 200;
                message = 'success';
            } else {
                message = `invalid token`;
            }
        } else {
            message = `password and confirmed password aren't the same`;
        }

        res.status(resCode).send({
            resCode,
            message,
        })
    } catch (err) {
        res.status(500).send({
            resCode: 500,
            message: 'wrong',
        });
    }
});

module.exports = router;