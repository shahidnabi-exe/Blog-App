const { Router } = require('express')
const User = require('../models/user')

const router = Router()

router.get('/signin', (req, res) => {
    return res.render('signin')
 })

router.get('/signup', (req, res) => {
    return res.render('signup')
 })

router.post('/signup', async (req, res) => {
    // console.log(req.body);
    const{ fullname, email, password } = req.body

    await User.create({
        fullname,
        email,
        password,
    });
    return res.redirect('/')
 })

router.post('/signin', async (req, res) => {
    console.log(req.body);
    const{ email, password } = req.body; 
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)    
        // console.log('token', token)    
        res.cookie('token', token)
        return res.redirect('/')         
    } catch (error) {
        return res.render('signin', {
            error: "Invalid password or email "
        })
    }
})

router.get('/logout',  (req, res) => {
    res.clearCookie('token').redirect('/')
})

module.exports = router;