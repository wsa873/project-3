const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/maker');
  }

  return next();
};
/*
"*Note: Normally you check for security by checking if req.secure is true, but the
Heroku environment is all encrypted internally so it would always be true. Instead, we
will check to see if the forwarded request (through Heroku) was secure by checking
the request’s “x-forwarded-proto” header.
For local development/testing, we can’t easily run HTTPS, so instead we will just
bypass the check.
How do we know if we are on Heroku or not? Environment variables! This is where
the power of custom environment variables comes in. We will be creating an
environment variable called NODE_ENV that we will set to “production” on Heroku.
Then when the server starts, we can just check which to export based on the
environment."
*/
const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

const bypassSecure = (req, res, next) => {
  next();
};

module.exports = {
  requiresLogin,
  requiresLogout,
};

if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
