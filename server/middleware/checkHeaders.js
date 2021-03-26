const CryptoJS = require('crypto-js');
require('dotenv').config(); // enable app to use .env file
const clientToken = process.env.clientToken;
const clientSecret = process.env.clientSecret;

function checkHeaders(req, res, next) {
    const clientTokenHeader = req.headers['client-token'];
    const timeStampHeader = req.headers['time-stamp'];
    const timeSignatureHeader = req.headers['time-signature'];
    if (clientToken === clientTokenHeader) {
        const timeStampTime = new Date(parseInt(timeStampHeader.slice(0, (timeStampHeader.length - 3)))).getTime();
        const now = new Date();
        if ((now - timeStampTime) <= 60 * 1000) {
            const ciphertextSHA256 = CryptoJS.HmacSHA256(timeStampHeader, clientSecret).toString();
            if (ciphertextSHA256 === timeSignatureHeader) {
                next();
                return;
            }
        }
    }
    res.status(400).send({
        resCode: 400,
        message: 'invalid headers'
    });
}

module.exports = checkHeaders;