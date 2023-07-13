const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')


router.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .sort({ name: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(err => console.log(err))
})

router.get('/search', (req, res) => {
    const keyword = req.query.keyword
    Restaurant.find()
        .lean()
        .sort({ name: 'asc' })
        .then(restaurantList => {
            const restaurants = restaurantList.filter(restaurant =>
                restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()))
            res.render('index', { restaurants, keyword })
        })
})

module.exports = router