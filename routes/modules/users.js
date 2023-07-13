const express = require('express')
const User = require('../../models/user')

const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login')
})



router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
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
        } else {
            return User.create({
                name,
                email,
                password
            })
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
})

module.exports = router