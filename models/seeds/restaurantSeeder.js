const Restaurant = require('../restaurant')
const restaurant = require('./restaurant.json').results

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')
const { Promise } = require('mongoose')

db.once('open', () => {
    Restaurant.create(restaurant)
    console.log('done')
})