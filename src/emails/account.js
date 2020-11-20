const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "mic.bociek@gmail.com",
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}, Let me know do you love the app ;*.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "mic.bociek@gmail.com",
        subject: 'We are sad you deleted account',
        text: `Goodbye ${name}, we are sad you deleted your account. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}