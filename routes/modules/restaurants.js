const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')


router.get('/:rest_id', (req, res) => {
    const _id = req.params.id
    return Restaurant.findOne({ _id })
                     .lean()
                     .then(restaurant => res.render('show', { restaurant }))
                     .catch(err => console.log(err))
})

module.exports = router