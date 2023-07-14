const express = require('express')
const User = require('../../models/user')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcryptjs')

// link to login page
router.get('/login', (req, res) => {
    res.render('login')
})

// login function
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))

// link to register page
router.get('/register', (req, res) => {
    res.render('register')
})

// register function
router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位都是必填' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與密碼確認不相符' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }

    User.findOne({ email }).then(user => {
        if (user) {
            errors.push({ message: '這個 Email 已經被註冊過了。' })
            return res.render('register', {
                errors,
                name,
                email,
                password,
                confirmPassword
            })
        }
        return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => {
                User.create({
                    name,
                    email,
                    password: hash
                })
            })
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
    })
        .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
    req.logOut()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
})

module.exports = router