const options = {
  expires: new Date(Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000),
  httpOnly: true,
  Domain : "localhost"
};


module.exports = {
    options
}