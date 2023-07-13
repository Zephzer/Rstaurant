const Restaurant = require('../restaurant')
const restaurants = require('./restaurant.json').results
const bcrypt = require('bcryptjs')
const User = require('../user')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')
const { Promise } = require('mongoose')

const SEED_USERS = [
    {
        name: 'test',
        email: 'test@test',
        password: '123456',
        list: [0, 1, 2]
    },
    {
        name: 'Test',
        email: 'Test@Test',
        password: '123654',
        list: [3, 4, 5]
    }
]

db.once('open', () => {
    Promise.all(SEED_USERS.map(SEED_USER =>
        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(SEED_USER.password, salt))
            .then(hash => User.create({
                name: SEED_USER.name,
                email: SEED_USER.email,
                password: hash
            }))
            .then(user => {
                const userId = user._id
                const restaurant = SEED_USER.list.map(index => {
                    restaurants[index].userId = userId
                    return restaurants[index]
                })
                return Restaurant.create(restaurant)
            })
    ))
        .then(() => {
            console.log('done')
            process.exit()
        })
})