const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const { sequelize } = require('../models')

const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: 'Sessions',
    checkExpirationInterval: 15 * 60 * 1000  // clean up expired sessions every 15 min
})

// this creates the Sessions table automatically
sessionStore.sync()

module.exports = session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,       // JS can't access this cookie
        secure: process.env.NODE_ENV === 'production',  // HTTPS only in prod
        maxAge: parseInt(process.env.SESSION_MAX_AGE)
    }
})