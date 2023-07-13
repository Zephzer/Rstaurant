const express = require('express')
const app = express()
const port = 3000
const exhbs = require('express-handlebars')
const restaurantList = require('./models/seeds/restaurant.json')
const routes = require('./routes/index')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
require('./config/mongoose')

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended:true }))

// app.get('/', (req, res) => {
//     const restaurants = restaurantList.results
//     res.render('index', { restaurants: restaurants })
// })

app.get('/restaurants/:rest_id', (req, res) => {
    const restaurant = restaurantList.results.filter(restaurant => restaurant.id === Number(req.params.rest_id))
    res.render('show', { restaurant: restaurant[0] })
})

app.get('/search', (req, res) => {
    const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
    res.render('index', { restaurants: restaurants })
})

app.use(routes)

app.listen(port, () => {
    console.log(`This express is running on http://localhost:${port}`)
})