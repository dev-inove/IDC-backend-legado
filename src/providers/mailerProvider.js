const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.HOST_MAILER,
  port: process.env.PORT_MAILER,
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.PASS_MAILER,
  },
});

module.exports = transport;
