const express = require('express')
const { signup, login } = require('../controllers/authContoller')
const { signupVlaidation, loginVlaidation } = require('../middlewares/validation')
const router = express.Router()

router.post('/login',loginVlaidation,login)
router.post('/signup',signupVlaidation,signup)

module.exports = router