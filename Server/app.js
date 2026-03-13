import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import path from 'path'




import express  from 'express'
const app = express()

import Blog  from './models/blog.js'

import userRoute  from './routes/user.js'
import blogRoute  from './routes/blog.js'

import mongoose  from 'mongoose'
import cookieParser  from 'cookie-parser'
import { checkForAuthCookie }  from './middlewares/auth.js'

const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthCookie('token'))
app.use(express.static(path.resolve('./public')))

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err.message));



// remove this:
app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
      user: req.user, 
      blogs: allBlogs   
    })
})

// replace with this:
app.get('/', (req, res) => {
    res.json({ message: "Blog API is running" })
})

app.use('/api/user', userRoute)
app.use('/api/blog', blogRoute)



app.listen(PORT, () => console.log(`server start at Port ${PORT}`))
