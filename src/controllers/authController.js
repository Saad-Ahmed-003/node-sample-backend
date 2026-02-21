const passport = require('passport')
const { User } = require('../models')
const { validationResult } = require('express-validator')

exports.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { name, email, password } = req.body

        const existing = await User.findOne({ where: { email } })
        if (existing) {
            return res.status(409).json({ message: 'Email already in use' })
        }

        const user = await User.create({ name, email, password, authProvider: 'local' })

        // log them in immediately after registering
        req.login(user, (err) => {
            if (err) return res.status(500).json({ message: 'Login after register failed' })
            res.status(201).json({
                message: 'Account created successfully',
                user: { id: user.id, name: user.name, email: user.email, role: user.role }
            })
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err)
        if (!user) return res.status(401).json({ message: info.message })

        req.login(user, (err) => {
            if (err) return next(err)
            res.json({
                message: 'Logged in successfully',
                user: { id: user.id, name: user.name, email: user.email, role: user.role }
            })
        })
    })(req, res, next)
}

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed' })
        req.session.destroy()
        res.clearCookie('connect.sid')
        res.json({ message: 'Logged out successfully' })
    })
}

exports.me = (req, res) => {
    res.json({ user: req.user })
}