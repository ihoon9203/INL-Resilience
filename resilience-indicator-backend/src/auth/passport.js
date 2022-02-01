const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const sequelize = require('../models/index');

const { User } = sequelize.models;

// Configure password authentication strategy.
passport.use(
  new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    const user = await User.findOne({
      where: { email: username },
    }).catch((err) => req.res.status(500).json(err));

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return req.res.status(400).json({ message: 'Incorrect username or password.' });
    }

    user.timesVisited += 1;
    user.save();

    return done(null, user);
  }),
);

/* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 */
passport.serializeUser((user, done) => {
  done(null, { id: user.id, email: user.email });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
