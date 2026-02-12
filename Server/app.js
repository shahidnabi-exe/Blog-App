require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()

const Blog = require('./models/blog')

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { checkForAuthCookie } = require('./middlewares/auth')

const PORT = process.env.PORT || 8000;

app.set("view engine", 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthCookie('token'))
app.use(express.static(path.resolve('./public')));


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err.message));



app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
      user: req.user, 
      blogs: allBlogs   
    })
})

app.use('/user', userRoute)
app.use('/blog', blogRoute)



app.listen(PORT, () => console.log(`server start at Port ${PORT}`))
