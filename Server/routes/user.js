import  Router from 'express'
import { SignUp, Login, logout, getMe} from  '../controller/user.js'

const router = Router()

router.post('/signup', SignUp)

router.post('/signin', Login)

router.post('/logout',logout)

router.get('/me', getMe)


export default router;