const express = require('express')
const app = express()
const port = 3000
const exhbs = require('express-handlebars')
const usePassport = require('./config/passport')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
require('./config/mongoose')

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended:true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})

app.use(routes)

app.listen(port, () => {
    console.log(`This express is running on http://localhost:${port}`)
})