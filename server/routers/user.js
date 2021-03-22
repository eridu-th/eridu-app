const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendGoodByeEmail } = require('../emails/account');
const router = new express.Router();

// POST request to create a new user (sign up)
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }

});

// POST request to authenticate user login with email as account and password
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        // generate a specific token for this user, not for all User!
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send();
    }
});

// Log out the current session on a single device
router.post('/users/logout', auth, async (req, res) => {
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
        res.status(500).send();
    }
});

// Log out all sessions of login on all devices of a user
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    // rather than returning all users data which doesn't make sense, this route handler is changed to return the profile of the authenticated user
    res.send(req.user);
});

// PATCH request to modify data of a specific user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid udpates!' });
    }

    try {
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete request to remove a specific user
router.delete('/users/me', auth, async (req, res) => {
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
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
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
router.delete('/users/me/avatar', auth, async (req, res) => {
    if (!req.user.avatar) {
        return res.status(400).send({ error: `You don't have avatar yet` });
    }
    req.user.avatar = undefined; // if we use null, the user 'avatar' filed will exist and has a value 'null' with 'undefined' the field will just disappear
    await req.user.save();
    res.send();
});

// render user avatar image 
router.get('/users/:id/avatar', async (req, res) => {
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
})

module.exports = router;