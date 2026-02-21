const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { User } = require('../models')

passport.use(new LocalStrategy(
    { usernameField: 'email' },  // use email instead of username
    async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } })

            if (!user) {
                return done(null, false, { message: 'No account found with that email' })
            }

            if (user.authProvider !== 'local') {
                return done(null, false, { message: `Please sign in with ${user.authProvider}` })
            }

            const isValid = await user.validatePassword(password)
            if (!isValid) {
                return done(null, false, { message: 'Incorrect password' })
            }

            return done(null, user)
        } catch (err) {
            return done(err)
        }
    }
))

// store only user id in session
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// fetch full user from DB on each request using session id
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }  // never load password into session
        })
        done(null, user)
    } catch (err) {
        done(err)
    }
})

module.exports = passport