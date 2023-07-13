const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const { name, category, location, phone, description, image } = req.body
    const todo = new Restaurant({ name, category, location, phone, description, image })
    return todo.save()
               .then(() => res.redirect('/'))
               .catch(error => console.log(error))
})

router.get('/:rest_id', (req, res) => {
    const _id = req.params.rest_id
    return Restaurant.findOne({ _id })
                     .lean()
                     .then(restaurant => res.render('show', { restaurant }))
                     .catch(err => console.log(err))
})

router.get('/:rest_id/edit', (req, res) => {
    const _id = req.params.rest_id
    return Restaurant.findOne({ _id })
                    .lean()
                    .then(restaurant => res.render('edit', { restaurant }))
                    .catch(err => console.log(err))
})

router.put('/:rest_id', (req, res) => {
    const info = req.body
    const _id = req.params.rest_id
    Restaurant.updateOne({ _id }, info )
            .then(() => res.redirect(`/restaurants/${_id}`))
            .catch(error => console.log(error))
})

module.exports = router