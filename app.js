const express = require('express')
const app = express()
const port = 3000
const exhbs = require('express-handlebars')
const restaurantList = require('./models/seeds/restaurant.json')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
require('./config/mongoose')

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended:true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
    console.log(`This express is running on http://localhost:${port}`)
})