const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const PORT = process.env.PORT || 8080;
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

// parse json from body of a request
app.use(bodyParser.urlencoded({ extended: false }));

// enable cors
app.use(cors());

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, function (err) {
    if (err) return err;
    console.log(`Server starts at port ${PORT}`);
})