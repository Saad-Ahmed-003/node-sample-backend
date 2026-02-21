const express = require('express')
const sessionMiddleware = require('./config/session')
const passport = require('./config/passport')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(express.json())
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Inventory API is running' })
})

module.exports = app