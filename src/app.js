const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// Define path for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// options for express
app.use(express.static(publicDirectory))
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// index page route
app.get('', (req, res) => {
    res.render('index')
})

app.get('/app', (req, res) => {
    res.render('main')
})

module.exports = app

