import  Router from 'express'
import { SignUp, Login, logout } from  '../controller/user.js'

const router = Router()

router.get('/signup', SignUp)

router.get('/signin', Login)

router.post('/logout',logout)


export default router;