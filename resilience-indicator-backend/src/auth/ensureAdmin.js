const { ensureLoggedIn } = require('connect-ensure-login');

const ensureAdmin = () => [
  ensureLoggedIn(),
  (req, res, next) => {
    if (req.user && req.user.isAdmin === true) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  },
];

module.exports = ensureAdmin;
