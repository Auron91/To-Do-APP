const app = require('./app')

const port = process.env.PORT

// Disable site for maitnance
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET request are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site in maitnance sir!')
// })

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})