const { Router } = require('express')
const { SignUp, login, logout } = require('../controller/user')

const router = Router()

router.get('/signup', SignUp)

router.get('/signin', login)

router.post('/logout',logout)


module.exports = router;