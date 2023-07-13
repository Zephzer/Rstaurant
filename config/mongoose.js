const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mogodb error!')
})

db.once('open', () => {
    console.log('mogodb connected!')
})

module.exports = db