const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const validator = require('validator');
const User = require('../models/user');
const auth = require('../middleware/auth');
const checkHeaders = require('../middleware/checkHeaders');
const { sendWelcomeEmail, sendGoodByeEmail } = require('../emails/account');
const router = new express.Router();

// POST request to create a new user (sign up)
router.post('/users', checkHeaders, async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({
            resCode: 201,
            user,
            token
        });
    } catch (error) {
        res.status(400).send({
            resCode: 400,
            message: error
        });
    }

});

// POST request to authenticate user login with email as account and password
router.post('/users/login', checkHeaders, async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        // generate a specific token for this user, not for all User!
        const token = await user.generateAuthToken();
        res.send({
            resCode: 200,
            user,
            token
        });
    } catch (error) {
        res.status(400).send({
            resCode: 400,
            message: error
        });
    }
});

// Log out the current session on a single device
router.post('/users/logout', checkHeaders, auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(function (token) {
            return token.token !== req.token;
        });

        await req.user.save();
        res.send({
            resCode: 200,
            message: "Logged Out"
        });
    } catch (error) {
        res.status(500).send({
            resCode: 500,
            message: error,
        });
    }
});

// Log out all sessions of login on all devices of a user
router.post('/users/logoutAll', checkHeaders, auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send({
            resCode: 200,
            message: 'Logged Out from all devices'
        });
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/users/me', checkHeaders, auth, async (req, res) => {
    // rather than returning all users data which doesn't make sense, this route handler is changed to return the profile of the authenticated user
    res.send(req.user);
});

// PATCH request to modify data of a specific user
router.post('/users/me', checkHeaders, auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'phone', 'password',];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid udpates!' });
    }

    try {
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send({
            user,
            resCode: 200,
            message: `update success!`
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete request to remove a specific user
router.delete('/users/me', checkHeaders, auth, async (req, res) => {
    try {
        await req.user.remove();
        sendGoodByeEmail(req.user.email, req.user.name)
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});

// route handler for users to upload avatar. This has no filter for data type and authentication of the user
const upload = multer({
    // dest: 'avatar',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpe?g|png)$/g)) {
            return cb(new Error('Please upload an image as jpg, jpeg, or png file'));
        }

        cb(null, true);
    }
});

// user upload avatar route with error handling 
router.post('/users/me/avatar', checkHeaders, auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250, }).png().toBuffer();
    req.user.avatar = buffer;
    //req.user.avatar = req.file.buffer // 'req.file' contains the file sent from the user in the request and the binary data is stored in 'buffer' property
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    });
});

// allow user to delete their avatar image
router.delete('/users/me/avatar', checkHeaders, auth, async (req, res) => {
    if (!req.user.avatar) {
        return res.status(400).send({ error: `You don't have avatar yet` });
    }
    req.user.avatar = undefined; // if we use null, the user 'avatar' filed will exist and has a value 'null' with 'undefined' the field will just disappear
    await req.user.save();
    res.send();
});

// render user avatar image 
router.get('/users/:id/avatar', checkHeaders, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
});

// check if an email has been used
router.post('/users/exist/email', checkHeaders, async (req, res) => {
    try {
        const email = req.body.email;
        let message = 'email is invalid';
        let resCode = 400;
        if (validator.isEmail(email)) {
            const user = await User.find({
                email
            });
            if (!user.length) {
                resCode = 200;
                message = 'This email is available!';
            } else {
                resCode = 401;
                message = 'This email has been used!';
            }
        }
        res.send({
            resCode,
            message
        });
    } catch (err) {
        res.status(404).send({
            resCode: 404,
            message: err
        });
    }
});

// check if a phone has been used
router.post('/users/exist/phone', checkHeaders, async (req, res) => {
    try {
        const phone = req.body.phone;
        let message = 'phone number is invalid';
        let resCode = 400;
        if (validator.isMobilePhone(phone)) {
            const user = await User.find({
                phone
            });
            if (!user.length) {
                resCode = 200;
                message = 'This phone number is available!';
            } else {
                message = 'This phone number has been used!';
            }
        }
        res.status(resCode).send({
            resCode,
            message
        });
    } catch (err) {
        res.status(404).send({
            resCode: 404,
            message: err
        });
    }
});

module.exports = router;