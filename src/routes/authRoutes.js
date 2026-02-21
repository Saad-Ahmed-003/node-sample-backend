const router = require('express').Router()
const { body } = require('express-validator')
const authController = require('../controllers/authController')
const { isAuthenticated } = require('../middlewares/auth')

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]

router.post('/register', registerValidation, authController.register)
router.post('/login', authController.login)
router.post('/logout', isAuthenticated, authController.logout)
router.get('/me', isAuthenticated, authController.me)

module.exports = router