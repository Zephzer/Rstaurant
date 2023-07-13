const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')


router.get('/', (req, res) => {
    const userId = req.user._id
    Restaurant.find({ userId })
        .lean()
        .sort({ name: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(err => console.log(err))
})

router.get('/search', (req, res) => {
    const userId = req.user._id
    const keyword = req.query.keyword
    Restaurant.find({ userId })
        .lean()
        .sort({ name: 'asc' })
        .then(restaurantList => {
            const restaurants = restaurantList.filter(restaurant =>
                restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()))
            res.render('index', { restaurants, keyword })
        })
})

module.exports = router