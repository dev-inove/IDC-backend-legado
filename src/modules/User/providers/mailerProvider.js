const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const transport = nodemailer.createTransport({
  host: process.env.HOST_MAILER,
  port: process.env.PORT_MAILER,
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.PASS_MAILER,
  },
});

transport.use(
  'compile',
  hbs({
    viewEngine: {
      extname: '.handlebars',
      layoutsDir: path.resolve('/src/modules/User/resources/mail/layouts'),
    },
    viewPath: path.resolve('/src/modules/User/resources/mail'),
    extName: '.handlebars',
  }),
);

module.exports = transport;
