const sgMail = require('@sendgrid/mail');


const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'kyash3079@gmail.com',
    from: 'kyash3079@gmail.com',
    subject: 'Testing mail using sendgrid',
    text: 'Hii there....'
})