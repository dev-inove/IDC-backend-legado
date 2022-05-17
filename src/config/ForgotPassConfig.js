module.exports = {
  jwt: {
    secret: process.env.TOKEN_SECRET_FORGOT_PASS,
    expiresIn: '1h',
  },
};
