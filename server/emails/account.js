const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'levihuang@gmail.com',
        subject: 'Thanks for joining us',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    })
        .then(() => {
            console.log(`Welcome Email is sent to ${name} at ${email}`)
        })
        .catch(err => console.log(err));
};

const sendGoodByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'levihuang@gmail.com',
        subject: `Oh no... Please Don't go...`,
        html: `<h1>Don't Go Away!!!</h1><p>Dear ${name}</p><p>Please give us a 2nd chance...</p>`,
    })
        .then(() => {
            console.log(`Welcome Email is sent to ${name} at ${email}`)
        })
        .catch(err => console.log(err));
}

const sendResetPasswordEmail = (email, name, token, host) => {
    const duration = new Date(new Date().getTime() + 1000 * 60 * 10);
    sgMail.send({
        to: email,
        from: 'levihuang@gmail.com',
        subject: `Reset your password at Eridu`,
        html: `
        <h1>Reset your password</h1>
        <p>Account: ${name}</p>
        <p>Email: ${email}</p>
        <p>Please access the following link <a href="${host}/forgetpassword?jwt=${token}">${host}?jwt=${token}#forgetpassword/reset</a> to reset your password</p>
        <p>The link only valids for 10 minutes.</p>
        `,
    })
        .then(() => {
            console.log(`Reset Email is sent to ${name} at ${email}`)
        })
        .catch(err => console.log(err));
}

module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail,
    sendResetPasswordEmail,
};