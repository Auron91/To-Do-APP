const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const path = require('path')

const app = express()
const port = process.env.PORT

const publicDirectory = path.join(__dirname, '../public')

app.use(express.static(publicDirectory))
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// index page route
app.get('', (req, res) => {
    res.render('index')
})

module.exports = app

