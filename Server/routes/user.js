import  Router from 'express'
import { SignUp, Login, logout } from  '../controller/user.js'

const router = Router()

router.post('/signup', SignUp)

router.post('/signin', Login)

router.post('/logout',logout)


export default router;