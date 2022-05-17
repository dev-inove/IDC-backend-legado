module.exports = {
  jwt: {
    secret: process.env.TOKEN_SECRET_AUTH,
    expiresIn: '80d',
  },
};
