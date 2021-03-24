const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const PORT = process.env.PORT || 8080;
const bcrypt = require('bcryptjs');
require('dotenv').config();

require('./server/db/mongoose');
const userRouter = require('./server/routers/user');
const taskRouter = require('./server/routers/task');

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// enable app to use .env file

// host static html file
app.use(express.static(path.join(__dirname, 'dist')));
// serve image files
app.use('/images', express.static(path.join(__dirname, 'images')));
// parse json from body of a request
app.use(bodyParser.urlencoded({ extended: false }));
// enable cors
app.use(cors());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/header', (req, res) => {
    const { clientToken, timeStamp, signature } = generateHeaders();
    res.send(JSON.stringify({
        'client-token': clientToken,
        'time-stamp': timeStamp,
        'time-signature': signature
    }));
});

app.post('/checkToken', (req, res) => {
    console.log(req.headers);
    res.send(true);
});

app.listen(PORT, function (err) {
    if (err) return err;
    console.log(`Server starts at port ${PORT}`);
});

function generateHeaders() {
    const CryptoJS = require('crypto-js');
    const clientToken = process.env.clientToken;
    const clientSecret = process.env.clientSecret;
    const timeStamp = (new Date().toISOString().substr(0, 19).replace(/\D/g, '')) + (Math.floor(Math.random() * 900) + 100).toString();
    const ciphertextSHA256 = CryptoJS.HmacSHA256(timeStamp, clientSecret);
    const signature = ciphertextSHA256.toString()
    return {
        clientToken,
        timeStamp,
        signature
    }
}