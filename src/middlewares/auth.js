exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.status(401).json({ message: 'You must be logged in to access this' })
}

exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') return next()
    res.status(403).json({ message: 'Admin access required' })
}