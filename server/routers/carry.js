const axios = require('axios');
const express = require('express');
const qs = require('qs');
const checkHeaders = require('../middleware/checkHeaders');
const auth = require('../middleware/auth');
const router = new express.Router();

const carryHost = process.env.CARRY_HOST;
// const carryUsername = process.env.CARRY_ACCOUNT;
// const carryPassword = process.env.CARRY_PASSWORD;

// const carryTestUsername = process.env.CARRY_TEST_ACCOUNT;
// const carryTestPassword = process.env.CARRY_TEST_PASSWORD;

router.post('/carry/login', checkHeaders, auth, async (req, res) => {
    let resCode = 500;
    let data = null;

    const { carryUsername, carryPassword } = carryUser(parseInt(req.user.carry_shop_id));

    try {
        const response = await axios({
            method: 'post',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            url: `${carryHost}/api/auth`,
            data: qs.stringify({
                type: 'login',
                username: carryUsername,
                password: carryPassword,
            }),
        });

        resCode = response.data.status;
        data = response.data;
    } catch (err) {
        data = err;
    }

    res.status(resCode).send(data);
});

router.post('/carry/order', checkHeaders, auth, async (req, res) => {
    let result = {
        resCode: 500,
        message: 'something went wrong on the server...',
        data: null,
    };

    try {
        if (req.body.token && req.body.data) {
            const response = await callCarry(`${carryHost}/api/order`, req.body.token, req.body.data);
            result.resCode = response.data.status;
            result.message = response.data.message;
            result.data = response.data.data;
        } else {
            result.resCode = 401;
            result.message = 'missing token or invalid payload parameters';
        }
    } catch (err) {
        result.data = err;
    }

    res.status(result.resCode).send(result);
});

router.post('/carry/product', checkHeaders, auth, async (req, res) => {
    let result = {
        resCode: 500,
        message: 'something went wrong on the server...',
        data: null,
    };
    try {
        if (req.body.token && req.body.data) {
            const response = await callCarry(`${carryHost}/api/product`, req.body.token, req.body.data);
            result.resCode = response.data.status;
            result.message = response.data.message;
            result.data = response.data.data;
        } else {
            result.resCode = 401;
            result.message = 'missing token or invalid payload parameters';
        }
    } catch (err) {
        result.data = err
    }

    res.status(result.resCode).send(result);
});

async function callCarry(url = '', token = '', data = null) {
    try {
        const response = await axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token,
            },
            url,
            data: qs.stringify(data),
        });

        return response;
    } catch (err) {
        return err.response;
    }
}

module.exports = router;

function carryUser(id = '') {
    let carryUsername = process.env.CARRY_TEST_ACCOUNT;
    let carryPassword = process.env.CARRY_TEST_PASSWORD;
    if (id) {
        switch (id) {
            case 249:
                carryUsername = process.env.CARRY_ACCOUNT_HH;
                carryPassword = process.env.CARRY_PASSWORD_HH;
                break;
            default:
                break;
        }
    }
    return {
        carryUsername,
        carryPassword,
    };
}