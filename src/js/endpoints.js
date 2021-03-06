// const host = window.location.hostname === '127.0.0.1' || 'localhost' ? 'http://localhost:8080' : '';
const host = '';
const endpoints = {
    host,
    headerEndpoint: `${host}/header`,
    checkTokenEndpoint: `${host}/checkToken`,
    loginEndpoint: `${host}/users/login`,
    signupEndpoint: `${host}/users`,
    verifyEmailEndpoint: `${host}/users/exist/email`,
    verifyPhoneEndpoint: `${host}/users/exist/phone`,
    sendResetPasswordEndpoint: `${host}/resetToken`,
    verifyResetTokenEndpoint: `${host}/resetToken/verify`,
    resetPasswordEndpoint: `${host}/resetToken/resetpassword`,
}

export default endpoints;