const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config(); // enable app to use .env file
const PORT = process.env.PORT || 8080;

// encryption process
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
const checkHeaders = require('./server/middleware/checkHeaders');
const clientToken = process.env.clientToken;
const clientSecret = process.env.clientSecret;

// task and user routers
require('./server/db/mongoose');
const userRouter = require('./server/routers/user');
const taskRouter = require('./server/routers/task');
const resetTokenRouter = require('./server/routers/resetToken');
const carryRouter = require('./server/routers/carry');

// enable cors
const options = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}
app.use(cors(options));

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(resetTokenRouter);
app.use(carryRouter);

// host static html file
app.use(express.static(path.join(__dirname, 'dist')));
// serve image files
app.use('/images', express.static(path.join(__dirname, 'images')));
// parse json from body of a request
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dashboard', (req, res) => {
    res.sendFile('./dist/dashboard.html', { root: __dirname });
});

app.post('/header', (req, res) => {
    const { clientToken, timeStamp, signature } = generateHeaders();
    res.send(JSON.stringify({
        'client-token': clientToken,
        'time-stamp': timeStamp,
        'time-signature': signature
    }));
});

app.post('/checkToken', checkHeaders, async (req, res) => {
    const jwt = require('jsonwebtoken');
    const User = require('./server/models/user');
    try {
        // remove 'Bearer ' in the beginning of the String
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }
        res.send({
            resCode: 200,
            message: 'success',
        });
    } catch (error) {
        res.status(401).send({
            resCode: 401,
            error: 'Please authenticate',
            errorNessage: error
        });
    }
});

app.listen(PORT, function (err) {
    if (err) return err;
    console.log(`Server starts at port ${PORT}`);
});

function generateHeaders() {
    const timeStamp = (new Date().getTime()) + (Math.floor(Math.random() * 900) + 100).toString();
    const ciphertextSHA256 = CryptoJS.HmacSHA256(timeStamp, clientSecret);
    const signature = ciphertextSHA256.toString()
    const headers = {
        clientToken,
        timeStamp,
        signature
    }
    return headers;
}
