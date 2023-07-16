const express = require('express')
const { checkSchema, validationResult } = require('express-validator')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

const validationSchema = checkSchema({
    name: {
        trim: true,
        notEmpty: true,
        isString: true
    },
    category: {
        trim: true,
        notEmpty: true,
        isString: true
    },
    location: {
        trim: true,
        nnotEmpty: true,
        isString: true
    },
    phone: {
        trim: true,
        notEmpty: true,
        isString: true
    },
    description: {
        trim: true,
        notEmpty: true,
        isString: true
    },
    image: {
        trim: true,
        notEmpty: true,
        isString: true
    }
})

// link to new page
router.get('/new', (req, res) => {
    return res.render('new')
})

// create function
router.post('/', validationSchema, (req, res) => {
    const { name, category, location, phone, description, image } = req.body
    const error = validationResult(req)
    if (!error.isEmpty()) {
        const errors = [{ message: "不可只輸入空白鍵" }]
        return res.render('new', {
            errors
        })
    }
    const userId = req.user._id
    const todo = new Restaurant({ name, category, location, phone, description, image, userId })
    return todo.save()
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// link to detail
router.get('/:rest_id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.rest_id
    return Restaurant.findOne({ _id, userId })
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(err => console.log(err))
})

// link to edit
router.get('/:rest_id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.rest_id
    return Restaurant.findOne({ _id, userId })
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(err => console.log(err))
})

// edit function
router.put('/:rest_id', validationSchema, (req, res) => {
    const _id = req.params.rest_id
    const error = validationResult(req)
    if (!error.isEmpty()) {
        req.flash('warning_msg', "不可只輸入空白鍵")
        return res.redirect(`/restaurants/${_id}/edit`)
    }
    const userId = req.user._id
    const info = req.body
    Restaurant.updateOne({ _id, userId }, info)
        .then(() => res.redirect(`/restaurants/${_id}`))
        .catch(error => console.log(error))
})

router.get('/:rest_id/delete', (req, res) => {
    const userId = req.user._id
    const _id = req.params.rest_id
    return Restaurant.findOne({ _id, userId })
        .lean()
        .then(restaurant => res.render('delete', { restaurant }))
        .catch(err => console.log(err))
})

// delete function
router.delete('/:rest_id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.rest_id
    return Restaurant.findOne({ _id, userId })
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router